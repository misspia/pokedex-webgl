import React, { useEffect, useRef } from 'react';
import * as S from './Entrance.styles';
import * as Animations from './Entrance.animations';

export default function Entrance({
  onEnter = () => { },
}) {
  const wrapperRef = useRef(null);
  const lettersRef = useRef(null);

  useEffect(() => {
    Animations.enter(wrapperRef.current, lettersRef.current.children);
  }, []);

  return (
    <S.Wrapper ref={wrapperRef}>
      <S.Enter
        ref={lettersRef}
        onClick={() => {
          Animations
            .exit(wrapperRef.current, lettersRef.current.children)
            .then(() => onEnter())
        }}>
        <S.Letter>e</S.Letter>
        <S.Letter>n</S.Letter>
        <S.Letter>t</S.Letter>
        <S.Letter>e</S.Letter>
        <S.Letter>r</S.Letter>
      </S.Enter>
    </S.Wrapper>
  )
}

