import { TagType } from '../../redux/Tag';
import { FiltersState } from '../../redux/Filters';

export interface TagLegendsPropsTypes {
  tags: TagType[];
  filters: FiltersState;
}
