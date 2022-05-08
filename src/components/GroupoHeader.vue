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
        <li class="nav-item">
          <router-link to="/login" class="nav-link"
            >Connexion / Inscription
            <Icon icon="uil:signin" style="color: red" height="30"
          /></router-link>
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
    return {
      isHidden: false,
    };
  },

  components: { Icon },
  methods: {},
};
</script>

<style>
.navbar-light .navbar-nav .nav-link {
  cursor: pointer;
}
.navbar {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}
img.logo {
  height: 60 px;
  width: 30%;
}
</style>
