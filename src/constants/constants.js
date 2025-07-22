import loadConfig from "../services/config.service";

const config = await loadConfig();

// export const authConfigs = {
//   authority: `${config.AUTHORITY}`,
//   client_id: `${config.CLIENT_ID}`,
//   redirect_uri: `${config.REDIRECT_URI}`,
//   scope: `${config.SCOPES}`,
//   popup_post_logout_redirect_uri: `${config.POST_LOGOUT_REDIRECT_URI}`,
//   response_type: `${config.RESPONSE_TYPE}`,
// };

const Constants = {
  API_BASEURL: `${config.API_CONFIGS_URL}`,
};
export default Constants;