import styled from 'styled-components';
import { Colors } from '../../themes';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0.5em;
  box-sizing: border-box;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${Colors.whiteOverlayBackground};
`;

export const InnerWrapper = styled.div`
  background-color: ${Colors.white};
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
`;

export const CloseButton = styled.div`
  z-index: 1;
  position: absolute;
  top: 0.5em;
  right: 1em;
  font-size: 1.2em;
  color: ${Colors.black};
  cursor: pointer;
`;

export const Tabs = styled.div`
  position: absolute;
  width: 20em;
  height: 3em;
  bottom: -1.5em;
  left: 0;
  right: 0;
  margin: 0 auto;

  display: flex;
`;

export const Tab = styled.div`
  flex: 1;
  cursor: pointer;
  text-transform: uppercase;
  background-color: red;
  margin: 0 0.5em;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const TabView = styled.div`
  flex: 1;
`;

export const ProfileView = styled(TabView)`
  display: flex;
`;

export const EvolutionView = styled(TabView)`
  display: none;
`;
