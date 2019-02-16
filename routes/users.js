const router = require('koa-router')()
const utility = require('utility')
const User = require('../model/index')

router.prefix('/users')

const _filter = { pwd: 0, __v: 0 }

router.post('/login', async (ctx) => {
  //ctx.body = { code: 0, msg: '获取成功' }
  const { user, pwd } = ctx.request.body
  const data = await User.findOne({ user, pwd: utility.md5(pwd) }, _filter)
  if (data) {
    ctx.cookies.set('userid', data._id, {
      expires: new Date('2019-2-17')
    })
    ctx.body = { code: 0, msg: '登陆成功', data }
  } else {
    ctx.body = { code: 1, msg: '用户名不存在或密码错误' }
  }
  // ctx.body = { code: 0 }
})

router.post('/register', async (ctx) => {
  //ctx.body = { code: 0, msg: '获取成功' }
  const { user, pwd, type } = ctx.request.body
  console.log(ctx.request.body)
  const data = await User.findOne({ user })
  console.log(data)
  if (data) {
    ctx.body = { code: 1, msg: '用户名已存在' }
  } else {
    const result = await User.create({ user, pwd: utility.md5(pwd), type })
    if (result) {
      ctx.body = { code: 0, msg: '创建成功' }
    }
  }
  // ctx.body = { code: 0 }
})

router.get('/info', async (ctx, next) => {
  const userid = await ctx.cookies.get('userid')
  console.log('-------', userid)
  if (!userid) {
    ctx.body = { code: 2, msg: '没有登录或登录已过期' }
  } else {
    const result = await User.findOne({ _id: userid }, _filter)
    if (result) {
      ctx.body = { code: 0, msg: '获取成功', data: result }
    }
  }
})

module.exports = router
