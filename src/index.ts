import { BASE_URL, API_URL, DEV_BASE_URL, DEV_API_URL } from "./constants";
import { Config, RequestOptions, Error } from "./types";
import { getAuthorizationCodeLink, authorizeWithCode, getDeviceVerificationLink, waitForDeviceVerification, request } from "./methods";
import { getTokens } from "./utils";

export default class AllegroClient {
  config: Config
  constructor(config: Config) {
    if (!config) throw new Error("Config is missing");
    this.config = config;
    if (!config.env) this.config.env = "prod";
    this.config.baseUrl = BASE_URL;
    this.config.apiUrl = API_URL;
    if (config.env === "dev") {
      this.config.baseUrl = DEV_BASE_URL;
      this.config.apiUrl = DEV_API_URL;
    }
    if (!config.account) this.config.account = "default";
    this.config.oAuth = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString("base64");
    if (!config.tokens) this.config.tokens = getTokens(this.config.account!) || null;
  }

  public getAuthorizationCodeLink = getAuthorizationCodeLink.bind(this)
  public authorizeWithCode = authorizeWithCode.bind(this)
  public getDeviceVerificationLink = getDeviceVerificationLink.bind(this)
  public waitForDeviceVerification = waitForDeviceVerification.bind(this)
  public request = request.bind(this)
}

export { Config, RequestOptions, Error };
