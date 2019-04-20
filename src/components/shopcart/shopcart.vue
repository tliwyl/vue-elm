<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{active:totalCount>0}">
            <span class="icon-shopping_cart icon"></span>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
        </div>
        <div class="price" :class="{active:totalPrice > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass" @click.stop.prevent="pay">{{payDesc}}</div>
      </div>
    </div>
    <div class="ball-container">
      <div class="ball-wrapper" v-for="(item, index) in balls">
        <transition name="drop" @before-enter="dropBefore" @enter="dropEnter" @after-enter="dropAfterEnter">
          <div v-show="item.show" class="ball" :index="index">
            <div class="icon icon-add_circle icon-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food border-scale" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price * food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </transition>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  export default {
    props: {
      selectFoods: {
        type: Array,
        default: () => {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        dropBall: [],
        fold: true
      };
    },
    computed: {
      balls() {
        return this.$store.state.balls;
      },
      ballPos() {
        return this.$store.state.ballPos;
      },
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((v, i, o) => {
          total += v.price * v.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((v, i, o) => {
          count += v.count;
        });
        return count;
      },
      payDesc() {
        let total = this.totalPrice;
        if (total === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (total < this.minPrice) {
          let diff = this.minPrice - total;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass() {
        let total = this.totalPrice;
        let payClass = 'not-enough';
        if (total >= this.minPrice && this.totalCount > 0) {
          payClass = 'enough';
        }
        return payClass;
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {click: true});
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      dropBefore(el) {
        let x = this.ballPos.x;
        let y = this.ballPos.y;
        let oIcon = el.getElementsByClassName('icon-hook')[0];
        el.style.display = 'block';
        el.style.webkitTransform = `translate3d(0,${y}px,0)`;
        el.style.transform = `translate3d(0,${y}px,0)`;
        oIcon.style.webkitTransform = `translate3d(${x}px,0,0)`;
        oIcon.style.transform = `translate3d(${x}px,0,0)`;
      },
      dropEnter(el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;

        let oIcon = el.getElementsByClassName('icon-hook')[0];
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          oIcon.style.webkitTransform = 'translate3d(0,0,0)';
          oIcon.style.transform = 'translate3d(0,0,0)';
        });
      },
      dropAfterEnter(el) {
        let index = el.getAttribute('index');
        let ball = this.balls[index];
        if (ball.show) {
          el.style.display = 'none';
          ball.el = null;
          ball.show = false;
        }
      },
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      hideList() {
        this.fold = true;
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        alert('qwww');
      }
    },
    directives: {
      focus: {
        bind: function (el, binding, vnode) {
          el.innerHTML = '<div>' + binding.value + '</div>';
        },
        inserted: function (el, binding) {
          el.focus();
        },
        update: function (el, binding) {
          // console.log('v=' + binding.value);
        },
        componentUpdated: function (el, binding) {
          console.log('v=' + binding.value);
        }
      }
    },
    components: {}
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../src/common/styl/mixin.styl";
  .shopcart
    position: fixed
    height: 48px
    width: 100%
    bottom: 0
    left: 0
    background: #000
    z-index: 50
    .content
      display: flex
      font-size: 0
      color: rgba(255, 255, 255, .4)
      background: #141d27
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          height: 56px
          width: 56px
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          box-sizing: border-box
          border-radius: 50%
          background: #000
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            border-radius: 16px
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4)
            font-size: 9px
            font-weight: 700
            color: #fff
          .logo
            width: 100%
            height: 100%
            text-align: center
            border-radius: 50%
            background: #2b343c
            &.active
              background: rgb(0, 160, 220)
            &.active .icon
              color: #fff
            .icon
              line-height: 44px
              font-size: 24px
              color: #80858a
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          border-right: 1px solid rgba(255, 255, 255, .1)
          font-size: 16px
          font-weight: 700
          &.active
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
          font-weight: 700
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          font-size: 12px
          font-weight: 700
          text-align: center
          &.enough
            background: #00b43c
            color: #fff
          &.not-enough
            background: #2b333b
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        font-size: 24px
        z-index: 200
        transition: all .6s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .icon
          height: 16px
          width: 16px
          border-radius: 50%
          transition: all .6s linear
          color: rgb(0, 160, 220)
    .shopcart-list
      position: absolute;
      top: 0
      left: 0
      z-index: -1
      width: 100%
      transition: all .5s
      transform: translate3d(0, -100%, 0)
      &.fold-enter
        transform: translate3d(0, 0, 0)
      &.fold-enter-to
        transform: translate3d(0, -100%, 0)
      &.fold-leave
        transform: translate3d(0, -100%, 0)
      &.fold-leave-to
        transform: translate3d(0, 0, 0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, .1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, .1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 4px

    .list-mask
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      transition: all .5s
      z-index: -2
      background: rgba(7, 17, 27, .6)
      filter: blur(10px)
      &.fade-enter, &.fade-leave-to
        opacity: 0
</style>
