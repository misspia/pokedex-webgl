import React, { useEffect, useContext, useRef, useState } from 'react';
import { AppContext } from '../../contexts';
import { WebglEvents } from '../../constants/events';
import Stages from '../../constants/stages';
import * as S from './Canvas.styles';

export default function Canvas({
  entries = [],
  selectEntry = () => { },
}) {
  const context = useContext(AppContext);
  const canvasRef = useRef(null);
  const guiRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);

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

  useEffect(() => {
    context.webgl.setStage(Stages.MAIN);
    // if (context.stage === Stages.ENTRANCE) {
    //   context.webgl.playEntrance();
    // }

    // if (context.stage === Stages.INTRO) {
    //   context.webgl.playIntro();
    // }

    // if (context.stage === Stages.MAIN) {
    //   context.webgl.playMain();
    // }
  }, [context.stage]);

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
    <>
      <S.Gui ref={guiRef}></S.Gui>
      <S.Canvas
        ref={canvasRef}
        isPointer={isPointer}
      />
    </>
  )
}

