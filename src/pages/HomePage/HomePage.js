import React, { useRef, useEffect } from 'react';
import * as S from './HomePage.styles';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import SceneManager from '../../components/SceneManager/SceneManager';


const PK_TEST_QUERY = gql`
  {
    hello
  }
`;

export default function HomePage({
  history,
  location,
  match,
}) {
  const canvas = useRef(null); 
  let sceneManager = {};

  useEffect(() => {
    sceneManager = new SceneManager(canvas);
  })
  useEffect(() => {
    window.addEventListener('resize', () => sceneManager.resize());

    return window.removeEventListener('resize', () => sceneManager.resize());
  });

  return (
    <S.Canvas ref={canvas}></S.Canvas>
  )
}