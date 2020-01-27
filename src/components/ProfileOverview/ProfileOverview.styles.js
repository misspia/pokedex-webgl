import styled, { css } from 'styled-components';
import { Colors, Styles } from '../../themes';

export const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 1em;
  box-sizing: border-box;
  color: ${Colors.white};
`;

export const Header = styled.div`
  margin-top: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => Colors.types[props.type]};
`;

export const Title = styled.div`
  font-size: 3em;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

export const Subtitle = styled.div`
  font-size: 1.2em;
  margin: 1em 0 0.5em;
  letter-spacing: 1px;
`;

export const InnerWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 8em;
`;

const mainContentWidth = '30em';

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 20em;
  width: ${mainContentWidth};
  border-bottom-left-radius: 1em;
  border-bottom-right-radius: 1em;
  background-color: ${props => Colors.types[props.type]};

  &::before {
    content: '';
    position: absolute;
    top: -8em;
    left: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 8em ${mainContentWidth};
    border-color: transparent transparent ${props => Colors.types[props.type]} transparent;
  }
`;

export const artworkStyles = css`
  z-index: 1;
  position: absolute;
  top: -15%;
  right: 0;
  left: 0;
  margin: auto;

  width: 20em;
  height: 20em;
`;


export const View = styled.div`
  opacity: 0;
  position: absolute;
  flex: 1;

  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EvolutionBox = styled(Styles.Box)`
  padding: 0 1em;
`
export const Tabs = styled.div`
  display: flex;
  margin-top: 1em;
`;

export const Tab = styled.div`
  padding: 0.5em 1.5em;
  margin: 0 0.5em;
  border-radius: 1em;

  background-color: ${props => props.isActive ? Colors.types[props.type] : 'transparent'};
  color: ${props => props.isActive ? Colors.white : Colors.types[props.type]};
  border: solid 1px;
  border-color: ${props => props.isActive ? 'transparent' : Colors.types[props.type]};

  text-transform: uppercase;
  letter-spacing: 1px;
  transition: 0.2s all;
  cursor: pointer;
`;
