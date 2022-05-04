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
            >Fil d'actualités<span class="sr-only">(current)</span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link"
            >Connexion
            <Icon icon="oi:account-login" style="color: red" height="20"
          /></router-link>
        </li>
        <li class="nav-item">
          <router-link to="/profil" class="nav-link" href="#"
            >Profil
            <Icon
              icon="carbon:user-avatar-filled"
              style="color: red"
              height="20"
            />
          </router-link>
        </li>
        <li class="nav-item">
          <a @click="logOutUser" class="nav-link"
            >Déconnexion
            <Icon icon="oi:account-logout" style="color: red" height="20"
          /></a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
  name: "groupo-header",
  data() {
    return {};
  },

  components: { Icon },
  methods: {
    logOutUser() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.navbar {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}
img.logo {
  height: 60 px;
  width: 30%;
}
</style>
