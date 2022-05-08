<template>
  <div v-if="user" class="container bootdey">
    <h3>Profil</h3>
    <hr />
    <div class="wrap clearfix">
      <!--Avatar -->
      <div v-if="user.avatar" class="col-sm-4 col-xs-12 avatar">
        <img
          :src="user.avatar"
          class="rounded-circle shadow-4"
          alt="photo de profil"
        />
      </div>
      <div v-else class="col-sm-4 col-xs-12 avatar">
        <img
          src="https://bootdey.com/img/Content/avatar/avatar7.png"
          class="rounded-circle shadow-4"
          style="width: 150px"
          alt="avatar"
        />
      </div>

      <p>{{ user.username }}</p>
      <div class="upload_photo">
        <button @click="upload = !upload" class="btn">
          <Icon
            icon="ic:baseline-photo-camera"
            style="color: grey"
            height="40"
          />
          Modifier ma photo de profil
        </button>
      </div>

      <div v-if="upload">
        <FileUpload @newAvatar="getNewAvatar" />
      </div>
      <div class="form-row">
        <button @click="logOutUser()" class="btn btn-outline-primary">
          Déconnexion
        </button>

        <button @click="deleteUser(user)" class="btn btn-outline-danger">
          Supprimer mon compte
        </button>
        <router-link to="/feed"
          ><Icon icon="akar-icons:arrow-back-thick-fill" />
          Retour fil d'actualités
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import FileUpload from "@/components/FileUpload.vue";
import { Icon } from "@iconify/vue";
import axios from "axios";
export default {
  name: "ProfilUser",
  components: { Icon, FileUpload },
  props: [],
  data() {
    return {
      userId: localStorage.getItem("userId"),
      user: {},
      iduser: "",
      avatar: "",
      username: "",
      isadmin: "",
      upload: false,
    };
  },

  methods: {
    deleteUser() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .delete(`http://localhost:5000/api/user/${this.userId}`)
        .then((response) => {
          console.log(response);
          alert("Compte utilisateur supprimé");
          this.$router.push("/");
          localStorage.clear();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getNewAvatar(value) {
      console.log(value);
      this.avatar = value;
      this.upload = false;
      setTimeout(
        function (scope) {
          scope.location.reload();
        },
        2000,
        this
      );
      location.reload();
    },
    logOutUser() {
      localStorage.clear();
      this.$router.push("/");
    },
  },

  mounted() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axios
      .get(`http://localhost:5000/api/user/currentUser/${this.userId}`)

      .then((response) => {
        this.user = response.data;
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
h3 {
  text-align: center;
  font-weight: bold;
  margin: 15px auto;
}
.btn:not(:disabled):not(.disabled) {
  margin: 15px;
}
.form-row {
  width: 50%;
  justify-content: space-between;
}
.wrap {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}
.upload_photo {
  margin: 20px auto;
}
a {
  margin: 15px;
}
</style>
