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
  return (
    <S.Wrapper>
      <S.Row>
        <S.Title>
          {id} {name}
        </S.Title>
        <S.Image src={artworkUrl}/>
      </S.Row>
    </S.Wrapper>
  );
}
