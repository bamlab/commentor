export interface TagType {
  id: number;
  code: string;
  color: string;
  description: string;
  oAuthLogin: string | null;
  creationDate: Date;
  isDefault: boolean;
}

export interface TagEvent {
  code: string;
  color: string;
  description: string;
}
