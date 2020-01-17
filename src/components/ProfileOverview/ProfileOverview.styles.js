import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  padding: 1em;
  box-sizing: border-box;
`;

export const Row = styled.div`
  display: flex;
  padding: 0.5em;
`;

export const Title = styled.div`
  font-size: 3em;
`;

export const Subtitle = styled.div`
  font-size: 1.2em;
  margin-bottom: 0.5em;
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
`;

export const StatsBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatRow = styled.div`
  display: flex;
`;

export const StatKey = styled.div`

`;

export const StatValue = styled.div`

`;


export const SummaryBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AbilitiesBox = styled.div`

`;

export const Types = styled.div`
  display: flex;
`;

export const typeStyles = css`
  margin-right: 0.5em;
`;
