
export interface GeoPoint {
  place: string;
  coordinates?: { lat: number; lng: number }; // Estimated
  type: 'origin' | 'reference';
}

export interface AnalysisData {
  // Q2, Q6: Metadata & Extraction
  summary: string;
  titleSuggestion: string;
  keywords: string[];
  
  // Q2: Entities & Events
  entities: {
    people: string[];
    locations: string[];
    dates: string[];
    organizations: string[];
    events: string[]; // Q2
  };
  
  // Q4, Q11: Typology & Paleography
  typology: string; // e.g., "Real Cédula", "Carta Dotal"
  scriptType: string; // e.g., "Visigótica", "Cortesana"
  language: string;
  
  // Q12: Geography
  geodata: GeoPoint[];
  
  // Q8: Cataloging
  suggestedSeries: string; // e.g., "Protocolos Notariales"
  
  // Q15: Curation
  qualityAlerts: string[]; // e.g., "Posible error de fecha", "Texto ilegible en folio 2"
  
  // Q13: Themes (Sentiment/Tone)
  sentiment: string;
  historicalContext?: string;

  // Q10: Explicit text references found by AI
  documentReferences?: string[]; // e.g., "Referencia a la carta del día 5"
}

export interface VisualAnalysis {
  // Q5, Q7: Visual Elements
  hasSeals: boolean;
  hasMaps: boolean;
  hasTables: boolean;
  hasIlluminations: boolean;
  physicalCondition: string; // e.g., "Manchas de humedad", "Roturas"
}

export interface RelationMatch {
  manuscriptId: string;
  score: number; // 0-100 relevance
  reason: 'duplicate' | 'same_expediente' | 'same_date' | 'reference';
  details: string;
}

export interface Manuscript {
  id: string;
  title: string;
  imageUrl: string;
  
  // Q1, Q14
  transcription: string;
  translation?: string; // Q14
  
  analysis: AnalysisData | null;
  visualAnalysis: VisualAnalysis | null; // New field
  
  createdAt: Date;
  status: 'pending' | 'processing' | 'completed';
  
  // Q9, Q10: Relationships
  isDuplicateOf?: string;
  relatedManuscriptIds?: string[]; // IDs stored
  calculatedRelations?: RelationMatch[]; // Dynamic relations calculated at runtime
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  TRANSCRIBE = 'TRANSCRIBE',
  LIBRARY = 'LIBRARY',
  SETTINGS = 'SETTINGS',
  GUIDE = 'GUIDE'
}
