const express = require('express');
const { viewItemsPage } = require('../controller/item.controller');

const route = express.Router();

route.get('/', viewItemsPage);

module.exports = route;