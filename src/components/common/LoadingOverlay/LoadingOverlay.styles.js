import styled from 'styled-components';
import { Colors } from '../../../themes';

export const Wrapper = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${Colors.white};
  color: ${Colors.black};
`;

export const AnimationWrapper = styled.div`
  margin-bottom: 3em;
`;

export const Sprite = styled.div`
  width: 50px;
  height: auto;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    background-color: ${Colors.shadow};
    width: 70%;
    height: 5px;
    bottom: 2px;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 50%;
  }

`;
export const Image = styled.img`
  width: 100%;
  height: auto;
`;

export const Bar = styled.div`
  height: 5px;
  width: 90%;
  max-width: 400px;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
`;

export const Progress = styled.div.attrs(props => ({
  style: {
    width: `${props.percent}%`,
  },
}))`
  border-radius: 0.5em;
  height: 100%;
  background-color: ${Colors.black};
  transition: 0.3s all;
`;

export const Text = styled.div`
  margin-top: 1em;
  text-align: center;
`;
