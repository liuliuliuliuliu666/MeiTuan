<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <van-swipe style="height: 200px" :autoplay="2000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg'
      ]
    }
  },
  methods: {
    onSubmit () {
      this.$http.get('/userinfo').then(res => {
        if (this.username === res.data.username && this.password === res.data.password) {
          localStorage.setItem('token', res.data.token)
          this.$router.push('/Home')
        } else {
          this.$toast('用户名或密码错误')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100vh;
}
.van-form {
  margin: 30px 0;
}
.van-button--info {
  background-color: #06c1ad;
  border: 1px solid #06c1ad;
}
.van-button--normal {
  font-size: 16px;
}
img {
    width: 100%;
}
</style>
