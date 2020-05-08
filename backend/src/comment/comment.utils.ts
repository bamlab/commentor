import { Tag } from '../tag/tag.entity';

export const filterTagsWithCodes = (tags: Tag[], codes: string[]): Tag[] =>
  tags.filter((tag: Tag) => {
    let result = false;
    codes.forEach(tagCode => {
      if (tag.code === tagCode) {
        result = true;
        return;
      }
    });
    return result;
  });
