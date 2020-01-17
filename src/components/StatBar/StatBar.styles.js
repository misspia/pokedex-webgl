import styled from 'styled-components';
import { Colors } from '../../themes';

const borderRadius = '3px';

export const Wrapper = styled.div`
  height: 1.5em;
  width: 100%;
  padding: 0.2em;
  border: solid 1px ${Colors.white};
  box-sizing: border-box;
  border-radius: ${borderRadius};

  ${props => props.customStyles}
`;

export const Progress = styled.div`
  background-color: ${Colors.white};
  width: ${props => props.progress || 0};
  height: 100%;
  border-radius: ${borderRadius};
`;
