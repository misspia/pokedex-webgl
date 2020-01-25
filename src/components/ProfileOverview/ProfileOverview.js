import React, { useState, useEffect, useRef } from 'react';
import * as S from './ProfileOverview.styles';
import ProfileArtwork from '../ProfileArtwork';
import SummaryBox from '../SummaryBox';
import StatsBox from '../StatsBox';
import EvolutionDiagram from '../EvolutionDiagram';
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
  chain = [],
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <S.Wrapper>
      <LoadingOverlay isActive={isLoading} />
      <S.Header>
        <S.Title>
          No. {id} {name}
        </S.Title>
        <ProfileArtwork
          src={artworkUrl}
          onLoad={() => setIsLoading(false)}
          customStyles={S.artworkStyles}
        />
      </S.Header>
      <S.Content>
        <S.ContentRow>
          <StatsBox stats={stats} />
          <SummaryBox
            abilities={abilities}
            height={height}
            weight={weight}
            baseExperience={baseExperience}
            types={types}
          />
        </S.ContentRow>
        <S.ContentRow>
          <EvolutionDiagram chain={chain} />
        </S.ContentRow>
      </S.Content>
    </S.Wrapper>
  );
}

