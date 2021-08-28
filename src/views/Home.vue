<template>
  <div>
      <div class="header">
      <div class="go-back" @click="$router.go(-1)">
        <span class="arrow">
          <span class="arrow green"></span>
        </span>
      </div>
      <div class="title">仿美团移动界面</div>
      <div class="login" @click="logout">退出</div>
      </div>
    <div class="search" v-show="!$route.fullPath.includes('/detail/')">
      <input type="text" v-model="msg" @keyup="filterMsg" placeholder="请输入搜索关键词" />
    </div>
    <!-- <h1>home page--{{$store.state.search}}</h1> -->
    <!-- 分类模块 -->
    <ul class="home-types">
      <router-link
        v-for="(item, index) in types"
        :key="index"
        tag="li"
        :to="'/list/' + item.id"
      >
        <img :src="'/img/icon/' + item.img" alt />
        <p>{{item.text}}</p>
      </router-link>
    </ul>
    <!-- 定义广告模块 -->
    <ul class="ad">
      <router-link v-for="(item, index) in ad" :key="index" tag="li" :to="'/detail/' + item.id">
        <h3 :class="'color-'+index">{{item.title}}</h3>
        <p>{{item.description}}</p>
        <img :src="'/img/ad/' + item.url" alt="">
      </router-link>
    </ul>
    <!-- 定义商品列表模块 -->
    <div class="home-list">
      <h2 class="guess-title">猜你喜欢</h2>
      <!-- 循环商品 -->
      <Product v-for="(item, index) in list" :key="index" :data="item"></Product>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '../assets/common.less';
.header {
  background: @navColor;
  display: flex;
  height: 60px;
  line-height: 60px;
  color: #fff;
  text-align: center;
  .title {
    flex: 1;
    font-size: 24px;
  }
  .go-back,
  .login {
    width: 60px;
  }
  .go-back {
    position: relative;
    .arrow {
      position: absolute;
      .arrowf(10px, #fff, right);
      border-right-color: white;
      top: 22px;
      right: 25px;
      .green {
        border-right-color: @navColor;
        position: absolute;
        top: -10px;
        right: -12px;
      }
    }
  }
  .login {
    font-size: 16px;
  }
}
.search {
  background: #fff;
  padding: 10px 20px;
  display: flex;
  input {
    background: #efefef;
    font-size: 14px;
    border: none;
    outline: none;
    border-radius: 18px;
    padding: 10px 20px;
    display: block;
    width: 100%;
    flex: 1;
  }
}
.home-types {
  .clearfix;
  padding: 10px 0;
  li {
    list-style: none;
    width: 20%;
    float: left;
    text-align: center;
  }
  img {
    width: 60%;
  }
  p {
    font-size: 12px;
    color: #666;
    padding: px 0 8px;
  }
}
.ad {
  display: flex;
  background: #fff;
  margin-top: 10px;
  padding: 10px 0;
  li {
    flex: 1;
    list-style: none;
    text-align: center;
    border-right: 1px solid #ccc;
    &:last-child {
      border-right: none;
    }
    h3 {
      font-size: 16px;
    }
    p {
      font-size: 12px;
      color: #666;
    }
    img {
      width: 60%;
    }
    .color-0 {
      color: red;
    }
    .color-1 {
      color: green;
    }
    .color-2 {
      color: purple;
    }
  }
}
.home-list {
  margin-top: 10px;
  background: #fff;
  .guess-title {
    font-size: 20px;
    padding: 10px 0;
    margin: 0 10px;
    border-bottom: 1px solid #ccc;
    color: #333;
  }
}
</style>
<script>
// 引入组件
import Product from '../components/Product'
export default {
  // 注册组件
  components: { Product },
  // 数据
  data () {
    return {
      // 分类数据
      types: [
        { text: '美食', id: '1', img: '01.png' },
        { text: '电影', id: '2', img: '02.png' },
        { text: '酒店', id: '3', img: '03.png' },
        { text: '休闲', id: '4', img: '04.png' },
        { text: '外卖', id: '5', img: '05.png' },
        { text: 'KTV', id: '6', img: '06.png' },
        { text: '周边游', id: '7', img: '07.png' },
        { text: '丽人', id: '8', img: '08.png' },
        { text: '小吃', id: '9', img: '09.png' },
        { text: '火车票', id: '10', img: '10.png' }
      ],
      ad: [],
      list: [],
      msg: ''
    }
  },
  // 组件创建完成请求数据
  created () {
    // 请求数据
    this.$http
      // get请求
      // .get('/data/home.json')
      .get('/ad')
      // 监听数据返回
      .then(({ data }) => {
        // console.log(data)
        // 存储数据
        this.ad = data
      })
    this.$http
      .get('/list')
      .then(({ data }) => {
        this.list = data
      })
  },
  methods: {
    // 展示搜索结果
    showSearchResult () {
      // 发布消息
      this.$store.commit('updateSearch', this.msg)
      // 清空消息
      this.msg = ''
    },
    logout () {
      this.$router.push('/Login')
    },
    filterMsg () {
      const filterList = this.list.filter(item => {
        return item.title.indexOf(this.msg) !== -1
      })
      this.list = filterList
      // this.msg = ''
    },
    debounceFliterMsg (fn, delay) {
      let timer = null
      return function () {
        const context = this
        const arg = arguments
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          fn.apply(context, arg)
        }, delay)
      }
    }
  }
}
</script>
