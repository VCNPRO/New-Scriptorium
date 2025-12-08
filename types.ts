// Generic type for a data point extracted by AI
export interface ConfidenceItem<T> {
  value: T;
  confidence: number;
}

export interface GeoPoint {
  place: string;
  latitude?: number;
  longitude?: number;
  type: 'origin' | 'reference';
  confidence: number;
}

export interface AnalysisData {
  summary: ConfidenceItem<string>;
  titleSuggestion: ConfidenceItem<string>;
  keywords: ConfidenceItem<string>[];
  
  entities: {
    people: ConfidenceItem<string>[];
    locations: ConfidenceItem<string>[];
    dates: ConfidenceItem<string>[];
    organizations: ConfidenceItem<string>[];
    events: ConfidenceItem<string>[];
  };
  
  typology: ConfidenceItem<string>;
  scriptType: ConfidenceItem<string>;
  language: ConfidenceItem<string>;
  
  geodata: GeoPoint[];
  
  suggestedSeries: ConfidenceItem<string>;
  
  qualityAlerts: ConfidenceItem<string>[];
  documentReferences?: ConfidenceItem<string>[];
}

export interface VisualAnalysis {
  hasSeals: boolean;
  hasMaps: boolean;
  hasTables: boolean;
  hasIlluminations: boolean;
  physicalCondition: string;
}

export interface RelationMatch {
  manuscriptId: string;
  score: number;
  reason: 'duplicate' | 'same_expediente' | 'same_date' | 'reference';
  details: string;
}

export interface Manuscript {
  id: string;
  title: string;
  imageUrl: string;
  
  transcription: string;
  translation?: string;
  
  analysis: AnalysisData | null;
  visualAnalysis: VisualAnalysis | null;
  
  createdAt: Date;
  status: 'pending' | 'processing' | 'completed';
  
  isDuplicateOf?: string;
  relatedManuscriptIds?: string[];
  calculatedRelations?: RelationMatch[];
}

export interface User {
    id: string;
    email: string;
    name: string | null;
    role: 'user' | 'admin' | 'researcher';
    createdAt: Date;
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  TRANSCRIBE = 'TRANSCRIBE',
  LIBRARY = 'LIBRARY',
  SETTINGS = 'SETTINGS',
  GUIDE = 'GUIDE',
  ADMIN = 'ADMIN' // Add admin view state
}
