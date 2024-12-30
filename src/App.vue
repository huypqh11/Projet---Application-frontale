<template>
  <div id="app" class="mainPage">
    <app-header />
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from "./AppHeader";

export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}

.mainPage {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #2d99ae;
}
</style>
