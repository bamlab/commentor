import moment from 'moment';

export const formatDateToDDMMYYYYSlash = (date: Date) => moment(date).format('DD/MM/YYYY');

export const formatDateToDDMMYYYLined = (date: Date) => moment(date).format('DD-MM-YYYY');

export const formatDateToDDMMLined = (date: Date) => moment(date).format('DD-MM');
