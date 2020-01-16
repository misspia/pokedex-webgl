import React from 'react';
import * as S from './ProfileOverview.styles';
import ProfileImage from '../ProfileImage/ProfileImage';


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
      <S.Row>
        <S.Title>
          {id} {name}
        </S.Title>
        <S.Image src={artworkUrl}/>
      </S.Row>
      <S.ContentGrid>
        <S.StatsBox>
          {stats.map((stat) => (
            <S.StatRow key={stat.key}>
              <S.StatKey>
                {stat.key}
              </S.StatKey>
              <S.StatValue>
                {stat.value}
              </S.StatValue>
            </S.StatRow>
          ))}
        </S.StatsBox>
        <S.SummaryBox>
          summary
        </S.SummaryBox>
        <S.AbilitiesBox>
          abilities
        </S.AbilitiesBox>
        <div>
          div
        </div>
      </S.ContentGrid>
    </S.Wrapper>
  );
}
