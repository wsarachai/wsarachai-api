'use strict';

const courseService = require("../services/courseService");

exports.getAll = (req, res) => {
  courseService.getAll().then(function (response) {
    res.status(200).json({
      status: 'success',
      data: response,
    })
  }).catch((err) => {
    res.status(404).json({
      status: 'error',
      data: err
    });
  })
};;

exports.create = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {},
  });
};