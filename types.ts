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

// FIX: Define the CspAnalysis interface, which was missing. This resolves the import error in CspAnalysisModal.tsx.
export interface CspAnalysis {
  [directive: string]: string[];
}
