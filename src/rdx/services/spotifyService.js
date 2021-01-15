import { makeRedirectUri } from "expo-auth-session";
import Base64 from "Base64";
import { CLIENT_ID_SPOTIFY, CLIENT_SECRET_SPOTIFY } from "@env";

const SPOTIFY_ENDPOINT = "https://accounts.spotify.com";
const SPOTIFY_TOKEN_ENDPOINT = `${SPOTIFY_ENDPOINT}/api/token`;
const encoded = Base64.btoa(`${CLIENT_ID_SPOTIFY}:${CLIENT_SECRET_SPOTIFY}`);

// GET requets
/**
 * React Native does not yet support [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL)
 * so searchParams must be manually appended to the url for GET requests. This function will take an
 * object and append all properties as search params to the given url
 * @param {string} url base url to which to append query parameters
 * @param {object} details javascript object containing key value pairs where
 * the key is the name of the field and the value is its value
 * @returns {string} url - string of the original url appended with search params
 */

const buildUrlWithSearchParams = (url, details) => {
  let ourUrl = `${url}?`;
  Object.entries(details).forEach(([name, value], index) => {
    if (index === 0) {
      ourUrl += `${name}=${encodeURIComponent(value)}`;
    } else {
      ourUrl += `&${name}=${encodeURIComponent(value)}`;
    }
  });
  return ourUrl;
};

const detailsToBody = (details) => {
  let formBody = [];
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  return formBody.join("&");
};

export const spotifyAccessTokenService = (spotifyAuthToken) => {
  const details = {
    grant_type: "authorization_code",
    code: spotifyAuthToken,
    redirect_uri: makeRedirectUri({
      native: "brio-mobile://redirect",
    }),
  };

  const parameters = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${encoded}`,
    },
    body: detailsToBody(details),
  };

  return fetch(SPOTIFY_TOKEN_ENDPOINT, parameters)
    .then((resp) => resp.json())
    .then((resp) => resp);
};

export const getApiContentsService = ({
  access_token,
  apiEndpoint,
  createdAt,
}) => {
  const sinceWhen = new Date(createdAt).getTime();
  const details = {
    limit: 10,
    after: sinceWhen,
  };
  const parameters = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${access_token}`,
    },
  };

  const url = buildUrlWithSearchParams(apiEndpoint, details);

  return fetch(url, parameters)
    .then((resp) => resp.json())
    .then((resp) => resp);
};

export const spotifyRefreshAccessTokenService = (spotifyState) => {
  const details = {
    grant_type: "refresh_token",
    refresh_token: spotifyState.refresh_token,
    redirect_uri: makeRedirectUri({
      native: "brio-mobile://redirect",
    }),
  };

  const parameters = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${encoded}`,
    },
    body: detailsToBody(details),
  };

  return fetch(SPOTIFY_TOKEN_ENDPOINT, parameters)
    .then((resp) => resp.json())
    .then((resp) => resp);
};
