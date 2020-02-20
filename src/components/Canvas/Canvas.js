import React, { useEffect, useContext, useRef, useState } from 'react';
import WebglContext from '../../webgl/WebglContext';
import WebglEvents from '../../constants/webglEvents';
import * as S from './Canvas.styles';

export default function Canvas({
  entries = [],
  selectEntry = () => { },
}) {
  const context = useContext(WebglContext);
  const canvasRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    context.webgl.init(canvasRef.current);
    context.webgl.load(entries);
    context.webgl.draw();

    context.webgl.addEventListener(
      WebglEvents.ACTIVATE_ENTRY,
      (e) => {
        selectEntry(e.id);
      }
    )
  }, []);

  useEffect(() => {
    context.webgl.addEventListener(
      WebglEvents.MOUSEMOVE,
      (e) => {
        if (!!e.card && !isPointer) {
          setIsPointer(true);
          return;
        }
        if (!e.card && isPointer) {
          setIsPointer(false);
          return;
        }
      }
    );
  }, [isPointer]);

  return (
    <S.Canvas
      ref={canvasRef}
      isPointer={isPointer}
    />
  )
}

