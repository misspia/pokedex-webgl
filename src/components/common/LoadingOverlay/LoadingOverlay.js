import React, { useEffect, useRef } from 'react';
import * as S from './LoadingOverlay.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TweenLite } from 'gsap';

export default function LoadingOverlay({
  isActive = false,
}) {
  const wrapperEl =  useRef(null);

  useEffect(() => {
    if(!isActive) {
      TweenLite.to(wrapperEl.current, 0.5, {
        autoAlpha: 0,
        display: 'none',
      })
    } else {
      TweenLite.to(wrapperEl.current, 0.5, {
        autoAlpha: 1,
        display: 'flex',
      })
    }
  }, [isActive]);

  return (
    <S.Wrapper ref={wrapperEl}>
      loading ...
    </S.Wrapper>
  )
}
