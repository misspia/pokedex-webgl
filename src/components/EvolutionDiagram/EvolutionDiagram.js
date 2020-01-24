import React, { useState, useEffect } from 'react';
import * as S from './EvolutionDiagram.styles';
import EvolutionNode from '../EvolutionNode';
import { LoadingOverlay } from '../common';
import { clone } from '../../utils';

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
  const [numNodesLoaded, setNumNodesLoaded] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  let list = clone(chain);
  const babyIndex = list.findIndex(node => node.evolvesFromId === null);
  const [baby] = list.splice(babyIndex, 1);
  console.debug('BABY', baby)
  let tree = {
    ...baby,
    next: createTree(list, baby.id),
  };
  console.debug('tree', tree);


  useEffect(() => {
    if (numNodesLoaded === chain.length - 1) {
      setIsLoading(false);
    }
  }, [numNodesLoaded]);

  // console.debug(chain)
  return (
    <S.Wrapper>
      <LoadingOverlay isActive={isLoading} />
      {chain.map((node) => (
        <EvolutionNode
          key={node.id}
          id={node.id}
          name={node.name}
          spriteUrl={node.artworkUrl}
          types={node.types}
          onLoad={() => setNumNodesLoaded(numNodesLoaded + 1)}
        />
      ))}
    </S.Wrapper>
  );
}

function createTree(list, targetId) {
  if (!list.length) {
    return null;
  }

  const stage = [];
  let i = 0;
  while (list[i]) {
    if (list[i].evolvesFromId === targetId) {
      const [node] = list.splice(i, 1);
      stage.push({
        ...node,
        next: createTree(list, node.id),
      });
      i--;
    }
    i++
  }
  return stage;
}
