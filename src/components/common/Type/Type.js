import React from 'react';
import * as S from './Type.styles';
import { Images } from '../../../themes';

export const TypeVariants = {
  SMALL: 'small',
  MEDIUM: 'medium',
};

export default function Type({
  name = '',
  variant = TypeVariants.MEDIUM,
  customStyles = '',
}) {
  return (
    <S.Wrapper type={name} customStyles={customStyles}>
      {
        variant === TypeVariants.MEDIUM ?
          <S.Image src={Images[name]} /> :
          null
      }
    </S.Wrapper>
  )
}
