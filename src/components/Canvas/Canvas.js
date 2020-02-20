import React, { useEffect, useContext, useRef } from 'react';
import WebglContext from '../../webgl/WebglContext';
import WebglEvents from '../../constants/webglEvents';
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

    context.webgl.addEventListener(
      WebglEvents.ACTIVATE_ENTRY,
      (e) => {
        selectEntry(e.id);
      }
    )

    context.webgl.addEventListener(
      WebglEvents.CARD_HOVER,
      (e) => {
        // console.debug('[mousemove listener]', e);
      }
    )
  }, []);

  return (
    <S.Canvas ref={canvasRef} />
  )
}

