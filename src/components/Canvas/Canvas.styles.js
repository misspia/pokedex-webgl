import styled from 'styled-components';

export const Canvas = styled.canvas`
  width: 100%;
  height: 100%;

  cursor: ${props => props.isPointer ? 'pointer' : 'default'};
`;
