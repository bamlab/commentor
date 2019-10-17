export interface Tag {
  id: number;
  code: string;
  description: string;
  created_at: string;
}

export interface InputTag {
  code: string;
  description: string;
}
