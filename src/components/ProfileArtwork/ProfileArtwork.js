import React, { useRef, useEffect } from 'react';
import * as S from './ProfileArtwork.styles';
import * as Animations from './ProfileArtwork.animations';

export default function ProfileArtwork({
  src = '',
  onLoad = () => { },
  customStyles = '',
}) {
  const wrapperRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (wrapperRef.current && imageRef.current) {
      Animations.enter(
        wrapperRef.current,
        imageRef.current
      );
    }
  }, [wrapperRef.current, imageRef.current]);

  return (
    <S.Wrapper
      ref={wrapperRef}
      customStyles={customStyles}>
      <S.Image
        ref={imageRef}
        src={src}
        onLoad={onLoad}
      />
    </S.Wrapper>
  )
}
