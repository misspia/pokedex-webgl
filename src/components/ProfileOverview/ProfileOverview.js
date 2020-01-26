import React, { useState, useEffect, useRef } from 'react';
import * as S from './ProfileOverview.styles';
import * as Animations from './ProfileOverview.animations';
import ProfileArtwork from '../ProfileArtwork';
import SummaryBox from '../SummaryBox';
import StatsBox from '../StatsBox';
import EvolutionDiagram from '../EvolutionDiagram';
import { LoadingOverlay } from '../common';

const SUMMARY = 'summary';
const STATS = 'stats';
const EVOLUTION = 'evolution';

const navTabs = [
  SUMMARY,
  STATS,
  EVOLUTION,
];

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
  const evolutionRef = useRef(null);
  const statsRef = useRef(null);
  const summaryRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(SUMMARY);
  const prevActiveTab = usePrevious(activeTab);

  const getRef = (tabName) => {
    switch (tabName) {
      case SUMMARY: {
        return summaryRef;
      }
      case EVOLUTION: {
        return evolutionRef;
      }
      case STATS: {
        return statsRef;
      }
      default: {
        return { current: null };
      }
    }
  };

  useEffect(() => {
    const currRef = getRef(activeTab).current;
    const prevRef = getRef(prevActiveTab).current;
    if (prevActiveTab === activeTab) {
      console.debug(currRef);
      Animations.revealView(currRef);
    } else {
      Animations.swapView(currRef, prevRef);
    }
  }, [activeTab, evolutionRef.current, statsRef.current, summaryRef.current]);


  return (
    <S.Wrapper>
      <LoadingOverlay isActive={isLoading} />
      <S.Header type={types[0]}>
        <S.Title>
          No. {id} {name}
        </S.Title>
      </S.Header>
      <S.InnerWrapper>
        <ProfileArtwork
          src={artworkUrl}
          onLoad={() => setIsLoading(false)}
          customStyles={S.artworkStyles}
        />
        <S.Content type={types[0]}>
          <S.View ref={statsRef}>
            <StatsBox stats={stats} />
          </S.View>
          <S.View ref={summaryRef}>
            <SummaryBox
              abilities={abilities}
              height={height}
              weight={weight}
              baseExperience={baseExperience}
              types={types}
            />
          </S.View>
          <S.View ref={evolutionRef}>
            <S.EvolutionBox>
              <EvolutionDiagram chain={chain} />
            </S.EvolutionBox>
          </S.View>
        </S.Content>
        <S.Tabs>
          {navTabs.map(tab => (
            <S.Tab
              key={tab}
              onClick={() => setActiveTab(tab)}
              type={types[0]}
              isActive={tab === activeTab}
            >
              {tab}
            </S.Tab>
          ))}
        </S.Tabs>
      </S.InnerWrapper>
    </S.Wrapper>
  );
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
