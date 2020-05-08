import { Tag } from '../tag/tag.entity';

export const filterTagsWithCodes = (tags: Tag[], codes: string[]): Tag[] => {
  const result = !!codes.length ? tags.filter((tag: Tag) => codes.includes(tag.code)) : tags;
  return result;
};
