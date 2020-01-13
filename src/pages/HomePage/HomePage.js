import React, { useRef, useEffect, useState } from 'react';

import * as S from './HomePage.styles';
import SceneManager from '../../components/SceneManager/SceneManager';
import EntryList from '../../components/EntryList/EntryList';
import Profile, { PROFILE_NAME } from '../../components/Profile/Profile';

export default function HomePage({
  history,
  location,
  match,
}) {

  const canvas = useRef(null);
  let sceneManager = {};

  useEffect(() => {
    const SM = new SceneManager(canvas);

    const entryList = new EntryList();
    SM.scene.add(entryList.mesh);

    canvas.current.addEventListener('click', (e) => {
      const intersection = SM.intersections[0];

      if(!intersection) {
        return;
      }
      const { name: id } = intersection.object;
      if(id === PROFILE_NAME) {
      } else {
        entryList.selectEntry(id);
      }
    }, { passive: true });

    function draw() {
      SM.renderer.render(SM.scene, SM.camera);

      SM.raycaster.setFromCamera(SM.mouse, SM.camera);
      SM.intersections = SM.raycaster.intersectObjects(
        entryList.mesh.children
      );

      requestAnimationFrame(() => draw());
    }

    draw();
    return SM.unmount();
  }, []);

  return (
    <S.Wrapper>
      <Profile
        id={1}
        active={true}
      />
      <S.Canvas ref={canvas}></S.Canvas>
    </S.Wrapper>
  )
}
