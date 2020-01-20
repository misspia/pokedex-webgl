import React from 'react';
import * as S from './EvolutionDiagram.styles';

export default function EvolutionDiagram({
  /**
   * each node expects the following fields
   * id: stirng
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
  console.debug(chain)
  return (
    <S.Wrapper>
      {chain.map((node) => (
        <S.EvolutionNode
          key={node.id}
        >
          <span>{node.id}</span>
          <span>{node.name}</span>
          <span>{node.evolvesFromId}</span>
        </S.EvolutionNode>
      ))}
    </S.Wrapper>
  );
}
