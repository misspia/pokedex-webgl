import React, { useEffect, useRef, useContext } from 'react';
import { AppContext } from '../../contexts';
import Stages from '../../constants/stages';
import * as S from './Entrance.styles';
import Animations from './Entrance.animations';

export default function Entrance({
  isActive = () => { },
  onEnter = () => { },
}) {
  const context = useContext(AppContext);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (context.stage === Stages.ENTRANCE) {
      Animations.reveal(wrapper.current);
    } else {
      Animations.hide(wrapper.current);
    }
  }, [context.stage]);

  return (
    <S.Wrapper ref={wrapperRef}>
      enter
    </S.Wrapper>
  )
}
