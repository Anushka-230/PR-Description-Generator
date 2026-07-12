import axios from "axios";
import api from "./api";

export const getGithubAccessToken = async (code) => {

    const response = await axios.post(
        "https://github.com/login/oauth/access_token",
        {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
        },
        {
            headers: {
                Accept: "application/json",
            },
        }
    );

    return response.data;
};

export const getGithubUser = async (accessToken) => {
  const response = await axios.get(
    "https://api.github.com/user",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};

export const fetchRepositories = async (accessToken) => {
  const response = await axios.get(
    "https://api.github.com/user/repos",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};

import api from "./api";

export const getRepositories = async (userId) => {
  const response = await api.get(`/github/repos?userId=${userId}`);
  return response.data;
};