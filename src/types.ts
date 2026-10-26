export type ScreenType = 'home' | 'checker' | 'dictionary' | 'practice' | 'about' | 'references';

export type SuggestionCategory = 'spelling' | 'grammar_usage' | 'expression' | 'uncertain';

export type ConfidenceLevel = 'cao' | 'trung_binh' | 'can_xac_minh';

export interface SuggestionItem {
  id: string;
  category: SuggestionCategory;
  targetWord: string;
  originalSnippet: string;
  suggestedReplacement: string;
  explanation: string;
  confidence: ConfidenceLevel;
  ruleRef?: string;
  isAccepted?: boolean;
}

export interface AnalysisSummary {
  spellingCount: number;
  grammarCount: number;
  expressionCount: number;
  uncertainCount: number;
  overallAssessment: string;
}

export interface AnalysisResult {
  items: SuggestionItem[];
  summary: AnalysisSummary;
  originalText: string;
}

export interface DictionaryEntry {
  id: string;
  word: string;
  recommendedSpelling: string;
  categoryTag: 'phu_am' | 'thanh_dieu' | 'han_viet' | 'quan_ngu' | 'khac';
  categoryLabel: string;
  definition: string;
  etymology?: string;
  commonMistakes: string[];
  explanation: string;
  examples: string[];
  source: string;
  isVerified: boolean;
}

export interface QuizQuestion {
  id: string;
  difficulty: 'de' | 'trung_binh' | 'kho';
  category: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  mnemonicTip?: string;
  sourceRef: string;
}

export interface ReferenceSource {
  id: string;
  title: string;
  authorOrOrg: string;
  yearOrEdition?: string;
  category: 'Từ điển chuẩn' | 'Văn bản quy phạm' | 'Cơ quan học thuật' | 'Giáo trình đại học' | 'Báo chí chính thống';
  description: string;
  appliedAspects: string[];
  url?: string;
  isVerified: boolean;
}
