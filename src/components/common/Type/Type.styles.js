import styled from 'styled-components';
import { Colors } from '../../../themes';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => Colors.types[props.type] || Colors.unknown};

  height: 2em;
  width: 2em;
  border-radius: 50%;
  box-shadow: 0 0 1em 0.1em ${Colors.shadow};

  ${props => props.customStyles}

`;

export const Image = styled.img`
  width: 60%;
  height: auto;
  display: block;
  fill: ${Colors.white};
`;
