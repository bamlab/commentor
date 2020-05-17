import styled, { css } from 'styled-components';
import { Modal as ModalComponent } from 'components/Modal/Modal';
import { borderRadius, fontStyles, getSpacing, colorUsage } from '../../../../stylesheet';

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
    display: flex;
    justify-content: center;
    align-items: center;
    left: 30%;
    top: 30%;
    bottom: auto;
    padding: 20px;
    background-color: white;
    overflow: auto;
    border-radius: ${borderRadius};
    outline: none;
    z-index: -2;
    -webkit-overflow-scrolling: touch;
  }
`;

export const ContentContainer = styled.div`
  flex: 1;
`;

export const HeaderTitle = styled.div`
  font-family: ${fontStyles.subTitle.fontFamily};
  font-weight: ${fontStyles.subTitle.fontWeight};
  font-size: ${fontStyles.subTitle.fontSize};
`;

export const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${getSpacing(2)};
  justify-content: space-around;
`;
export const Description = styled.div`
  flex: 1;
  width: 50px;
  word-break: break-word;
  margin: 2px;
  font-family: ${fontStyles.regular.fontFamily};
  font-weight: ${fontStyles.regular.fontWeight};
  font-size: ${fontStyles.regular.fontSize};
  text-align: center;
`;
export const Code = styled.div`
  margin: 2px;
  text-align: center;
  font-family: ${fontStyles.bold.fontFamily};
  font-weight: ${fontStyles.bold.fontWeight};
  font-size: ${fontStyles.bold.fontSize};
`;

export const Color = styled.div`
  background-color: ${({ color }: { color: string }) => color};
  border-radius: 30px;
  width: 30px;
  height: 30px;
  border: 1px solid black;
`;
export const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const CancelButton = styled.div`
  cursor: pointer;
  font-family: ${fontStyles.bold.fontFamily};
  font-weight: ${fontStyles.bold.fontWeight};
  font-size: ${fontStyles.bold.fontSize};
  color: ${colorUsage.error};
  :hover {
    background-color: transparent;
    opacity: 0.5;
  }
`;
