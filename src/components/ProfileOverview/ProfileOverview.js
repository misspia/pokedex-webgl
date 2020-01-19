import React, { useState, useEffect } from 'react';
import * as S from './ProfileOverview.styles';
import SummaryBox from '../SummaryBox';
import StatsBox from '../StatsBox';
import TypesBox from '../TypesBox';
import SizeDiagramBox from '../SizeDiagramBox';
import { LoadingOverlay } from '../common';

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

  const [isLoading, setIsLoading] = useState(true);
  return (
    <S.Wrapper>
      <LoadingOverlay isActive={isLoading}/>
      <S.Header>
        <S.Title>
          No. {id} {name}
        </S.Title>
        <S.Image
          src={artworkUrl}
          onLoad={() => setIsLoading(false)}
        />
      </S.Header>
      <S.ContentGrid>
        <StatsBox stats={stats}/>
        <SummaryBox
          abilities={abilities}
          height={height}
          weight={weight}
          baseExperience={baseExperience}
        />
        <TypesBox types={types}/>
        <SizeDiagramBox height={height}/>
      </S.ContentGrid>
    </S.Wrapper>
  );
}

