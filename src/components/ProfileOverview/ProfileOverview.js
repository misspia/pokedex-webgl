import React from 'react';
import * as S from './ProfileOverview.styles';
import Type from '../common/Type';
import StatBar from '../StatBar';

const statKeyMap = {
  hp: 'hp',
  attack: 'atk',
  defense: 'def',
  'special-attack': 'sp. atk',
  'special-defense': 'sp. def',
  speed: 'spd',
};

export default function ProfileOverview({
  id = 0,
  name = '',
  types = [],
  height = 0,
  weight = 0,
  baseExperience = 0,
  abilities = [],
  /**
   * stat = { key: string, value: number }
   */
  stats = [],
  artworkUrl = '',
}) {
  console.debug(stats)
  return (
    <S.Wrapper>
      <S.Header>
        <S.Title>
          No. {id} {name}
        </S.Title>
        <S.Image src={artworkUrl}/>
      </S.Header>
      <S.ContentGrid>
        <S.StatsBox>
          {stats.map((stat) => (
            <S.StatRow key={stat.key}>
              <S.StatKey>
                {statKeyMap[stat.key]}
              </S.StatKey>
              <StatBar stat={stat.value}/>
              <S.StatValue>
                {stat.value}
              </S.StatValue>
            </S.StatRow>
          ))}
        </S.StatsBox>
        <S.SummaryBox>
          summary
        </S.SummaryBox>
        <S.SummaryBox>
          <S.Subtitle>Abilities</S.Subtitle>
          <S.Abilities>
            {abilities.map(ability => (
              <S.Ability key={ability}>
                {ability}
              </S.Ability>
            ))}
          </S.Abilities>
          <S.Subtitle>Types</S.Subtitle>
          <S.Types>
            {types.map(type => (
              <Type
              key={type}
              name={type}
              customStyles={S.typeStyles}/>
            ))}
          </S.Types>
        </S.SummaryBox>
        <div>
          div
        </div>
      </S.ContentGrid>
    </S.Wrapper>
  );
}

