const themesettings = require("./_keenthemes/lib/themesettings.json");
const dashboardRouter = require("./router/dashboard");
const authRouter = require("./router/auth");
const systemRouter = require("./router/system");
const createKtThemeInstance = require("./_keenthemes/lib/theme");
const createKtBootstrapInstance = require(`./views/layout/${themesettings.name}/bootstrap`);
const express = require('express');
const expressLayouts = require("express-ejs-layouts");
const userRoute = require('./router/userRoutes');
const webHookRoute = require('./router/webhookRoutes');

const app = express();

global.themesettings = themesettings;

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
app.use('/api/v1/webhook', webHookRoute);

app.all("*", (req, res) => {
  res
    .status(404)
    .render(theme.getPageViewPath("system", "not-found"), {
      currentLayout: theme.getLayoutPath("system"),
    });
});

module.exports = app;