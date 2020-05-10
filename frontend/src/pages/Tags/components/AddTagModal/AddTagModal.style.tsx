import { Modal as ModalComponent } from 'components/Modal/Modal';
import styled from 'styled-components';
import But from 'components/Button';
import { fontStyles, getSpacing, borderRadius, colorUsage } from '../../../../stylesheet';
import Input, { InputCssStyle } from 'components/Input/Input';

export const Modal = styled(ModalComponent)`
  &_overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.5);
  }

  &_content {
    position: absolute;
    left: 20rem;
    right: 20rem;
    top: 10rem;
    bottom: 10rem;
    padding: 20px;
    background-color: white;
    overflow: auto;
    border-radius: ${borderRadius};
    outline: none;
    -webkit-overflow-scrolling: touch;
  }
`;

export const Button = styled(But)``;

export const HeaderTitle = styled.div`
  font-family: ${fontStyles.bold.fontFamily};
  font-weight: ${fontStyles.bold.fontWeight};
  font-size: ${fontStyles.bold.fontSize};
`;

export const InputContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

export const TextInputsContainer = styled.div`
  flex: 1;
  display: grid;
  margin-right: ${getSpacing(2)};
`;

export const ColorPickerContainer = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  background-color: ${colorUsage.background};
  border-radius: ${borderRadius};
  margin-top: ${getSpacing(4)};
`;

export const TagInput = styled(Input)`
  flex: 1;
  margin-top: ${getSpacing(4)};
`;

export const DescriptionInput = styled.textarea`
  ${InputCssStyle};
  resize: none;
  margin-top: ${getSpacing(4)};
`;

export const CircleColorContainer = styled.div`
  margin: 10px;
`;

export const colorBase = [
  '#8968BA',
  '#C7B8DE',
  '#6C94BA',
  '#BCCEE0',
  '#4FC1BA',
  '#9FDDDA',
  '#E55E5E',
  '#F6CDCE',
  '#B7638C',
  '#DBB0C5',
  '#F1925F',
  '#FBE6DC',
  '#FCC760',
  '#FEEBC6',
  '#979797',
  '#E3E3E3',
];
