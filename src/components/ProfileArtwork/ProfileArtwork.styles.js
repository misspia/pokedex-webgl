import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 20em;
  height: 20em;

  ${props => props.customStyles}
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
`;
