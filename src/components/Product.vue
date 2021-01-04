<template>
  <div class="product">
      <router-link tag="div" :to="'/detail/' + data.id" class="product-inner">
          <img :src="'/img/list/' + data.img" alt="">
          <div class="content">
              <h3>{{data.title}}</h3>
              <p>
                  <span class="price">{{data.price}}元</span>
                  <span class="origin-price">门市价{{data.originPrice}}</span>
                  <span class="sales">销量{{data.sales}}</span>
              </p>
          </div>
      </router-link>
  </div>
</template>

<style lang="less" scoped>
@import '../assets/common.less';
.product{
    background: #fff;
    .product-inner{
        margin: 0 10px;
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
        display: flex;
        img{
        width: 100px;
        height: 60.5px;
        }
        .content{
            flex: 1;
            padding-left: 10px;
            h3{
                font-size: 12px;
                min-height: 10px;
            }
            p{
                font-size: 10px;
                .price{
                    color: @navColor;
                    margin-right: 5px;
                }
                .sales{
                    float: right;
                }
            }
        }
    }
}
</style>

<script>
export default {
  // 接收数据
  props: ['data'],
  created () {
    // console.log(this)
  }
}
</script>
