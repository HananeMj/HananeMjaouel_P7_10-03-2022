<template>
  <div class="home">
    <HelloWorld msg="Bienvenue sur votre réseau social" />
  </div>
  <div class="imgAccueil">
    <img src="../assets/images/icon.png" alt="backround image" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
};
</script>
<style scoped>
.imgAccueil {
  text-align: center;
}
img {
  height: 500px;
}
</style>
