import React, { useEffect, useRef, useContext } from 'react';
import { AppContext } from '../../contexts';
import Stages from '../../constants/stages';
import * as S from './Entrance.styles';
import * as Animations from './Entrance.animations';

export default function Entrance({
  isActive = () => { },
  onEnter = () => { },
}) {
  const context = useContext(AppContext);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (context.stage === Stages.ENTRANCE) {
      Animations.reveal(wrapperRef.current);
    } else {
      Animations.hide(wrapperRef.current);
    }
  }, [context.stage]);

  return (
    <S.Wrapper ref={wrapperRef}>
      <S.Enter onClick={() => {
        console.debug('on enter')
        onEnter()
      }}>
        enter
      </S.Enter>
    </S.Wrapper>
  )
}

