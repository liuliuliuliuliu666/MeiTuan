<template>
  <div id="app">
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
</style>

<script>
export default {
  name: 'App'
}
</script>
