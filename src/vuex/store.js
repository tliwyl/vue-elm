// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

var store = new Vuex.Store({
  state: {
    balls: [{
      show: false
    }, {
      show: false
    }, {
      show: false
    }, {
      show: false
    }, {
      show: false
    }],
    ballPos: {
      x: 0,
      y: 0
    }
  },
  mutations: {
    dropBall(state, el) {
      let rect = el.getBoundingClientRect();
      state.ballPos.x = rect.left - 32;
      state.ballPos.y = -(window.innerHeight - rect.top - 22);
      for (let i = 0; i < state.balls.length; i++) {
        let ball = state.balls[i];
        if (!ball.show) {
          ball.show = true;
          return;
        }
      }
    }
  }
});

export default store;
