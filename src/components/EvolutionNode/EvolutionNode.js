import React from 'react';
import * as S from './EvolutionNode.styles';
import { formatNationalNo } from '../../utils';
import Type from '../common/Type';
import { TypeVariants } from '../common/Type/Type';

export default function EvolutionNode({
  spriteUrl = '',
  types = '',
  name = '',
  id = '',
  isEeveeChain = false,
  onLoad = () => { }
}) {
  return (
    <S.Wrapper isEeveeChain={isEeveeChain}>
      <S.Image
        src={spriteUrl}
        onLoad={onLoad}
      />
      <S.Info>
        <S.NationalNo>
          #{formatNationalNo(id)}
        </S.NationalNo>
        <S.Name>
          {name}
        </S.Name>
        <S.Types>
          {types.map((type) => (
            <Type
              key={type}
              name={type}
              variant={TypeVariants.SMALL}
              customStyles={S.typeStyles}
            />
          ))}
        </S.Types>
      </S.Info>
    </S.Wrapper>
  )
}
