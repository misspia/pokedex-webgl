import React from 'react';
import StatBar from '../StatBar';
import * as S from './StatsBox.styles';


const statKeyMap = {
  hp: 'hp',
  attack: 'atk',
  defense: 'def',
  'special-attack': 'sp. atk',
  'special-defense': 'sp. def',
  speed: 'spd',
};

export default function StatsBox({
  stats = [],
}) {
  return (
    <S.Wrapper>
      {stats.map((stat) => (
        <S.Row key={stat.key}>
          <S.Row>
            {statKeyMap[stat.key]}
          </S.Row>
          <StatBar stat={stat.value} />
          <S.Value>
            {stat.value}
          </S.Value>
        </S.Row>
      ))}
    </S.Wrapper>
  )
}
