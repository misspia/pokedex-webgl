import React from 'react';
import * as S from './ProfileTab.styles';

export default function ProfileTab({
  label = '',
  onClick = () => {},
  type = '',
  isActive = false,
}) {
  return (
    <S.Wrapper
      onClick={onClick}
      type={type}
      isActive={isActive}
    >
      <S.InnerWrapper>
        {label}
      </S.InnerWrapper>
    </S.Wrapper>
  );
}
