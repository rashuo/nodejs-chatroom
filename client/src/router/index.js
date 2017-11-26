import Vue from 'vue';
import Router from 'vue-router';
import ChatPanel from '@/components/ChatPanel';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ChatPanel',
      component: ChatPanel,
    },
  ],
});
