import styled from 'styled-components';
import { Colors } from '../../themes';

export const Wrapper = styled.div`
  width: 90vw;
  height: 80vh;
  padding: 1em;
  box-sizing: border-box;

  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  border: solid 0.5em ${Colors.blue};

`;


export const InnerWrapper = styled.div`
  background-color: ${Colors.blue};
  width: 100%;
  height: 100%;
  position: relative;
`;

export const Row = styled.div`
  display: flex;
`;

export const CloseButton = styled.div`
  position: absolute;
`;

export const Tabs = styled.div`
 display: flex;
`;
  // border: solid 1px red;
  // position: absolute;
  // width: 15em;
  // height: 8em;
  // bottom: -8em;
  // left: 0;
  // right: 0;

  // display: flex;

export const Tab = styled.div`
  flex: 1;
  cursor: pointer;
  text-transform: uppercase;
`;
