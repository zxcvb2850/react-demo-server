/**
 * 数据库模型
 *
 * 用户信息
 * */

const user = {
  'user': {'type': String, require: true},
  'pwd': {'type': String, require: true},
  'type': {'type': String, require: true},
  'avatar': {'type': String},
  // 个人简介或职业简介
  'desc': {'type': String},
  // 职位名称
  'title': {'type': String},
  // 如果你是BOSS，还有两个字段
  'company': {'type': String},
  'money': {'type': String}
}

module.exports = user;