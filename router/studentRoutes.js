const express = require('express');
const studentController = require('./../controllers/studentController');
const route = express.Router();

route.route('/register')
  .get(studentController.createStudentFrm)
  .post(studentController.createStudent);

module.exports = route;
