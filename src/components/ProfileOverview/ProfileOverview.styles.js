import styled, { css } from 'styled-components';
import { Colors } from '../../themes';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  padding: 1em;
  box-sizing: border-box;
  color: ${Colors.white};
`;

export const Row = styled.div`
  display: flex;
  padding: 0.5em;
`;

export const Header = styled(Row)`
  justify-content: center;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 3em;
  letter-spacing: 2px;
`;

export const Subtitle = styled.div`
  font-size: 1.2em;
  margin: 1em 0 0.5em;
  letter-spacing: 1px;
`;

export const Image = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;

  width: 35%;
  height: auto;
`;

export const ContentGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1em;
`;

export const SummaryBox = styled.div`
  display: flex;
  flex-direction: column;
`;

