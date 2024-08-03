export interface Option {
    id: string;
    label: string;
  }
  
  export interface Question {
    id: string;
    text: string;
    options: Option[];
    multiSelect: boolean; // New field to indicate if the question is multi-select
  }