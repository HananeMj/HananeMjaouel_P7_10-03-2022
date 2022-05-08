<template>
  <GroupoHeader />
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
import GroupoHeader from "@/components/GroupoHeader.vue";
export default {
  name: "HomeView",
  components: {
    HelloWorld,
    GroupoHeader,
  },
};
</script>
<style scoped>
.imgAccueil {
  text-align: center;
}
img {
  height: 300px;
}
</style>
