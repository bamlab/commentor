import { RootState } from 'redux/types';

export const getTagOverTime = (store: RootState) => store.graphData.tagsOverTime;
