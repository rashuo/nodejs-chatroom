<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'app',

  created() {
    const ws = new WebSocket('ws://localhost:8000/ws');
    ws.onopen = () => {
      ws.send('你好 服务器');
    };
    ws.onmessage = (e) => {
      console.log('收到服务器的数据', e.data);
    };
    ws.onerror = (err) => {
      console.log('_error');
      console.log(err);
    };
    ws.onclose = () => {
      console.log('_close');
    };
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
