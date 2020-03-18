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

export const Letter = styled.div`

`;


export const Enter = styled.div`
  font-size: 1.1em;
  display: flex;
  justify-content: center;
  color: ${Colors.black};
  cursor: pointer;

  ${Letter} {
    text-transform: uppercase;
    margin: 0 3px;
    transition: all 0.3s;
  }

  &:hover {
    ${Letter} {
      margin: 0 5px;
    }

  }
`;

