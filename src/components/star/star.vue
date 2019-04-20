<template>
  <div class="star" :class="starType">
    <span class="star-item" v-for="itemClass in itemClasses" :class="itemClass"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LEN = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      itemClasses() {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        if (hasDecimal) {
          result.push(CLS_HALF);
        }
        while (result.length < LEN) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../src/common/styl/mixin.styl";

  .star
    .star-item
      display: inline-block
      background-repeat: no-repeat
      /*margin: 0 11px*/
    &.star-48
      .star-item
        height: 20px
        width: 20px
        background-size: 20px 20px
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        height: 15px
        width: 15px
        margin-right: 6px
        background-size: 15px 15px
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')

  &.star-24
    .star-item
      height: 10px
      width: 10px
      margin-right: 3px
      background-size: 10px 10px
      &.on
        bg-image('star24_on')
      &.half
        bg-image('star24_half')
      &.off
        bg-image('star24_off')

</style>
