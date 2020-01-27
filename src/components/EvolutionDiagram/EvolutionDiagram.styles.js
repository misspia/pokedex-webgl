import styled from 'styled-components';

export const Wrapper = styled.div`
  font-size: ${props => props.isEeveeChain ? '0.8em' : '1em'};
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  max-width: ${props => props.limit ? '70%' : '100%'};
`;
