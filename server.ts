import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '5mb' }));

// Initialize Gemini API client on server side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API: Analyze text for spelling, grammar, expression & uncertain cases
app.post('/api/analyze', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Vui lòng cung cấp văn bản cần kiểm tra.' });
    }

    if (text.length > 8000) {
      return res.status(400).json({
        error: 'Độ dài văn bản vượt quá giới hạn khuyến nghị (8.000 ký tự). Vui lòng chia nhỏ văn bản để có kết quả chính xác nhất.',
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'Chưa cấu hình GEMINI_API_KEY trên máy chủ. Vui lòng kiểm tra mục Settings > Secrets.',
      });
    }

    const systemInstruction = `Bạn là trợ lý học thuật chuẩn chính tả tiếng Việt của hệ thống VietChuan AI.
Nhiệm vụ của bạn là rà soát văn bản tiếng Việt do người dùng cung cấp, phân tích chính tả, dùng từ và diễn đạt một cách cẩn trọng, khách quan, dựa trên căn cứ khoa học ngôn ngữ (như Từ điển tiếng Việt - Hoàng Phê chủ biên, Viện Ngôn ngữ học).

NGUYÊN TẮC BẮT BUỘC:
1. Phân loại từng đề xuất vào đúng 1 trong 4 nhóm sau:
   - 'spelling': Lỗi chính tả có khả năng cao. Ví dụ: nhầm phụ âm đầu (s/x, tr/ch, d/r/gi, d/v), nhầm vần (ươc/ươt, ui/uôi, ay/ai, en/eng), nhầm thanh điệu (hỏi/ngã), lỗi gõ dấu telex bị sót (vd: "ddoongf", "vieetj").
   - 'grammar_usage': Lỗi hoặc vấn đề về cách dùng từ, sai thành ngữ, quán ngữ, từ ghép Hán-Việt dùng sai nghĩa (ví dụ: "yếu điểm" dùng sai thành "điểm yếu", "chuẩn đoán" dùng sai thành "chẩn đoán", "thăm quan" dùng sai thành "tham quan", "bạt mạng" vs "bạt ngàn", "vô hình chung" vs "vô hình trung"), ngữ pháp câu cụt lặp từ vô lý.
   - 'expression': Đề xuất cải thiện cách diễn đạt tự nhiên, rõ ràng, gãy gọn hơn mà không thay đổi giọng văn, phong cách hay nội dung người viết.
   - 'uncertain': Trường hợp chưa đủ căn cứ để kết luận (tên riêng nước ngoài, địa danh, từ địa phương mang sắc thái nghệ thuật, từ chuyên ngành, từ cổ có nhiều cách viết). Nêu rõ cần người dùng tự xác minh thay vì khẳng định đúng hay sai.
2. Tuyệt đối KHÔNG tự ý thay đổi ý đồ, thông điệp hay phong cách của người viết.
3. Tuyệt đối KHÔNG khẳng định một từ là sai nếu trong từ điển tiếng Việt chấp nhận cả hai cách viết hoặc đó là phương ngữ hợp lệ trong ngữ cảnh đó.
4. Với mỗi mục đề xuất, hãy chỉ ra chính xác 'targetWord' (từ hoặc cụm từ gốc), 'originalSnippet' (câu hoặc cụm 3-8 từ xung quanh để người dùng dễ định vị), 'suggestedReplacement' (từ thay thế được khuyến nghị), 'explanation' (giải thích ngắn gọn, dễ hiểu, có căn cứ) và 'confidence' ('cao' | 'trung_binh' | 'can_xac_minh').
5. Không suy diễn hoặc bịa đặt quy tắc không tồn tại. Nếu văn bản đã viết tốt, không có lỗi, hãy trả về danh sách items rỗng [] và nhận xét tích cực.`;

    const prompt = `Phân tích văn bản tiếng Việt sau đây:\n\n"""\n${text}\n"""`;

    const config = {
      systemInstruction,
      temperature: 0.2,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          items: {
            type: Type.ARRAY,
            description: 'Danh sách các vị trí cần chú ý hoặc đề xuất sửa trong văn bản',
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING, description: 'Mã định danh duy nhất cho lỗi (vd: err-1)' },
                category: {
                  type: Type.STRING,
                  enum: ['spelling', 'grammar_usage', 'expression', 'uncertain'],
                  description: 'Nhóm phân loại lỗi/đề xuất',
                },
                targetWord: {
                  type: Type.STRING,
                  description: 'Từ hoặc cụm từ gốc trong văn bản cần chú ý',
                },
                originalSnippet: {
                  type: Type.STRING,
                  description: 'Đoạn ngữ cảnh ngắn chứa từ gốc để người dùng đối chiếu',
                },
                suggestedReplacement: {
                  type: Type.STRING,
                  description: 'Cách sửa đề xuất được khuyến nghị',
                },
                explanation: {
                  type: Type.STRING,
                  description: 'Giải thích nguyên nhân lỗi và căn cứ chính tả/từ điển',
                },
                confidence: {
                  type: Type.STRING,
                  enum: ['cao', 'trung_binh', 'can_xac_minh'],
                  description: 'Mức độ chắc chắn của đề xuất',
                },
              },
              required: [
                'id',
                'category',
                'targetWord',
                'originalSnippet',
                'suggestedReplacement',
                'explanation',
                'confidence',
              ],
            },
          },
          summary: {
            type: Type.OBJECT,
            properties: {
              spellingCount: { type: Type.INTEGER },
              grammarCount: { type: Type.INTEGER },
              expressionCount: { type: Type.INTEGER },
              uncertainCount: { type: Type.INTEGER },
              overallAssessment: {
                type: Type.STRING,
                description: 'Đánh giá tổng thể ngắn gọn về chất lượng chính tả và diễn đạt của văn bản',
              },
            },
            required: [
              'spellingCount',
              'grammarCount',
              'expressionCount',
              'uncertainCount',
              'overallAssessment',
            ],
          },
        },
        required: ['items', 'summary'],
      },
    };

    let response;
    const candidateModels = ['gemini-3.8-flash', 'gemini-3.5-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
    let lastError: any = null;

    for (const modelName of candidateModels) {
      try {
        const callPromise = ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config,
        });
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error(`Timeout with ${modelName}`)), 12000)
        );

        response = await Promise.race([callPromise, timeoutPromise]);
        if (response?.text) break;
      } catch (err: any) {
        console.warn(`Model ${modelName} failed or timed out:`, err?.message || err);
        lastError = err;
        await new Promise((r) => setTimeout(r, 400));
      }
    }

    if (!response?.text) {
      throw lastError || new Error('Không nhận được phản hồi từ mô hình AI.');
    }

    const rawOutput = response.text.trim();
    const parsedData = JSON.parse(rawOutput);

    return res.json(parsedData);
  } catch (error: any) {
    console.error('Error analyzing text with Gemini:', error);
    return res.status(500).json({
      error: 'Không thể phân tích văn bản lúc này. Vui lòng thử lại sau giây lát hoặc rút ngắn văn bản.',
      details: error?.message || String(error),
    });
  }
});

