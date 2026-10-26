import { QuizQuestion } from '../types';

export const PRACTICE_QUIZZES: QuizQuestion[] = [
  // --- MỨC ĐỘ: DỄ ---
  {
    id: 'quiz-easy-1',
    difficulty: 'de',
    category: 'Phụ âm s / x',
    question: 'Từ nào sau đây viết ĐÚNG chính tả tiếng Việt?',
    options: ['Xán lạn', 'Sáng lạng', 'Xáng lạn', 'Sáng lạn'],
    correctAnswerIndex: 0,
    explanation:
      '"Xán lạn" là từ Hán-Việt (燦爛), trong đó "xán" có nghĩa là rực rỡ, "lạn" có nghĩa là sáng sủa, chói ngời. Tiếng Việt hoàn toàn không có từ "sáng lạng".',
    mnemonicTip: 'Mẹo nhớ: "Xán" và "Lạn" đều bắt đầu bằng chữ cái tròn/cong nhẹ (X và L), mang ý nghĩa tương lai xán lạn rực rỡ.',
    sourceRef: 'Từ điển tiếng Việt – GS. Hoàng Phê chủ biên, Viện Ngôn ngữ học.',
  },
  {
    id: 'quiz-easy-2',
    difficulty: 'de',
    category: 'Từ Hán-Việt dễ nhầm',
    question: 'Khi bác sĩ kiểm tra và xác định bệnh tật cho người bệnh, thuật ngữ y khoa chuẩn là gì?',
    options: ['Chuẩn đoán bệnh', 'Chẩn đoán bệnh'],
    correctAnswerIndex: 1,
    explanation:
      '"Chẩn" (診) có nghĩa là khám xét, nghe nhìn, bắt mạch để phát hiện bệnh (như trong chẩn bệnh, phòng chẩn trị). Còn "chuẩn" (準) là mực thước, độ chính xác (chuẩn mực, chuẩn hóa). Vì vậy khám bệnh phải là "chẩn đoán".',
    mnemonicTip: 'Mẹo nhớ: Khám bệnh phải có "chẩn" (chẩn trị, chẩn đoán, hội chẩn).',
    sourceRef: 'Từ điển tiếng Việt – Viện Ngôn ngữ học.',
  },
  {
    id: 'quiz-easy-3',
    difficulty: 'de',
    category: 'Phụ âm d / gi',
    question: 'Chọn câu viết ĐÚNG trong ngữ cảnh thi đấu thể thao:',
    options: [
      'Đội tuyển quyết tâm dành chiến thắng về cho người hâm mộ.',
      'Đội tuyển quyết tâm giành chiến thắng về cho người hâm mộ.',
    ],
    correctAnswerIndex: 1,
    explanation:
      '"Giành" mang nghĩa tranh đấu, nỗ lực đoạt lấy (giành cúp, giành giải thưởng, giành độc lập). "Dành" mang nghĩa cất giữ, tích trữ hoặc để lại cho ai đó (để dành, dành dụm, dành thời gian).',
    mnemonicTip: 'Mẹo: Đi thi đấu, tranh đấu thì "giành"; cất giữ, yêu thương thì "dành".',
    sourceRef: 'Cơ sở Ngôn ngữ học & Tiếng Việt thực hành (ĐHQGHN).',
  },
  {
    id: 'quiz-easy-4',
    difficulty: 'de',
    category: 'Vần & phụ âm s / x',
    question: 'Từ ngữ nào diễn tả công việc trôi chảy, không vấp phải trở ngại?',
    options: ['Suông sẻ', 'Suôn sẻ', 'Suôn xẻ', 'Suông xẻ'],
    correctAnswerIndex: 1,
    explanation:
      '"Suôn" trong "suôn mượt", "suôn sẻ" chỉ sự thông suốt, thuận buồm xuôi gió. Còn "suông" là rỗng tuếch, nói mà không làm (nói suông, uống rượu suông).',
    mnemonicTip: 'Mẹo: Tóc suôn mượt thì việc suôn sẻ.',
    sourceRef: 'Từ điển tiếng Việt – GS. Hoàng Phê chủ biên.',
  },
  {
    id: 'quiz-easy-5',
    difficulty: 'de',
    category: 'Thanh điệu hỏi / ngã',
    question: 'Từ nào chỉ sự gọn gàng, chu đáo, cẩn thận trong trang phục và công việc?',
    options: ['Chỉn chu', 'Chỉnh chu'],
    correctAnswerIndex: 0,
    explanation:
      'Trong từ điển tiếng Việt, từ chuẩn là "chỉn chu" (dấu hỏi). "Chỉn" là từ tiếng Việt cổ có nghĩa là chăm chút, hết lòng, cẩn thận.',
    mnemonicTip: 'Mẹo: "Chỉn" có dấu hỏi giống như việc luôn tự hỏi xem mình đã chu đáo hay chưa.',
    sourceRef: 'Từ điển tiếng Việt – GS. Hoàng Phê chủ biên.',
  },

  // --- MỨC ĐỘ: TRUNG BÌNH ---
  {
    id: 'quiz-med-1',
    difficulty: 'trung_binh',
    category: 'Quán ngữ & thành ngữ',
    question: 'Hoàn thiện câu: "Hành động thiếu suy nghĩ của anh ta [...] đã làm tổn thương người khác."',
    options: ['vô hình chung', 'vô hình trung', 'vô hình dung'],
    correctAnswerIndex: 1,
    explanation:
      '"Vô hình trung" (無形中) là cụm từ gốc Hán, trong đó "vô hình" là không có hình dạng rõ ràng, "trung" là ở trong đó, trong quá trình đó. Cả cụm nghĩa là: ngẫu nhiên trong diễn biến tự nhiên lại dẫn đến một kết quả không ngờ.',
    mnemonicTip: 'Mẹo: "Trung" là ở giữa/trong lòng sự việc (như trung tâm), không phải "chung" (chung chạ).',
    sourceRef: 'Tạp chí Ngôn ngữ – Viện Hàn lâm KHXH Việt Nam.',
  },
  {
    id: 'quiz-med-2',
    difficulty: 'trung_binh',
    category: 'Từ Hán-Việt hành chính',
    question: 'Văn bản pháp lý về việc hợp nhất hai huyện hoặc hai xã thành một đơn vị mới sử dụng thuật ngữ nào?',
    options: ['Sát nhập địa giới hành chính', 'Sáp nhập địa giới hành chính'],
    correctAnswerIndex: 1,
    explanation:
      '"Sáp" (揷) nghĩa là cài vào, lồng ghép vào, phối hợp làm một khối. "Sáp nhập" là thuật ngữ chuẩn mực trong Luật Tổ chức chính quyền địa phương và từ điển.',
    mnemonicTip: 'Mẹo: Trong từ Hán-Việt là "sáp", không phải từ "sát" gần kề.',
    sourceRef: 'Nghị quyết Ủy ban Thường vụ Quốc hội & Từ điển tiếng Việt.',
  },
  {
    id: 'quiz-med-3',
    difficulty: 'trung_binh',
    category: 'Phân biệt nghĩa từ',
    question: 'Khi phỏng vấn xin việc, nếu muốn nói về những điểm hạn chế cá nhân cần khắc phục, bạn nên nói:',
    options: [
      'Tôi luôn cố gắng khắc phục những yếu điểm của bản thân.',
      'Tôi luôn cố gắng khắc phục những điểm yếu (hoặc nhược điểm) của bản thân.',
    ],
    correctAnswerIndex: 1,
    explanation:
      '"Yếu điểm" trong Hán-Việt (要點) nghĩa là "điểm trọng yếu, điểm cốt tử, vị trí then chốt" (như yếu điểm phòng thủ). Để chỉ chỗ khiếm khuyết, hạn chế, bắt buộc phải dùng "điểm yếu" hoặc "nhược điểm".',
    mnemonicTip: 'Mẹo: "Yếu" trong yếu nhân (VIP), trọng yếu. Muốn nói điều chưa mạnh thì dùng từ thuần Việt: "điểm yếu".',
    sourceRef: 'Giáo trình Tiếng Việt thực hành – ĐHQGHN.',
  },
  {
    id: 'quiz-med-4',
    difficulty: 'trung_binh',
    category: 'Phụ âm s / x',
    question: 'Chọn cách viết ĐÚNG trong câu: "Học sinh các trường THPT có cơ hội [...] với các đề thi thử quốc gia."',
    options: ['cọ xát', 'cọ sát'],
    correctAnswerIndex: 0,
    explanation:
      '"Xát" mang nghĩa cọ đi chà lại tạo ma sát (như xát muối, ma xát). Nghĩa bóng là rèn luyện, thử thách trong hoàn cảnh thực tế. Còn "sát" là san sát kề bên hoặc giết chóc.',
    mnemonicTip: 'Mẹo: Ma xát -> cọ xát (đều dùng chữ x).',
    sourceRef: 'Từ điển tiếng Việt – GS. Hoàng Phê.',
  },
  {
    id: 'quiz-med-5',
    difficulty: 'trung_binh',
    category: 'Từ Hán-Việt & nghĩa từ',
    question: 'Người ngoài cuộc đứng nhìn, tỏ thái độ thờ ơ, dửng dưng không quan tâm được gọi là:',
    options: ['Thái độ bàng quang', 'Thái độ bàng quan'],
    correctAnswerIndex: 1,
    explanation:
      '"Bàng quan" (旁觀): bàng = bên cạnh; quan = nhìn ngắm. Khách bàng quan là người đứng ngoài nhìn vào. Còn "bàng quang" (có chữ g) là bọng đái trong cơ thể học con người.',
    mnemonicTip: 'Mẹo: Quan sát -> bàng quan (không có g).',
    sourceRef: 'Từ điển tiếng Việt – Viện Ngôn ngữ học.',
  },

  // --- MỨC ĐỘ: KHÓ ---
  {
    id: 'quiz-hard-1',
    difficulty: 'kho',
    category: 'Thành ngữ & từ cổ',
    question: 'Thành ngữ nào sau đây đúng với chuẩn từ ngữ và ngữ nghĩa dân gian?',
    options: [
      'Chân ướt chân ráo',
      'Chân ước chân ráo',
      'Chân ướt chân dáo',
      'Chân ước chân dáo',
    ],
    correctAnswerIndex: 0,
    explanation:
      '"Chân ướt chân ráo" là thành ngữ chỉ người mới đến một nơi xa lạ, vừa mới bước chân tới nơi (chân còn ướt chưa kịp ráo nước). "Ráo" là ráo nước, khô ráo.',
    mnemonicTip: 'Mẹo: "Ướt" đối lập với "ráo" (nước ướt và khô ráo).',
    sourceRef: 'Từ điển thành ngữ và tục ngữ Việt Nam – GS. Nguyễn Lân.',
  },
  {
    id: 'quiz-hard-2',
    difficulty: 'kho',
    category: 'Từ Hán-Việt học thuật',
    question: 'Thuật ngữ nào chỉ tình trạng chuyển biến đầy đủ và hoàn thiện nhất để mang lại hiệu quả?',
    options: ['Thời cơ đã chín mùi', 'Thời cơ đã chín muồi'],
    correctAnswerIndex: 1,
    explanation:
      '"Chín muồi" (vần uôi) bắt nguồn từ việc quả chín nẫu, mềm ngọt đến độ cực đại. "Mùi" (vần ui) là mùi hương khứu giác. Khi nói về thời cơ hoặc điều kiện, phải dùng "chín muồi".',
    mnemonicTip: 'Mẹo: Chuối chín muồi thì ngọt thơm; thời cơ chín muồi thì hành động thắng lợi.',
    sourceRef: 'Từ điển tiếng Việt – GS. Hoàng Phê chủ biên.',
  },
  {
    id: 'quiz-hard-3',
    difficulty: 'kho',
    category: 'Phân biệt âm tr / ch',
    question: 'Chọn câu viết ĐÚNG chính tả tuyệt đối:',
    options: [
      'Bác bảo vệ ngồi chực chờ ở cổng để đón đoàn đại biểu.',
      'Bác bảo vệ ngồi trực chờ ở cổng để đón đoàn đại biểu.',
      'Bác bảo vệ ngồi trực trờ ở cổng để đón đoàn đại biểu.',
    ],
    correctAnswerIndex: 0,
    explanation:
      '"Chực" (ch) là rình, đợi sẵn để đón bắt cơ hội (chực sẵn, chực chờ, chực ăn). Còn "trực" (tr) là làm nhiệm vụ theo ca trực (trực nhật, trực ban, túc trực). Trong ngữ cảnh mong ngóng chờ đợi, từ láy chuẩn là "chực chờ".',
    mnemonicTip: 'Mẹo: Canh chừng, chực sẵn -> chực chờ (chữ ch).',
    sourceRef: 'Từ điển tiếng Việt – GS. Hoàng Phê.',
  },
  {
    id: 'quiz-hard-4',
    difficulty: 'kho',
    category: 'Thành ngữ Hán-Việt',
    question: 'Chọn cụm từ đúng nói về việc tin tức nghe loáng thoáng chưa được kiểm chứng:',
    options: ['Nghe phong thanh', 'Nghe phong phanh'],
    correctAnswerIndex: 0,
    explanation:
      '"Phong thanh" (風聲): phong = gió; thanh = âm thanh. Nghe tiếng gió thoảng qua, tức là nghe tin đồn loáng thoáng. Còn "phong phanh" là ăn mặc phong phanh (mặc manh áo mỏng trước gió lạnh).',
    mnemonicTip: 'Mẹo: Thanh âm -> phong thanh (tin đồn). Quần áo mong manh -> phong phanh.',
    sourceRef: 'Từ điển tiếng Việt – Viện Ngôn ngữ học.',
  },
  {
    id: 'quiz-hard-5',
    difficulty: 'kho',
    category: 'Láy âm & chuẩn chính tả',
    question: 'Từ nào sau đây viết ĐÚNG chuẩn chính tả tiếng Việt?',
    options: ['Giãi bày tâm sự', 'Giải bày tâm sự', 'Giãi bầy tâm sự', 'Dải bày tâm sự'],
    correctAnswerIndex: 0,
    explanation:
      '"Giãi bày" (gi và ngã) mang nghĩa phơi mở, tỏ rõ lòng mình ra cho người khác hiểu (tương tự giãi nắng, phơi giãi). "Giải" (hỏi) thường là giải thích, giải tỏa, giải quyết.',
    mnemonicTip: 'Mẹo: Phơi giãi nỗi niềm trong lòng ra -> giãi bày (dấu ngã).',
    sourceRef: 'Từ điển tiếng Việt – GS. Hoàng Phê chủ biên.',
  },
];
