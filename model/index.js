/**
 * 数据库模型
 * */
const mongoose = require('mongoose');
const user = require('./user');

mongoose.model('user', new mongoose.Schema(user));

module.exports = mongoose.model('user')