const express = require('express');
const { dashboardPage } = require('../controller/blog.controller');

const route = express.Router();

route.get('/', dashboardPage)

module.exports = route;