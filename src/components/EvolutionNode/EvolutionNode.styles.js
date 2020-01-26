import styled from 'styled-components';
import { Colors } from '../../themes';

export const Wrapper = styled.div`
  font-size: 0.6em;
  margin: 0.5em;
  width: 12em;
  height: 10em;

  display: flex;
  align-items: center;
  justify-content: center;
  border: solid ${Colors.white} 1px;
  border-radius: 0.5em;
`;

export const Image = styled.img`
  width: 5em;
  height: auto;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  display: flex;
`;

export const NationalNo = styled.div`
  letter-spacing: 1px;
`;

export const Name = styled.div`
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
