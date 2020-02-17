import React, { useEffect, useContext, useRef } from 'react';
import WebglContext from '../../webgl/WebglContext';
import * as S from './Canvas.styles';

export default function Canvas({
  entries = [],
  selectEntry = () => { },
}) {
  const context = useContext(WebglContext);
  const canvasRef = useRef(null);

  useEffect(() => {
    context.webgl.init(canvasRef.current);
    context.webgl.load(entries);
    context.webgl.draw();

    canvasRef.current.addEventListener(
      'mousedown',
      (e) => context.webgl.onCanvasClick(
        (id) => selectEntry(id)
      ),
      { passive: true }
    );
  }, []);



  return (
    <S.Canvas ref={canvasRef} />
  )
}

