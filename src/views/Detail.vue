<template>
  <div class="detail">
    <!-- 图片信息 -->
    <div class="img-part">
      <img :src="'/img/item/' + data.src" alt="">
      <h1>{{data.title}}</h1>
      <p>{{data.description}}</p>
    </div>
    <!-- 价格模块 -->
    <div class="price-part">
      <span class="price">
        <em>{{data.price}}</em>元
      </span>
      <span class="origin-price">门市价{{data.originPrice}}元</span>
      <span class="buy-btn">购买需知</span>
    </div>
    <!-- 销量模块 -->
    <ul class="sales-part">
      <li>支持立即退货</li>
      <li>支持随时退货</li>
      <li>销量{{data.sales}}</li>
    </ul>
    <!-- 商店模块 -->
    <div class="store-part module">
      <div class="module-header">店家信息</div>
      <div class="module-body">
        <p>{{data.storeName}}</p>
        <p>{{data.storeAddress}}</p>
      </div>
      <div class="module-footer">查看{{data.storeNum}}家分店</div>
    </div>
    <!-- 购买须知 -->
    <div class="buy-part module">
      <div class="module-header">购买须知</div>
      <div class="module-body">
        <h3>有效日期</h3>
        <p>{{data.validateTime}}</p>
        <h3>使用日期</h3>
        <p>{{data.useTime}}</p>
        <h3>使用规则</h3>
        <p v-for="(item, index) in data.rules" :key="index">{{item}}</p>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '../assets/common.less';
.img-part{
    position: relative;
    img{
      width: 100%;
    }
    h1, p{
      position: absolute;
      left: 20px;
      bottom: 15px;
      color: #fff;
    }
    h1{
      bottom: 44px;
      font-size: 26px;
    }
    p{
      font-size: 16px;
    }
  }
.price-part{
  padding: 10px 10px;
  font-size: 18px;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
  color: #666;
  .price{
    color: @navColor;
    em{
      font-style: normal;
      font-size: 32px;
    }
  }
  .buy-btn{
    color: #fff;
    background: #f60;
    float: right;
    padding: 4px 10px;
    font-size: 16px;
    line-height: 30px;
  }
}
.sales-part{
  background: #fff;
  padding: 5px 10px;
  .clearfix;
  li{
    float: left;
    width: 50%;
    list-style: none;
    font-size: 20px;
    line-height: 30px;
    color: yellowgreen;
    &:last-child{
      color: #333;
    }
  }
}
.module{
  background: #fff;
  margin-top: 10px;
  padding: 10px 10px;
  .module-header{
    font-size: 24px;
    color: #333;
    padding: 5px 0 10px;
    border-bottom: 1px solid #ccc;
  }
  .module-body{
    font-size: 16px;
    line-height: 26px;
    h3{
      color: #f60;
    }
  }
  .module-footer{
    color: skyblue;
    font-size: 18px;
    padding: 10px 0;
    border-top: 1px solid #ccc;
  }
}
</style>

<script>
export default {
  // 绑定数据
  data () {
    return {
      // 避免数据丢失
      data: {}
    }
  },
  // 创建完成请求数据
  created () {
    // 更新数据
    this.updateData()
  },
  methods: {
    // 请求数据
    updateData () {
      // 获取路由参数
      const { params } = this.$route
      // 请求数据
      this.$http.get('/data/product.json', {
        params: params
      }).then(data => {
        // console.log(data)
        this.data = data.data
        // console.log(data)
      })
    }
  },
  // 监听路由的变化
  watch: {
    // 路由数据的变化
    $route () {
      // console.log(111, arguments)
      this.updateData()
    }
  }
}
</script>
