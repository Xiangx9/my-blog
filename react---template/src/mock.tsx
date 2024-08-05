// mock数据文件
import Mock from 'mockjs'

const Random = Mock.Random
const userInfo = Mock.mock('/user/login', 'post', () => {
  const ret = Mock.mock({ username: '@cname', age: Random.integer(18, 30), Token: Random.string(1,100) })
  return {
    status: 200,
    message:'成功',
    data: ret
  }
})

export { userInfo }
