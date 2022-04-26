<template>
  <nav>
    <router-link to="/">Accueil</router-link> |
    <router-link to="/login">Se connecter</router-link>
  </nav>
  <router-view />
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
