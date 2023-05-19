const themesettings = require("./_keenthemes/lib/themesettings.json");
const dashboardRouter = require("./router/dashboard");
const authRouter = require("./router/auth");
const systemRouter = require("./router/system");
const createKtThemeInstance = require("./_keenthemes/lib/theme");
const createKtBootstrapInstance = require(`./views/layout/${themesettings.name}/bootstrap`);
const express = require('express');
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require('body-parser');
const userRoute = require('./router/userRoutes');
const lineRoute = require('./router/line');
const webHookRoute241 = require('./router/webhookRoutes241');
const webHookRoute493 = require('./router/webhookRoutes493');
const {
  middleware,
  JSONParseError, 
  SignatureValidationFailed, 
  HTTPError, 
  ReadError, 
  RequestError,

  // webhook event objects
  WebhookEvent,
  MessageEvent,
  EventSource,
  VideoEventMessage,

  // message event objects
  Message,
  TemplateMessage,
  TemplateContent,
} = require('@line/bot-sdk');

global.themesettings = themesettings;

const config241 = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN241,
  channelSecret: process.env.LINE_CHANNEL_SECRET241
};

const config493 = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN493,
  channelSecret: process.env.LINE_CHANNEL_SECRET493
};

const app = express();

app.use('/api/v1/webhook/line', lineRoute);
app.use('/api/v1/webhook/it241', middleware(config241), webHookRoute241);
app.use('/api/v1/webhook/it493', middleware(config493), webHookRoute493);
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/", express.static("public"));

// Set Templating Engine
app.use(expressLayouts);
app.set("layout", "layout/master");
app.set("view engine", "ejs");

const init = function (req, res, next) {
  global.theme = createKtThemeInstance();
  global.bootstrap = createKtBootstrapInstance();
  next();
};

app.use(init);
app.use('/', dashboardRouter);
app.use("/auth", authRouter);
app.use("/system", systemRouter);
app.use('/api/v1/users', userRoute);

app.all("*", (req, res) => {
  res
    .status(404)
    .render(theme.getPageViewPath("system", "not-found"), {
      currentLayout: theme.getLayoutPath("system"),
    });
});

app.use((err, req, res, next) => {
  if (err instanceof SignatureValidationFailed) {
    res.status(401).send(err.signature)
    return
  } else if (err instanceof JSONParseError) {
    res.status(400).send(err.raw)
    return
  }
  next(err) // will throw default 500
})

module.exports = app;