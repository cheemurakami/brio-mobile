import * as WebBrowser from "expo-web-browser";
import * as actions from "../../rdx/actions";

import React, { useEffect, useState } from "react";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";

import { CLIENT_ID_SPOTIFY } from "@env";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native";
import SvgBrioLogin from "../../svg_assets/SvgBrioLogin";
import SvgEyeball from "../../svg_assets/SvgEyeball";
import bg from "../../styles/ScreenStyle.js";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const LoginPage = (props) => {
  const { dispatch, existingUsername, eyeBallColor } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [eyeColor, setEyeColor] = useState("#7E6200");
  const navigation = useNavigation();

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID_SPOTIFY,
      scopes: [
        "user-read-email",
        "playlist-modify-public",
        "user-read-recently-played",
      ],
      usePKCE: false,
      redirectUri: makeRedirectUri({
        native: "brio-mobile://redirect",
      }),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      const action = actions.loggedIn(code, username, eyeColor);
      dispatch(action);
      navigation.navigate("StandardNavigation");
    }
  }, [response]);

  useEffect(() => {
    setEyeColor(eyeBallColor || eyeColor);
    return () => {};
  }, [eyeBallColor]);

  useEffect(() => {
    setUsername(existingUsername);
    return () => {};
  }, [existingUsername]);

  return (
    <>
      <Container style={bg.basic}>
        <ScrollView>
          <AvatarContainer>
            <SvgBrioLogin eyeColor={eyeColor} />
            <AvatarNameText>{username}</AvatarNameText>
          </AvatarContainer>
        
          <FieldContainer>
            <FieldTextContainer>
              <FieldText>LOGIN WITH YOUR SPOTIFY</FieldText>
            </FieldTextContainer>
            <SpotifyLoginBtn onPress={() => promptAsync()}>
              <TextWrapper>
                <Icon
                  name="spotify"
                  size={22}
                  color="#fff"
                  style={{ marginRight: 20 }}
                />
                <LoginBtnText>LOGIN</LoginBtnText>
              </TextWrapper>
            </SpotifyLoginBtn>
          </FieldContainer>
          
          <FieldContainer>
            <FieldTextContainer>
              <FieldText>LOGIN WITH YOUR EMAIL OR USERNAME</FieldText>
            </FieldTextContainer>
            <Input
              onChangeText={(text) => setUsername(text)}
              value={username}
              autoCapitalize="none"
              placeholder="Email or username"
            />
            <Input
              onChangeText={(text) => setPassword(text)}
              value={password}
              autoCapitalize="none"
              placeholder="Password"
            />
            <LoginBtn onPress={() => promptAsync()}>
              <TextWrapper>
                <LoginBtnText>LOGIN</LoginBtnText>
              </TextWrapper>
            </LoginBtn>
          </FieldContainer>
        </ScrollView>
      </Container>
    </>
  );
};

const Container = styled.View`
  flex: 1;
  height: 100%;
`;
const AvatarContainer = styled.View`
  margin-top: 52;
  align-items: center;
  justify-content: center;
`;
const AvatarNameText = styled.Text`
  margin-top: 16;
  color: #7e6200;
  font-size: 28px;
  font-weight: 900;
`;
const Input = styled.TextInput`
  width: 90%;
  height: 50;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10;
  background-color: white;
`;
const FieldContainer = styled.View`
  margin-top: 24;
  margin-left: 24;
`;
const FieldTextContainer = styled.View`
  margin-bottom: 8px;
`;
const FieldText = styled.Text`
  color: #dea768;
  font-size: 10px;
  font-weight: 900;
`;
const TextWrapper = styled.View`
  flex-direction: row;
`;
const SpotifyLoginBtn = styled.TouchableHighlight.attrs({
  underlayColor: "#1db954",
})`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 55px;
  padding: 10px;
  border-radius: 10;
  background-color: #1ed760;
  margin-top: 8;
`;
const LoginBtn = styled.TouchableHighlight.attrs({
  underlayColor: "#02c39a",
})`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 55px;
  padding: 10px;
  border-radius: 10;
  background-color: #94d7b5;
  margin-top: 8;
`;
const LoginBtnText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 900;
`;
const mapStateToProps = (state) => {
  return {
    existingUsername: state.user.username,
    eyeBallColor: state.user.eyeColor,
  };
};

const LoginPageConnected = connect(mapStateToProps)(LoginPage);
export default LoginPageConnected;
