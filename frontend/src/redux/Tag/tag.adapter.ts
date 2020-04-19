import { TagType } from './tag.types';
import { FiltersState } from '../Filters';

export const filterTags = (tags: TagType[], filter: FiltersState): TagType[] =>
  tags.filter(
    tag => filter.tagCodes.includes(tag.code.toString()) || !(filter.tagCodes.length > 0),
  );
