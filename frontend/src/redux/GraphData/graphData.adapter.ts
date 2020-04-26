import { TagsOverTimeType } from './graphData.types';
import { FetchedTagsOverTime } from '../../services/networking/client.interface';

export const formatFetchedTagsOverTimeForAppType = (
  tagsOverTime: FetchedTagsOverTime,
): TagsOverTimeType => tagsOverTime;
