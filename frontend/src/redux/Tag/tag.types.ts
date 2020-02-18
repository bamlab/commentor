export type TagType = {
  id: number;
  code: string;
  color: string;
  description: string;
  githubLogin: string | null;
  creationDate: Date;
  isDefault: boolean; // to add in db
};

export type TagEvent = {
  code: string;
  color: string;
  description: string;
};
