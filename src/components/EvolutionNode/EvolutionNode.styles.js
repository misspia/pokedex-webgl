import styled, { css } from 'styled-components';
import { Colors } from '../../themes';

export const Wrapper = styled.div`
  font-size: 0.6em;
  margin: 0.3em;
  width: 12.5em;
  height: 10em;

  display: flex;
  align-items: center;
  justify-content: center;
  border: solid ${Colors.white} 1px;
  border-radius: 0.5em;
`;

export const Image = styled.img`
  width: 5em;
  height: auto;
  margin-right: 0.5em;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  display: flex;
`;

export const NationalNo = styled.div`
  letter-spacing: 1px;
`;

export const Name = styled.div`
  text-transform: uppercase;
  letter-spacing: 1px;
`;


export const Types = styled.div`
  display: flex;
  margin: 0.5em -0.2em;
`;

export const typeStyles = css`
  margin: 0 0.2em;
`;
