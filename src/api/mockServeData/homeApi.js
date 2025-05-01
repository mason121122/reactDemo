// 使用MockJS创建模拟数据
import Mock from 'mockjs'

// 随机生成一个商品列表
export const getHomeList = () => {
  let List = []
  // 生成20条商品数据
  for (let i = 0; i < 20; i++) {
    List.push(
      Mock.mock({
        id: '@id', // 生成唯一ID作为key
        commodityName: '@ctitle(4, 10)', // 生成中文商品名称，长度在4-10之间
        TodaySales: '@integer(50, 200)', // 今日销量，在50-200之间的随机整数
        monthSales: '@integer(500, 3000)', // 本月销量，在500-3000之间的随机整数
        tags: function() {
          // 库存预警标签
            return this.TodaySales < 100 ? ['充足'] :
              this.TodaySales >= 100 && this.TodaySales < 150 ? ['正常'] : ['紧张'];
        },
      })
    )
  }
  return List
}

// 模拟获取商品列表API
Mock.mock('/api/products', 'get', () => {
  return {
    status: 200,
    message: 'success',
    data: getHomeList()
  }
})

// 导出其他可能需要的模拟API
export default Mock
