export interface HeaderResult {
  header: string;
  value: string | null;
  present: boolean;
}

export interface AnalysisResult {
  url: string;
  headers: HeaderResult[];
  error?: string;
}

export interface CspAnalysis {
  [directive: string]: string[];
}
