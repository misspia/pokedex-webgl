import React from 'react';
import * as S from './Type.styles';
import { Images } from '../../../themes';

export default function Type({
  name = '',
  customStyles = '',
}) {
  return (
    <S.Wrapper type={name} customStyles={customStyles}>
      {
        Images[name] ?
        <S.Image src={Images[name]}/> :
        <div>
          ???
        </div>
      }
    </S.Wrapper>
  )
}
