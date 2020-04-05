import { format, parseISO } from 'date-fns';

export type FomattingFunctionType = (date: Date) => string;

export const formatDateToDDMMYYYYSlash = (date: Date): string => format(date, 'dd/MM/YYY');

export const formatDateToDDMMYYYLined = (date: Date): string => format(date, 'dd-MM-YYY');

export const formatDateToDDMMLined = (date: Date): string => format(date, 'dd-MM');

export const formatStringOrDateToDate = (date: Date | string): Date => {
  if (typeof date === 'string') return parseISO(date);
  return date;
};
