import React, { useEffect } from "react";
import { Dispatch } from "redux";
import styled from "styled-components";
import { useAppDispatch } from "../../hooks";
import animeService from "../../services/animeService";
import { GetAnimePage } from "../../services/animeService/__generated__/GetAnimePage";
import { setAnimePage } from "./homePageSlice";
import { HotAnime } from "./hotAnime";

interface IHomePageProps {}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageName = styled.h1`
    color: white;
`;

const actionDispatch = (dispatch: Dispatch) => ({
  setAnimePage: (page: GetAnimePage["Page"]) => dispatch(setAnimePage(page)),
});

export function HomePage(props: IHomePageProps) {
  const { setAnimePage } = actionDispatch(useAppDispatch());

  const fetchAnimePage = async () => {
    const animePage = await animeService.getAnimePage(0, 102).catch((err) => {
      console.log("Error: ", err);
    });

    console.log("Anime page: ", animePage);
    if (animePage) setAnimePage(animePage);
  };

  useEffect(() => {
    fetchAnimePage();
  }, []);

  return (
    <Container>
      <PageName>Top Anime</PageName>
      <HotAnime />
    </Container>
  );
}
