<template>
  <div id="app">
    <div class="header">
      <div class="go-back" @click="$router.go(-1)">
        <span class="arrow">
          <span class="arrow green"></span>
        </span>
      </div>
      <h2>仿美团移动界面</h2>
      <div class="login">登录</div>
    </div>
    <div class="search" v-show="!$route.fullPath.includes('/detail/')">
      <input type="text" v-model="msg" @keyup.enter="showSearchResult" placeholder="请输入搜索关键词" />
    </div>
    <router-view />
  </div>
</template>

<style lang="less" scoped>
@import "./assets/common.less";
*{
  margin: 0;
  padding: 0;
}
html, body{
  background: #efefef;
}
.header {
  background: @navColor;
  display: flex;
  height: 60px;
  line-height: 60px;
  color: #fff;
  text-align: center;
  h2 {
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
</style>

<script>
export default {
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    // 展示搜索结果
    showSearchResult () {
      // 发布消息
      this.$store.commit('updateSearch', this.msg)
      // 清空消息
      this.msg = ''
    }
  }
}
</script>
