import styled from 'styled-components';
import { Colors } from '../../themes';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;

`;

export const Enter = styled.div`
  color: ${Colors.black};
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: 0.3s all;

  &:hover {
    color: ${Colors.gold};
    letter-spacing: 5px;
  }
`;
