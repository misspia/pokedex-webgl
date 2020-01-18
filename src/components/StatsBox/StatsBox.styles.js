import styled from 'styled-components';
import { Styles } from '../../themes';

export const Wrapper = styled(Styles.Box)`

`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 4em 3fr 3em;
  margin-bottom: 0.5em;

`;

export const Key = styled.div`
  padding-right: 0.5em;
  text-transform: uppercase;
  text-align: right;
`;

export const Value = styled.div`
  padding-left: 0.5em;
`;
