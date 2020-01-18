import React from 'react';
import Type from '../common/Type';
import * as S from './Types.styles.js';


export default function TypesBox({
  types = [],
}) {
  return (
    <S.Wrapper>
      <S.Types>
        {types.map(type => (
          <Type
            key={type}
            name={type}
            customStyles={S.typeStyles} />
        ))}
      </S.Types>
    </S.Wrapper>
  )
}
