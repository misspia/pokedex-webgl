import React, { useRef, useEffect } from 'react';
import * as S from './HomePage.styles';
import SceneManager from '../../components/SceneManager/SceneManager';
import EntryList from '../../components/EntryList/EntryList';
import EntryListItem from '../../components/EntryListItem/EntryListItem';

export default function HomePage({
  history,
  location,
  match,
}) {
  const canvas = useRef(null); 
  let sceneManager = {};

  useEffect(() => {
    const sceneManager = new SceneManager(canvas);
    
    const entryList = new EntryList();
    sceneManager.scene.add(entryList.mesh);

    return sceneManager.unmount();
  }, [sceneManager]);

  return (
    <S.Canvas ref={canvas}></S.Canvas>
  )
}