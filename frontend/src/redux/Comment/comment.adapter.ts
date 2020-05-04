import { CommentType, PieChartData, BarChartData } from './comment.types';
import { FetchedCommentType } from '../../services/networking/client.interface';
import { formatStringOrDateToDate } from '../../services/date/dateFormatter';

export const formatFetchedCommentForAppType = (comments: FetchedCommentType[]): CommentType[] => {
  return comments.map(comment => ({
    ...comment,
    creationDate: formatStringOrDateToDate(comment.creationDate),
  }));
};

export const formatFetchedPieChartDataForAppType = (pieChartData: PieChartData[]): PieChartData[] =>
  pieChartData;

export const formatFetchedBarChartDataForAppType = (
  barChartData: BarChartData[],
): BarChartData[] => {
  return barChartData.map(data => ({
    ...data,
    x: formatStringOrDateToDate(data.x),
  }));
};
