// REACT, REACT NATIVE //
import React, { useState, useEffect } from "react";
import { Text, View, Image, ScrollView, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
// STYLES //
import text from "../../styles/TextStyle.js";
import bg from "../../styles/ScreenStyle.js";
import brio from "../../../assets/Brio_Star.png";
// EXPO AUTH
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { SPOTIFY_CLIENT_ID } from '@env';

WebBrowser.maybeCompleteAuthSession();
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const LoginPage = () => {
  const navigation = useNavigation();
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: SPOTIFY_CLIENT_ID,
      scopes: ['user-read-email', 'playlist-modify-public'],
      usePKCE: false,
      redirectUri: makeRedirectUri({
        native: 'brio-mobile://redirect',
      }),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      navigation.navigate("CategoryNavigation");
      }
  }, [response]);

  return (
    <>
        <View style={bg.brick}>
          <Text style={text.header}>Hello, friend...</Text>
            <Image source={brio} />
          <Text style={text.text}>Brio uses Spotify's built-in credentials to access the app. You will need to make an account before proceeding.</Text>
          <Button
            disabled={!request}
            title="Login"
            onPress={() => {
              promptAsync();
              }}
          />
        </View>
    </>
  );
};
export default LoginPage;
