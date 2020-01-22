import React from 'react';
import * as S from './EvolutionNode.styles';
import { formatNationalNo } from '../../utils';

export default function EvolutionNode({
  spriteUrl = '',
  types = '',
  name = '',
  id = '',
  onLoad = () => { }
}) {
  return (
    <S.Wrapper>
      <S.Image
        src={spriteUrl}
        onLoad={onLoad}
      />
      <S.Title>
        <S.NationalNo>
          #{formatNationalNo(id)}
        </S.NationalNo>
        <S.Name>
          {name}
        </S.Name>
      </S.Title>
      <S.Types>
        {types.map((type) => (
          <S.Type key={type} type={type}></S.Type>
        ))}
      </S.Types>
    </S.Wrapper>
  )
}
