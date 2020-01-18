import React from 'react';
import * as S from './ProfileOverview.styles';
import Type from '../common/Type';
import SummaryBox from '../SummaryBox';
import StatsBox from '../StatsBox';

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
        <StatsBox stats={stats}/>
        <SummaryBox
          abilities={abilities}
          height={height}
          weight={weight}
          baseExperience={baseExperience}
        />
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

