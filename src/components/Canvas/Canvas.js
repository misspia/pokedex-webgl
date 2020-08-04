import React, { useEffect, useContext, useRef, useState } from 'react';
import { AppContext } from '../../contexts';
import { WebglEvents } from '../../constants/events';
import * as S from './Canvas.styles';

export default function Canvas({
  entries = [],
  selectEntry = () => { },
}) {
  const context = useContext(AppContext);
  const canvasRef = useRef(null);
  const guiRef = useRef(null);

  useEffect(() => {
    context.webgl.init(canvasRef.current);
    context.webgl.load(entries);
    // context.webgl.createGUI(guiRef.current);
    context.webgl.draw();

    context.webgl.addEventListener(
      WebglEvents.ACTIVATE_ENTRY,
      (e) => {
        selectEntry(e.id);
      }
    )
  }, []);

  return (
    <>
      <S.Gui ref={guiRef}></S.Gui>
      <S.Canvas
        ref={canvasRef}
      />
    </>
  )
}

