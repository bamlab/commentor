import styled from 'styled-components';

/**
 * @description To use this background, z-index of container should be set to -2 or less
 */
export const Background = styled.div`
  position: absolute;
  flex: 1;
  height: 100%;
  width: 100%;
  background: url('/logo.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 200%;
  opacity: 0.15;
  z-index: -1;
`;
