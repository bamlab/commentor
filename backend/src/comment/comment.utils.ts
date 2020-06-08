import { Tag } from '../tag/tag.entity';
import { Comment } from './comment.entity';

export const filterTagsWithCodes = (tags: Tag[], codes: string[]): Tag[] => {
  const result = !!codes.length ? tags.filter((tag: Tag) => codes.includes(tag.code)) : tags;
  return result;
};

export const convertToDateRange = (date: Date, groupByFilter: 'day' | 'week' | 'month'): Date => {
  date.setHours(0, 0, 0, 0);
  if (groupByFilter === 'day') {
    return date;
  } else if (groupByFilter === 'week') {
    return getMonday(date);
  } else if (groupByFilter === 'month') {
    const firstDayMonth = new Date(date);
    firstDayMonth.setDate(1);
    return firstDayMonth;
  }
};

export const getMonday = (date: Date): Date => {
  const dayOfTheWeek = (date.getDay() || 7) - 1; // The or 7 is for sunday (which is 0)
  const dayNumber = date.getDate() - dayOfTheWeek;
  const monday = new Date(date);
  monday.setDate(dayNumber);
  return monday;
};
