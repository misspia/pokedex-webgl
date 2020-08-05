import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 0 1em;
  box-sizing: border-box;
`;

export const Image = styled.img`
  height: auto;
  width: 50%;
  min-width: 10em;
  max-width: 18em;
  margin-bottom: 1em;
`;


export const Message = styled.div`
  width: 100%;
  word-break: break-word;
  text-align: center;
  font-size: 1.5em;
`;
