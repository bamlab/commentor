export interface Tag {
  id: number;
  code: string;
  description: string;
  color: string;
  created_at: string;
}

export interface InputTag {
  code: string;
  description: string;
  color: string;
}