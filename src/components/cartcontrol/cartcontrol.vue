<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)">
        <span class="icon icon-remove_circle_outline"></span>
      </div>
    </transition>

    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click.stop.prevent="addCart($event)" ref="addIcon">
      <span class="icon icon-add_circle"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        foodItem: this.food
      };
    },
    created() {
      // console.log(this.food);
    },
    /* watch: {
     food: {
     handler(val, oldVal) {
     this.foodItem = val;
     },
     deep: true
     }
     }, */
    methods: {
      addCart(evt) {
        if (!evt._constructed) {
          return;
        }
        if (!this.food.count) {
          // 监听是注册的时候对属性批量使用Object.defineProperty方法实现的，所以后直接添加的属性不会监听
          this.$set(this.food, 'count', 1);
        } else {
          // 这里的this.food是父组件goods.vue中某一项food的引用
          this.food.count++;
        }
        // 在子组件改变父组件数据food不会触发父组件更新，需要手动触发父组件的方法
        // this.$emit('selectFoodsFn');
        // this.$emit('dropFn', this.$refs.addIcon);
        this.$nextTick(() => {
          let el = evt.target;
          el = el.tagName.toLowerCase() === 'div' ? el : el.parentNode;
          this.$store.commit('dropBall', el);
        });
      },
      decreaseCart(evt) {
        if (!evt._constructed) {
          return;
        }
        if (this.food.count > 0) {
          this.food.count--;
        }
        // this.$emit('selectFoodsFn');
      }

    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease, .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
    .cart-decrease
      transition: all .5s linear
      transform: translate3D(0, 0, 0)
      opacity: 1
      &.move-enter, &.move-leave-to
        opacity: 0
        transform: rotate(180deg) translate3D(-24px, 0, 0)

    .cart-count
      display: inline-block
      padding-top: 6px
      line-height: 24px
      font-size: 12px
      text-align: center
      vertical-align: top
      color: rgb(147, 153, 159)

</style>
