<template>
  <div>
    <v-header :seller="seller"></v-header>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <div class="nav-tab border-px-scale">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="seller">商家1</router-link>
      </div>
    </div>
    <!-- 路由匹配到的组件将渲染在这里 -->
    <transition name="fade">
      <router-view :seller="seller"></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">

  import header from '@/components/header/header.vue';
  export default {
    name: 'app',
    data() {
      return {
        seller: {}
      };
    },
    watch: {
      '$route': {
        handler: function (to, from) {
          console.log('to=' + to);
          console.log('from=' + from);
        },
        deep: true
      }
    },
    created() {
      this.$http.get('/api/seller').then((res) => {
        res = res.body;
        if (res.code === 0) {
          this.seller = res.result;
        }
      }, (res) => {

      });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/styl/mixin"

  .nav-tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        height: 40px
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: #09f
          color: rgb(240, 20, 20)

</style>
