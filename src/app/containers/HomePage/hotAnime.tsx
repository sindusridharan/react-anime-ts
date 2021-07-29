import React from "react";
import { createSelector } from "reselect";
import styled from "styled-components";
import { useAppSelector } from "../../hooks";
import { makeSelectAnimePage } from "./selectors";
import "./flipcard.css";

const HotAnimeContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const AnimeItemContainer = styled.div`
  width: 17em;
  height: 18em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AnimeCover = styled.div`
  
  border-radius: 5px;
  img {
    width: auto;
    height: 100%;
    box-shadow: 0 4px 30px 0px lightblue;
  }
  img:hover {
    cursor: pointer;
  }
`;

const AnimeTitle = styled.h6`
  margin-top: 10px;
  font-size: 15px;
  color: #000;
  font-weight: 500;
  color: white;
`;




const stateSelector = createSelector(makeSelectAnimePage, (animePage) => ({
  animePage,
}));

export function HotAnime() {
  const { animePage } = useAppSelector(stateSelector);

  const isEmptyAnimePage =
    !animePage || !animePage.media || animePage.media.length === 0;

  if (isEmptyAnimePage) return <div>Loading...</div>;

  return (
    <HotAnimeContainer>
      {animePage &&
        animePage.media &&
        animePage.media.map((anime) => (
          <AnimeItemContainer>
            {/* <AnimeCover>
              <img src={anime?.coverImage?.extraLarge || ""} />
            </AnimeCover> */}
            <AnimeCover>
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                <img src={anime?.coverImage?.extraLarge || ""} />
                </div>
                <div className="flip-card-back">
                {anime?.averageScore}%
                </div>
              </div>
            </div>
            </AnimeCover>
            <AnimeTitle>{anime?.title?.english} </AnimeTitle>
          </AnimeItemContainer>
        ))}
    </HotAnimeContainer>
  );
}
