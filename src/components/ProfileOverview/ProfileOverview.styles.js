import styled from 'styled-components';
import { Colors } from '../../themes';

export const Wrapper = styled.div`
  flex: 1;
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

export const Artwork = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;

  width: 20em;
  height: 20em;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ContentRow = styled(Row)`
  flex: 1;
`;
