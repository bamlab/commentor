export type TagType = {
  id: number;
  code: string;
  color: string;
  description: string;
  oAuthLogin: string | null;
  creationDate: Date;
  isDefault: boolean;
};

export type TagEvent = {
  code: string;
  color: string;
  description: string;
};
