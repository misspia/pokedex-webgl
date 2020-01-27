import React from 'react';
import * as S from './SummaryBox.styles';
import Type from '../common/Type';

export default function SummaryBox({
  abilities = [],
  height = 0,
  weight = 0,
  baseExperience = 0,
  types = [],

}) {
  return (
    <S.Wrapper>
      <S.Row>
        <S.Label>types</S.Label>
        <S.Value>
          {types.map(type => (
            <Type
              key={type}
              name={type}
              customStyles={S.typeStyles}
            />
          ))}
        </S.Value>
      </S.Row>
      <S.Row>
        <S.Label>height</S.Label>
        <S.Value>{height}</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>weight</S.Label>
        <S.Value>{weight}</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>base exp.</S.Label>
        <S.Value>{baseExperience}</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>ability</S.Label>
        <S.Value>
          {abilities.join(', ')}
        </S.Value>
      </S.Row>
    </S.Wrapper>
  )
}
