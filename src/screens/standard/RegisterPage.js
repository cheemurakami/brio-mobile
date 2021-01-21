import * as WebBrowser from "expo-web-browser";
import * as actions from "../../rdx/actions";

import React, { useEffect, useState } from "react";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";

import { CLIENT_ID_SPOTIFY } from "@env";
import Icon from "react-native-vector-icons/FontAwesome";
import SvgBrioRegister from "../../svg_assets/SvgBrioRegister";
import bg from "../../styles/ScreenStyle.js";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const RegisterPage = (props) => {
  const { dispatch } = props;
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setConfirmPassword] = useState("");
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
      const action = actions.loggedIn(code);
      dispatch(action);
      navigation.navigate("StandardNavigation");
    }
  }, [response]);

  return (
    <Container style={bg.basic}>
      <BrioContainer>
        <SvgBrioRegister />
      </BrioContainer>
      <FieldContainer>
        <FieldTextContainer>
          <FieldText>LOGIN WITH YOUR SPOTIFY ACCOUNT</FieldText>
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
        <FieldTextContainer>
          <FieldText>OR SIGNUP WITH YOUR EMAIL</FieldText>
        </FieldTextContainer>
        <InputField
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
          placeholder="Email address"
        />
        <InputField
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"
          placeholder="Create password"
        />
        <InputField
          onChangeText={(text) => setConfirmPassword(text)}
          value={comfirmPassword}
          autoCapitalize="none"
          placeholder="Confirm password"
        />

        <CreateBtn onPress={() => console.log("CreateBtn")}>
          <BtnText>Create</BtnText>
        </CreateBtn>
      </FieldContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  height: 100%;
`;
const BrioContainer = styled.View`
  margin-top: 20%;
  align-items: center;
  justify-content: center;
`;
const FieldContainer = styled.View`
  margin-left: 24px;
`;
const FieldTextContainer = styled.View`
  margin-top: 5%;
  margin-bottom: 5%;
`;
const FieldText = styled.Text`
  color: #dea768;
  font-size: 10px;
  font-weight: 900;
`;
const TextWrapper = styled.View`
  flex-direction: row;
`;
const LoginBtnText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 900;
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
  border-radius: 10px;
  background-color: #1ed760;
`;

const InputField = styled.TextInput`
  width: 90%;
  height: 50px;
  padding: 10px;
  margin-bottom: 5%;
  border-radius: 10px;
  background-color: white;
`;
const CreateBtn = styled.TouchableHighlight.attrs({
  underlayColor: "#C36FBF",
})`
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 55px;
  padding: 10px;
  border-radius: 10px;
  background-color: #d8a1d5;
  margin-top: 8px;
  text-align: center;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 900;
`;

const RegisterPageConnected = connect()(RegisterPage);
export default RegisterPageConnected;
