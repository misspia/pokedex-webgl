import React, { useContext, useEffect, useState } from 'react';
import * as S from './Mouse.styles';
import { AppContext } from '../../contexts';
import { WebglEvents } from '../../constants/events';

export default function Mouse({
  isVisible = false,
}) {
  const context = useContext(AppContext);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    context.webgl.addEventListener(
      WebglEvents.MOUSEMOVE,
      e => {
        // setIsActive(!!e.card);
        setTop(e.top);
        setLeft(e.left);
      }
    );

    context.webgl.addEventListener(
      WebglEvents.FOCUS_CARD,
      e => {
        setIsActive(!!e.card);
      }
    );
  }, []);

  return (
    <S.Wrapper
      isVisible={isVisible}
      isActive={isActive}
      top={top}
      left={left}
    >

    </S.Wrapper>
  )
}
