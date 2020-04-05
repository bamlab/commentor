import { format } from 'date-fns';

export type FomattingFunctionType = (date: Date) => string;

export const formatDateToDDMMYYYYSlash = (date: Date) => format(date, 'dd/MM/YYY');

export const formatDateToDDMMYYYLined = (date: Date) => format(date, 'dd-MM-YYY');

export const formatDateToDDMMLined = (date: Date) => format(date, 'dd-MM');
