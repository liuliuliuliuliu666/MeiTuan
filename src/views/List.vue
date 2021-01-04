<template>
  <div class="list">
    <!-- 排序模块 -->
    <ul class="order">
      <li v-for="(item, index) in orders" :key="index" @click="listOrder(item.id)">
        <span>{{item.text}}</span>
        <span class="arrow"></span>
      </li>
    </ul>
    <!-- 商品列表 -->
    <Product v-for="(item, index) in dealList" :key="index" :data="item"></Product>
    <!-- 加载更多 -->
    <div class="loader-more" @click="showOthers" v-show="others.length">
      <span>查看其他{{others.length}}条团购</span>
      <span class="arrow">
        <span class="arrow white"></span>
      </span>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '../assets/common.less';
.order{
  background: #fff;
  display: flex;
  padding: 0 10px;
  li{
    flex: 1;
    list-style: none;
    border-right: 1px solid #ccc;
    &:last-child{
      border-right: none;
    }
    color: #000;
    text-align: center;
    font-size: 12px;
    .arrow{
      .arrowf(4px,#000,top);
      border-top-color: #000;
      position: relative;
      top: -2px;
      right: -4px;
    }
  }
}
.loader-more{
  background: #fff;
  border-bottom: 1px solid #ccc;
  font-size: 20px;
  color: @navColor;
  text-align: center;
  line-height: 40px;
  .arrow{
    .arrowf(8px,@navColor,top);
    border-top-color: @navColor;
    position: relative;
    top: -2px;
    left: 6px;
    .white{
      border-top-color: #fff;
      position: absolute;
      top: -10px;
      left: -8px;
    }
  }
}
</style>
<script>
// 引入组件
import Product from '../components/Product'
export default {
  components: {
    Product
  },
  // 数据
  data () {
    return {
      // 排序数据
      orders: [
        { text: '价格排序', id: 'price' },
        { text: '销量排序', id: 'sales' },
        { text: '好评排序', id: 'evaluate' },
        { text: '优惠排序', id: 'discount' }
      ],
      // 初始化
      list: [],
      // 存储未显示的
      others: []
    }
  },
  // 创建完成
  created () {
    // console.log(this)
    // 发送请求
    this.$http
      .get('/data/list.json?id=' + this.$route.params.id)
      .then(({ data }) => {
        // console.log(data)
        // 存储显示的数据
        this.list = data.slice(0, 3)
        // 存储未显示的数据
        this.others = data.slice(3)
      })
  },
  methods: {
    showOthers () {
      // 展示剩余商品
      // 将others中的放入list
      this.list = this.list.concat(this.others)
      // 清空
      this.others = []
    },
    // 排序
    listOrder (id) {
      // console.log(id)
      // 如果是优惠排序
      if (id === 'discount') {
        this.list.sort((a, b) => {
          return (a.originPrice - a.price) - (b.originPrice - b.price)
        })
        return
      }
      // 视图的排序就是数据的排序就是数组的排序
      this.list.sort((a, b) => {
        return a[id] - b[id]
      })
    }
  },
  // 计算属性
  computed: {
    // 用store中的搜索词来处理
    dealList () {
      // 返回值是结果
      // 数组过滤用filter
      // 过滤的是title，判断title是否包含search搜索词
      return this.list.filter(item => item.title.toUpperCase().indexOf(this.$store.state.search.toUpperCase()) >= 0)
    }
  }
}
</script>
