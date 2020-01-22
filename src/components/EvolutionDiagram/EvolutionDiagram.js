import React, { useState, useEffect } from 'react';
import * as S from './EvolutionDiagram.styles';
import EvolutionNode from '../EvolutionNode';
import { LoadingOverlay } from '../common';

export default function EvolutionDiagram({
  /**
   * each node expects the following fields
   * id: stirng
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

  useEffect(() => {
    if (numNodesLoaded === chain.length - 1) {
      setIsLoading(false);
    }
  }, [numNodesLoaded]);

  console.debug(chain)
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
