import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import SvgBrioRegister from "../../svg_assets/SvgBrioRegister";
import bg from "../../styles/ScreenStyle.js";
import styled from "styled-components/native";

export const RegisterPage = () => {
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
          onChangeText={() => console.log("Email")}
          value={""}
          autoCapitalize="none"
        />
        <InputField
          onChangeText={() => console.log("Password")}
          value={""}
          autoCapitalize="none"
        />
        <InputField
          onChangeText={() => console.log("Confirm Password")}
          value={""}
          autoCapitalize="none"
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

export default RegisterPage;
