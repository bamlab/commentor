import { TagType } from './tag.types';
import { FiltersState } from '../Filters';

export const filterTags = (tags: TagType[], filter: FiltersState): TagType[] =>
  tags.filter(tag => filter.tagIds.includes(tag.id.toString()) || !(filter.tagIds.length > 0));
