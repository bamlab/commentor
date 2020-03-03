import React from 'react';
import { Modal } from 'components/Modal/Modal';
import { RequesterMultiSelect } from 'components/RequesterMultiSelect';
import { CommentorMultiSelect } from 'components/CommentorMultiSelect';
import Text from 'components/Text';
import styled from 'styled-components';

import { borderRadius, colorUsage } from 'stylesheet';

type PropsType = {
  id: string;
  isOpen: boolean;
  closeFilterModal: () => void;
};

const MultiSelectContainer = styled.div`
  margin: 10px;
`;

/**
 * @todo Change it to not-full-page modal
 */
const FullPageModalContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const customStyles = {
  content: {
    borderRadius: borderRadius.large,
    backgroundColor: colorUsage.headerBackground,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const FilterModal = (props: PropsType) => {
  return (
    <Modal
      id={props.id}
      isOpen={props.isOpen}
      contentLabel="Filter your comment"
      onRequestClose={props.closeFilterModal}
      style={customStyles}
    >
      <FullPageModalContainer>
        <Text>Requesters:</Text>
        <MultiSelectContainer>
          <RequesterMultiSelect placeholder="Select your requester(s) .." />
        </MultiSelectContainer>
        <Text>Commentors:</Text>
        <MultiSelectContainer>
          <CommentorMultiSelect placeholder="Select your commentor(s)..." />
        </MultiSelectContainer>
      </FullPageModalContainer>
    </Modal>
  );
};

export default FilterModal;
