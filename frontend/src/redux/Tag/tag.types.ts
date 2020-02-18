export type TagType = {
  id: number;
  code: string;
  color: string;
  description: string;
  creationDate: Date;
  adminLock?: boolean; // to add in db
};

export type TagEvent = {
  code: string;
  color: string;
  description: string;
};
