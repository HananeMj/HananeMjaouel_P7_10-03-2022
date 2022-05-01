<template>
  <groupo-header />

  <router-view />
</template>
<script>
import GroupoHeader from "@/components/GroupoHeader.vue";

export default {
  components: {
    GroupoHeader,
  },
  data() {
    return {
      user: null,
    };
  },
  methods: {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  //-webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #ed3c3c;
    }
  }
}
</style>
