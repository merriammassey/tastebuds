import { googleOauthUrl } from "../utils/googleOauthUrl";

export const googleOauthUrlRoute = {
  path: "/auth/google/url",
  host: "localhost",
  port: "3000",
  method: "get",
  handler: (req, res) => {
    const url = googleOauthUrl();
    res.status(200).json({ url });
  },
};
