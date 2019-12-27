<template>
  <div id="app">
    <layout /> 
    <TheSidebar />
    <!-- <login /> -->
   
  </div>
</template>

<script>
import TheSidebar from "./components/reuse/sidebar.vue";
import Layout from "./components/reuse/layout.vue";
// import login from "./components/reuse/login.vue";

export default {
  name: "app",
  components: {
    'TheSidebar': TheSidebar,
    'Layout': Layout
    // 'login':login
  }
};

</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
