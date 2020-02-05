import React, { useEffect, useRef } from 'react';
import * as S from './LoadingOverlay.styles';
import { Images } from '../../../themes';
import * as Animations from './LoadingOverlay.animations';

export default function LoadingOverlay({
  isActive = false,
  progress = null,
}) {
  const wrapperRef = useRef(null);
  const spriteRef = useRef(null);
  const spriteImgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      Animations.roll(spriteRef.current, spriteImgRef.current);
    }
  }, [isActive]);

  useEffect(() => {
    console.debug('is loading overlay active', isActive, wrapperRef)
    if (!isActive) {
      Animations.fadeOut(wrapperRef.current, textRef.current);
    } else {
      Animations.fadeIn(wrapperRef.current);
    }
  }, [isActive]);

  return (
    <S.Wrapper ref={wrapperRef}>
      <S.AnimationWrapper>
        <S.Sprite ref={spriteRef}>
          <S.Image
            ref={spriteImgRef}
            src={Images.loadingSprite}
          />
        </S.Sprite>
      </S.AnimationWrapper>
      <S.Bar>
        <S.Progress percent={(1 - progress) * 100}></S.Progress>
      </S.Bar>
      <S.Text ref={textRef}>
        {Math.round(progress * 100)}%
      </S.Text>
    </S.Wrapper>
  )
}
