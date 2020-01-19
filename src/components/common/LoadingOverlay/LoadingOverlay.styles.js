import styled from 'styled-components';
import { Colors } from '../../../themes';

export const Wrapper = styled.div`
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${Colors.blue};
  color: ${Colors.white};
`;

