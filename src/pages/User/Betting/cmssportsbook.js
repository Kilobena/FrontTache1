import { SPORTSBOOK_CLIENT_KEY } from "../../../helpers/constants";

export const cmsSportbook = ({
  user = "guest",
  lang = "en-en",
  platform = "desktop",
  pathname = "sport",
  clientKey = SPORTSBOOK_CLIENT_KEY,
} = {
  userToken: user,
  culture: lang,
  platform: platform,
  baseUrl: process.env.SPORTBOOK_BASE_URL,
  iframeUrl: "",
  defaultPage: defaultPage,
  integration: "",
  setUserToken: function (token) {
    this.userToken = token;
  },
  setCulture: function (culture) {
    this.culture = culture;
  },
  setPlatform: function (platform) {
    this.platform = platform;
  },
  setDefaultPage: function (defaultPage) {
    this.defaultPage = defaultPage;
  },
  setIntegration: function (integration) {
    this.integration = integration;
  },
  composeUrl: function () {
    var url = `${this.baseUrl}?language=${this.culture}&token=${this.userToken}&integration=${this.integration}&platform=${this.platform}&defaultpage=${this.defaultPage}`;
    this.iframeUrl = url;
  },
  checkIframe: function () {
    var elementExists = !!document.getElementById("ifrContent");
    return elementExists;
  },
  createIframe: function () {
    var iframe = document.createElement("iframe");
    iframe.setAttribute("src", this.iframeUrl);
    iframe.setAttribute("id", "ifrContent");
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "100%");
    iframe.setAttribute("frameborder", "0");

    iframe.style.width = "100vw";
    iframe.style.height = "100vh";
    iframe.style.overflow = "hidden";
    iframe.style.overflowX = "hidden";
    iframe.style.overflowY = "hidden";
    iframe.style.display = "block";
    iframe.style.border = "none";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    var element = document.getElementById("appcontent");

    element.appendChild(iframe);
  },
  startSportbook: function (platform, token, culture, integration, defaultPage) {
    this.setIntegration(integration);
    this.setCulture(culture);
    this.setUserToken(token);
    this.setPlatform(platform);
    console.log(defaultPage);
    if (defaultPage != "" && defaultPage != undefined) this.setDefaultPage(defaultPage);
    this.composeUrl();
    var element = document.getElementById("ifrContent");
    if (!!element) {
      var element = document.getElementById("ifrContent");
      element.setAttribute("src", this.iframeUrl);
    } else {
      this.createIframe();
    }
  },
});
