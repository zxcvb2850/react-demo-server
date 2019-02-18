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
    console.log('---data---', data)
    const datetime = new Date().getTime()
    // 简单的做个cookie
    ctx.cookies.set('userid', data._id, {
      expires: new Date(datetime + 60 * 60 * 24 * 1000),
      httpOnly: "true"
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
  const data = await User.findOne({ user })
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
  if (!userid) {
    ctx.body = { code: 2, msg: '没有登录或登录已过期' }
  } else {
    const result = await User.findOne({ _id: userid }, _filter)
    console.log(result)
    if (result) {
      ctx.body = { code: 0, msg: '获取成功', data: result }
    } else {
      ctx.body = { code: 1, msg: '获取失败' }
    }
  }
})

/**
 * 验证cookie是否存在
 */
async function verificatCookie(ctx) {
  const userid = await ctx.cookies.get('userid')
  if (userid) {
    const result = await User.findOne({ _id: userid })
    return !!result
  } else {
    return false
  }
}

// 更新信息
router.post('/update', async (ctx) => {
  if (verificatCookie) {
    const userid = await ctx.cookies.get('userid')
    const body = ctx.request.body
    console.log('*******', body)
    const result = await User.findOneAndUpdate(userid, body)
    if (result) {
      ctx.body = { code: 0, msg: '成功', data: result }
    } else {
      ctx.body = { code: 1, msg: '提交失败' }
    }
  } else {
    ctx.body = {
      code: 2,
      msg: '登录信息已过期'
    }
  }
})

module.exports = router
