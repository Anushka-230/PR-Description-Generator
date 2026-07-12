import { getGithubAccessToken ,getGithubUser ,fetchRepositories} from "../services/githubService.js";
import User from "../models/User.js";

export const githubLogin = (req, res) => {
  const { userId } = req.query;
  console.log("GitHub login route hit");

  const clientId = process.env.GITHUB_CLIENT_ID;

  const redirectUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${clientId}` +
    `&state=${userId}`;

  res.redirect(redirectUrl);
};

export const githubCallback = async (req, res) => {
try {
    console.log("Callback hit");
    const { code, state } = req.query;

    console.log("Code:", code);
    console.log("State:", state);

    const tokenData = await getGithubAccessToken(code);

    const githubUser = await getGithubUser(tokenData.access_token);

    console.log(githubUser);
    await User.findByIdAndUpdate(state, {
      githubId: githubUser.id,
      githubAccessToken: tokenData.access_token,
    });

    res.redirect("http://localhost:5173/dashboard");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export const getRepositories = async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await User.findById(userId);

    if (!user || !user.githubAccessToken) {
      return res.status(400).json({
        success: false,
        message: "GitHub not connected",
      });
    }

    const repos = await fetchRepositories(
      user.githubAccessToken
    );

    res.json(repos);

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};