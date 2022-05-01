<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <router-link to="/" class="navbar-brand"
      ><img class="logo" src="../assets/images/logo.png" alt="Groupomania"
    /></router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link to="/feed" class="nav-link"
            >Accueil <span class="sr-only">(current)</span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Se connecter</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/profil" class="nav-link" href="#"
            >Profil</router-link
          >
        </li>
        <li class="nav-item">
          <a v-if="isVisible" @click="logOutUser" class="nav-link"
            >Se déconnecter</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "groupo-header",
  data() {
    return {
      isVisible: true,
    };
  },

  components: {},
  methods: {
    logOutUser() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
img.logo {
  height: 60 px;
  width: 30%;
}
</style>
