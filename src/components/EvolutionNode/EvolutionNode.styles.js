import styled from 'styled-components';
import { Colors } from '../../themes';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10em;
  height: 12em;
  border: solid red 1px;
`;

export const Image = styled.img`
  width: 6em;
  height: auto;
`;

export const Title = styled.div`
  display: flex;
`;

export const NationalNo = styled.div``;

export const Name = styled.div`
  margin-left: 0.5em;
  text-transform: uppercase;
  letter-spacing: 1px;
`;


export const Types = styled.div`
  display: flex;
  margin: 0.5em -0.2em;
`;

export const Type = styled.div`
  margin: 0 0.2em;
  width: 0.8em;
  height: 0.8em;
  border-radius: 50%;
  background-color: ${props => Colors[props.type]};
`;
