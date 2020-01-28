import styled from 'styled-components';
import { Colors } from '../../../themes';
import { TypeVariants } from './Type';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => Colors.types[props.type] || Colors.unknown};


  border-radius: 50%;

  ${
  props => props.variant === TypeVariants.MEDIUM ?
    `
    height: 2em;
    width: 2em;
    box-shadow: 0 0 1em 0.1em ${Colors.shadow};

  ` :
    `
    height: 0.8em;
    width: 0.8em;
    border: solid 1px ${Colors.whiteTranslucent};
  `
  }

  ${props => props.customStyles}

`;

export const Image = styled.img`
  width: 60%;
  height: auto;
  display: block;
  fill: ${Colors.white};
`;
