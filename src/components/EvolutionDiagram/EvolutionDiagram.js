import React, { useState, useEffect } from 'react';
import * as S from './EvolutionDiagram.styles';
import EvolutionNode from '../EvolutionNode';
import { LoadingOverlay } from '../common';
import { clone } from '../../utils';

const EEVEE_ID = 133;
export default function EvolutionDiagram({
  /**
   * each node expects the following fields
   * id: number
   * types: [string]
   * artworkUrl
   * name: string
   * evolvesFromId: int
   * evolutionTrigger: string
   * triggerItem: string
   * minimumLevel: int
   * gender: string
   * location: sting
   * heldItem: string
   * timeOfDay: string
   * knownMove: string
   * mimimumHappiness: int
   * minimumBeauty: int
   * minimumAffection: int
   * relativePhysicalStats: int
   * needsOverworldRain: bool
   * turnUpsideDown: bool
   */
  chain = [],
}) {
  const isEeveeChain = !!chain.find(node => node.id === EEVEE_ID);
  const [isLoading, setIsLoading] = useState(false);
  const [numNodesLoaded, setNumNodesLoaded] = useState(0);
  const incrementNumNodesLoaded = () => setNumNodesLoaded(numNodesLoaded + 1);

  let list = clone(chain);
  const babyIndex = list.findIndex(node => node.evolvesFromId === null);
  const [baby] = list.splice(babyIndex, 1);

  useEffect(() => {
    if (numNodesLoaded === chain.length - 1) {
      setIsLoading(false);
    }
  }, [numNodesLoaded]);

  return (
    <S.Wrapper isEeveeChain={isEeveeChain}>
      {/* <LoadingOverlay isActive={isLoading} /> */}
      <S.Row>
        <S.Col>
          <EvolutionNode
            id={baby.id}
            name={baby.name}
            spriteUrl={baby.artworkUrl}
            types={baby.types}
            onLoad={incrementNumNodesLoaded}
          />
        </S.Col>
        <S.Row limit={isEeveeChain}>
          {renderTree(list, baby.id, incrementNumNodesLoaded)}
        </S.Row>
      </S.Row>
    </S.Wrapper>
  );
}

function renderTree(list, targetId, onLoad) {
  if (!list.length) {
    return null;
  }
  let stageNodes = [];
  let i = 0;
  while (list[i]) {
    if (list[i].evolvesFromId === targetId) {
      const [node] = list.splice(i, 1);
      stageNodes.push(node);
      i--;
    }
    i++
  }
  return (
    stageNodes.map((node => (
      <S.Row key={node.id}>
        <S.Col>
          <EvolutionNode
            id={node.id}
            name={node.name}
            spriteUrl={node.artworkUrl}
            types={node.types}
            onLoad={onLoad}
          />
        </S.Col>
        <S.Col>
          {renderTree(list, node.id, onLoad)}
        </S.Col>
      </S.Row>
    )))
  )
}
