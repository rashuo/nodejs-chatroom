<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'app',

    data() {
      return {
      };
    },

    created() {
    },

    methods: {
    },
  };
</script>

<style>
  html, body, #app {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
