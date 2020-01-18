import styled from 'styled-components';
import { Styles } from '../../themes';

export const Wrapper = styled(Styles.Box)`

`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 6em 3fr;
  margin-bottom: 0.5em;
`;

export const Label = styled.div`
  text-transform: uppercase;
`;

export const Value = styled.div`

`;
