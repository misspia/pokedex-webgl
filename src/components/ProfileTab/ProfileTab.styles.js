import styled from 'styled-components';
import { Colors } from '../../themes';

const skew = '20deg';

export const Wrapper = styled.div`
  background-color: ${props => props.isActive ? Colors.types[props.type] : Colors.white};
  color: ${props => props.isActive ? Colors.white : Colors.types[props.type]};
  width: 8em;
  height: 3em;

  text-transform: uppercase;
  letter-spacing: 1px;
  transition: 0.2s all;
  cursor: pointer;

  transform: skewX(-${skew});
`;

export const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  transform: skewX(${skew});
`;
