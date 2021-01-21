import * as actions from "../../../rdx/actions";

import React, { useState } from "react";

import { Button } from "react-native-paper";
import { ScrollView } from "react-native";
import SvgAvatar from "../../../svg_assets/SvgAvatar";
import SvgEyeball from "../../../svg_assets/SvgEyeball";
import bg from "../../../styles/ScreenStyle";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

export const DashboardProfile = (props) => {
  const { dispatch, username, eyeBallColor } = props;
  const [value, onChangeText] = useState("");
  const [eyeColorBtnText, setEyeColorBtnText] = useState("Change eye color");
  const [usernameBtnText, setUsernameBtnText] = useState("Change username");
  const [eyeColor, setEyeColor] = useState(eyeBallColor || "#7E6200");
  const navigation = useNavigation();
  const eyeColors = ["#51ADE0", "#5EA782", "#7E6200", "#C2BBF0", "#FF99C9"];

  const logoutButton = () => {
    const action = actions.logoutButton();
    dispatch(action);
    navigation.navigate("Login");
  };

  const changedUsername = (username) => {
    const action = actions.changedUsername(username);
    dispatch(action);
    setUsernameBtnText("SAVED!");
    savedUsernameButtonText();
  };

  const savedEyeColor = (eyeColor) => {
    const action = actions.savedEyeColor(eyeColor);
    dispatch(action);
    setEyeColorBtnText("SAVED!");
    savedEyeColorButtonText();
  };

  const savedEyeColorButtonText = () => {
    setTimeout(() => {
      setEyeColorBtnText("Change eyecolor");
    }, 1500);
  };
  const savedUsernameButtonText = () => {
    setTimeout(() => {
      setUsernameBtnText("Change username");
    }, 1500);
  };
  const deactivated = () => {
    const actionAuth = actions.deactivateAuth();
    const actionSpot = actions.deactivateSpotify();
    const actionBlockers = actions.deactivateBlockers();
    dispatch(actionAuth);
    dispatch(actionSpot);
    dispatch(actionBlockers);
    navigation.navigate("general");
  };

  const showUsername = () => {
    if (value) {
      return (
        <>
          <AvatarNameText>{value}</AvatarNameText>
        </>
      );
    } else {
      return (
        <>
          <AvatarNameText>{username}</AvatarNameText>
        </>
      );
    }
  };

  const showEyeBalls = () => {
    return eyeColors.map((color) => {
      return (
        <EyeBallWrapper onPress={() => setEyeColor(color)}>
          <SvgEyeball eyeColor={color} />
        </EyeBallWrapper>
      );
    });
  };

  return (
    <>
      <ScrollView>
        <Container style={bg.basic}>
          <AvatarContainer>
            <SvgAvatar eyeColor={eyeColor} />
            {showUsername()}
          </AvatarContainer>

          <FieldContainer>
            <FieldTextContainer>
              <FieldText>CHOOSE EYE COLOR</FieldText>
            </FieldTextContainer>
            <EyecolorView>{showEyeBalls()}</EyecolorView>
            <SaveEyeColorBtn onPress={() => savedEyeColor(eyeColor)}>
              <BtnText>{eyeColorBtnText}</BtnText>
            </SaveEyeColorBtn>
          </FieldContainer>

          <FieldContainer> 
            <FieldTextContainer>
              <FieldText>CHANGE USERNAME</FieldText>
            </FieldTextContainer>
            <UsernameInput
              onChangeText={(text) => onChangeText(text)}
              placeholder={username}
              value={value}
              autoCapitalize="none"
            />
            <SaveUsernameBtn onPress={() => changedUsername(value)}>
              <BtnText>{usernameBtnText}</BtnText>
            </SaveUsernameBtn>
          </FieldContainer>

          <FieldContainer>
            <FieldTextContainer>
              <FieldText>LOG OUT OF THE APP</FieldText>
            </FieldTextContainer>
            <LogoutBtn onPress={() => logoutButton()}>
              <BtnText>Log Out</BtnText>
            </LogoutBtn>
          </FieldContainer>

          {/* temporary reset button */}
          <Button
            mode="contained"
            color="#FFCD1A"
            labelStyle={{ color: "#fff" }}
            style={{ marginTop: 120 }}
            onPress={() => {
              deactivated();
            }}
          >
            {" "}
            DEACTIVATE{" "}
          </Button>
        </Container>
      </ScrollView>
    </>
  );
};

const Container = styled.View`
  flex: 1;
  height: 100%;
`;
const AvatarContainer = styled.View`
  margin-top: 64px;
  align-items: center;
  justify-content: center;
`;
const AvatarNameText = styled.Text`
  margin-top: 16px;
  color: #7e6200;
  font-size: 28px;
  font-weight: 900;
`;
const UsernameInput = styled.TextInput`
  width: 90%;
  height: 50px;
  padding: 10px;
  margin-top: 5px;
  border-radius: 10px;
  background-color: white;
`;
const FieldContainer = styled.View`
  margin-top: 24px;
  margin-left: 24px;
`;
const FieldTextContainer = styled.View`
  margin-top: 8px;
`;
const FieldText = styled.Text`
  color: #dea768;
  font-size: 10px;
  font-weight: 900;
`;
const EyecolorView = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 90%;
  height: 55px;
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  margin-top: 8px;
`;
const SaveUsernameBtn = styled.TouchableHighlight.attrs({
  underlayColor: "#CEAA27",
})`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 55;
  padding: 10px;
  border-radius: 10px;
  background-color: #e0c45e;
  margin-top: 8;
  text-align: center;
`;
const SaveEyeColorBtn = styled.TouchableHighlight.attrs({
  underlayColor: "#83c5be",
})`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 55;
  padding: 10px;
  border-radius: 10px;
  background-color: #94d7b5;
  margin-top: 8;
  text-align: center;
`;
const LogoutBtn = styled.TouchableHighlight.attrs({
  underlayColor: "#C36FBF",
})`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 55;
  padding: 10px;
  border-radius: 10px;
  background-color: #d8a1d5;
  margin-top: 8;
  text-align: center;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 900;
`;
const EyeBallWrapper = styled.TouchableHighlight.attrs({
  underlayColor: "white",
})``;

const mapStateToProps = (state) => {
  return {
    code: state.user.code,
    username: state.user.username,
    eyeBallColor: state.user.eyeColor,
  };
};

const DashboardProfileConnected = connect(mapStateToProps)(DashboardProfile);
export default DashboardProfileConnected;
