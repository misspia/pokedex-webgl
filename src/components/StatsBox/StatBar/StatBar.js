import React from 'react';
import * as S from './StatBar.styles';

const MAX_STAT = 255;

export default function StatBar({
  stat = 0,
  customStyles = '',
}) {
  const progress = `${stat / MAX_STAT * 100}%`;
  return (
    <S.Wrapper customStyles={customStyles}>
      <S.Progress progress={progress}></S.Progress>

    </S.Wrapper>
  )
}
