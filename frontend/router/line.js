const express = require('express');
const lineController = require('../controllers/lineController');

const route = express.Router();

route.route('/').get(lineController.info);

module.exports = route;
