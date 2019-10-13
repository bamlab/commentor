import React from 'react';
import { Wrapper } from './UpdateIcon.style';

type propsType = {
  updateTag: (tagId: number, code: string, description: string) => void;
  objectId: number;
};

export const UpdateIcon: React.FunctionComponent<propsType> = props => {
  return <Wrapper onClick={() => props.updateTag(props.objectId, 'edited', 'edited')} />;
};
