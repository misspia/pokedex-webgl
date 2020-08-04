import styled from 'styled-components';
import { Colors } from '../../themes';

export const Wrapper = styled.div.attrs(props => ({
  style: {
    top: `${props.top}px`,
    left: `${props.left}px`,
    width: props.isActive ? '5em' : '1em',
    height: props.isActive ? '5em' : '1em',
    backgroundColor: props.isActive ? 'transparent' : Colors.red,
    display: props.isVisible ? 'block' : 'none',
  },
}))`
  position: absolute;

  border-radius: 50%;
  border: solid 1px ${Colors.red};
  transform: translate(-50%, -50%);

  pointer-events: none;
  transition: width 0.5s, height 0.5s, background-color 0.3s;
  z-index: 99;
`;
