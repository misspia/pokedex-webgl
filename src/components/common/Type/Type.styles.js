import styled from 'styled-components';
import { Colors } from '../../../themes';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => Colors[props.type] || Colors.unknown};

  height: 2em;
  width: 2em;
  border-radius: 50%;

  ${props => props.customStyles}

`;

export const Image = styled.img`
  height: 70%;
  width: auto;
  display: block;
  fill: ${Colors.white};
`;