// API: Lookup a Vietnamese word / confused pair with Gemini if not in local dictionary
app.post('/api/lookup-word', async (req, res) => {
  try {
    const { word } = req.body;

    if (!word || typeof word !== 'string' || !word.trim()) {
      return res.status(400).json({ error: 'Vui lòng nhập từ hoặc cụm từ cần tra cứu.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'Chưa cấu hình GEMINI_API_KEY trên máy chủ.',
      });
    }

    const systemInstruction = `Bạn là chuyên gia từ điển học tiếng Việt.
Khi người dùng tra cứu một từ hoặc cụm từ tiếng Việt:
1. Xác định cách viết được khuyến nghị theo chuẩn chính tả tiếng Việt hiện hành (Từ điển tiếng Việt - Hoàng Phê).
2. Nêu nghĩa chính xác, từ loại, phân tích cấu tạo từ (Hán-Việt, thuần Việt,...).
3. Đưa ra ít nhất 2 ví dụ câu sử dụng đúng thực tế.
4. Nêu các từ dễ bị nhầm lẫn (nếu có, ví dụ: "sáng lạng" vs "xán lạn", "chẩn đoán" vs "chuẩn đoán") và giải thích cặn kẽ sự khác nhau.
5. Nếu từ ngữ mang tính tranh cãi hoặc chưa có đủ cứ liệu để kết luận đúng/sai tuyệt đối, phải nêu rõ "Chưa có đủ căn cứ kết luận tuyệt đối, có các luồng quan điểm khác nhau".`;

    const prompt = `Tra cứu từ hoặc cụm từ tiếng Việt: "${word.trim()}".`;

    const config = {
      systemInstruction,
      temperature: 0.2,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          word: { type: Type.STRING },
          recommendedSpelling: { type: Type.STRING },
          partOfSpeech: { type: Type.STRING },
          definition: { type: Type.STRING },
          etymology: { type: Type.STRING },
          examples: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          confusedWith: {
            type: Type.OBJECT,
            properties: {
              commonMistake: { type: Type.STRING },
              comparisonExplanation: { type: Type.STRING },
            },
          },
          status: {
            type: Type.STRING,
            enum: ['chuan_chinh_ta', 'tu_sai_pho_bien', 'chua_du_can_cu'],
          },
          note: { type: Type.STRING },
        },
        required: ['word', 'recommendedSpelling', 'definition', 'examples', 'status'],
      },
    };

    let response;
    const candidateModels = ['gemini-3.8-flash', 'gemini-3.5-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
    let lastError: any = null;

    for (const modelName of candidateModels) {
      try {
        const callPromise = ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config,
        });
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error(`Timeout with ${modelName}`)), 12000)
        );

        response = await Promise.race([callPromise, timeoutPromise]);
        if (response?.text) break;
      } catch (err: any) {
        lastError = err;
        await new Promise((r) => setTimeout(r, 400));
      }
    }

    if (!response?.text) {
      throw lastError || new Error('Không nhận được phản hồi từ mô hình AI.');
    }

    const parsedData = JSON.parse(response.text.trim());
    return res.json(parsedData);
  } catch (error: any) {
    console.error('Error looking up word:', error);
    return res.status(500).json({
      error: 'Không thể tra cứu từ vào lúc này. Vui lòng thử lại.',
      details: error?.message || String(error),
    });
  }
});

// Setup Vite middlewares in dev or static server in prod
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`VietChuan AI server running at http://0.0.0.0:${port}`);
  });
}

startServer();
