<template>
  <div class="navbar">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link to="/feed" class="nav-link" href="#">
          <Icon icon="akar-icons:arrow-back-thick-fill" height="30" /> Fil
          d'actualités
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/profil" class="nav-link" href="#">
          <Icon
            icon="carbon:user-avatar-filled"
            style="color: black"
            height="30"
          />
          Mon profil
        </router-link>
      </li>
    </ul>
  </div>
  <h3>Membres</h3>
  <br /><br />
  <div
    v-for="user in users"
    :key="user.iduser"
    class="container d-flex justify-content-center mt-5 user"
  >
    <div class="row">
      <div class="col-md-3">
        <div v-if="user.avatar" class="d-flex justify-content-center">
          <img
            :src="user.avatar"
            alt="photo de profil"
            width="50"
            class="rounded-circle"
          />
        </div>
        <div v-else>
          <img
            src="https://i.imgur.com/AgAC1Is.jpg"
            width="50"
            alt="avatar"
            class="rounded-circle"
          />
        </div>
        <div class="text-center">
          <span class="name">{{ user.username }}</span>
          <p class="user_info"></p>
        </div>
        <div class="span2">
          <div
            v-if="user.isadmin == true || user.iduser == this.userId"
            class="btn-group"
          >
            <a
              class="btn dropdown-toggle btn-info"
              data-toggle="dropdown"
              href="#"
            >
              Options
              <span class="icon-cog icon-white"></span
              ><span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <a href="#" @click="deleteUser(user)">Supprimer</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import axios from "axios";
export default {
  name: "AllUser",
  components: {
    Icon,
  },
  props: [],
  data() {
    return {
      user: {},
      users: [],
      isadmin: "",
      userId: localStorage.getItem("userId"),
    };
  },
  methods: {
    deleteUser(user) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .delete(`http://localhost:5000/api/user/${user.iduser}`)
        .then((response) => {
          console.log(response);
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axios
      .get(`http://localhost:5000/api/user`)
      .then((response) => {
        console.log(response.data);
        this.users = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
h3 {
  color: black;
  text-align: center;
  margin-top: 50px;
  font-weight: bold;
  font-size: 2rem;
}
.user {
  max-width: 100%;
  width: 300px;
  display: flex;
  justify-content: space-around;
  gap: 16px;
  background: #f96b6b29;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 20px;
  padding: 20px;
  margin: 20px auto;
}
.nav-link {
  color: black;
}
span {
  color: black;
  margin-top: 15px;
}
</style>
