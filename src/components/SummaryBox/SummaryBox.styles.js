import styled, { css } from 'styled-components';
import { Styles, Colors } from '../../themes';

export const Wrapper = styled(Styles.Box)`
  box-sizing: border-box;
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.5em;
  padding: 0.5em 0;

  &:not(:last-child) {
    border-bottom: solid 1px ${Colors.whiteTranslucent};
  }
`;

export const Label = styled.div`
  flex: 1;
  text-transform: uppercase;
  text-align: right;

`;

export const Value = styled.div`
  flex: 2;
  display: flex;
  padding-left: 1em;
`;

export const typeStyles = css`
  margin-right: 0.5em;
`;
