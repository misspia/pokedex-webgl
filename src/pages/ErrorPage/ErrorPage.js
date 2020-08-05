import React from 'react';
import * as S from './ErrorPage.styles';

const errorMessages = {
  mobile: `Sorry, we don't support mobile users`,
};

export default function ErrorPage({}) {
  return (
    <S.Wrapper>
      <S.Message>
        {errorMessages.mobile}
      </S.Message>
    </S.Wrapper>
  )
}
