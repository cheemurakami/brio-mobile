import React from "react";
import { connect } from "react-redux";
import styled from "styled-components/native";

export const ModalContents = (props) => {
  const { contents, apiContents, username } = props;

  const showContents = () => {
    if (apiContents === "recently-played") {
      const contentsTop10 = contents.slice(0, 10);
      const showDetails = () => {
        return contentsTop10.map((content, index) => {
          return (
            <ContentsTextWrapper key={index}>
              <ContentsText>
                {index + 1}. {content.track.name} by{" "}
                {content.track.artists[0].name}
              </ContentsText>
            </ContentsTextWrapper>
          );
        });
      };
      return (
        <ContentsContainer>
          <ContentsHeaderWrapper>
            <ContentsHeader>{`${username}'s Last 10 songs:`}</ContentsHeader>
          </ContentsHeaderWrapper>
          {showDetails()}
        </ContentsContainer>
      );
    } else {
      return (
        <ContentsContainer>
          <ContentsHeaderWrapper>
            <ContentsHeader>Other api call:</ContentsHeader>
          </ContentsHeaderWrapper>
          <ContentsTextWrapper>
            <ContentsText>Other api contents</ContentsText>
          </ContentsTextWrapper>
        </ContentsContainer>
      );
    }
  };
  return <>{showContents()}</>;
};
const ContentsContainer = styled.View`
  margin-top: 36;
  margin-bottom: 36;
  justify-content: center;
  background-color: #212529;
  border-width: 5;
`;
const ContentsHeaderWrapper = styled.View`
  margin: 12px;
`;
const ContentsTextWrapper = styled.View`
  margin-bottom: 8px;
`;
const ContentsHeader = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: 900;
  text-align: center;
`;
const ContentsText = styled.Text`
  color: #fff;
  font-size: 18px;
`;
const mapStateToProps = (state) => {
  return {
    apiEndpoint: state.spotifyApi.apiEndpoint,
    contents: state.spotifyApi.contents,
    username: state.user.username,
  };
};
export default connect(mapStateToProps)(ModalContents);
