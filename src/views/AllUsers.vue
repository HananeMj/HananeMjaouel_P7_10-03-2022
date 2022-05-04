<template>
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
          <div v-if="user.isadmin == true" class="btn-group">
            <a
              class="btn dropdown-toggle btn-info"
              data-toggle="dropdown"
              href="#"
            >
              Action
              <span class="icon-cog icon-white"></span
              ><span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <a href="#">Modifier</a>
              </li>
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
import axios from "axios";
export default {
  name: "AllUser",
  props: [],
  data() {
    return {
      user: {},
      users: [],
      isadmin: "",
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
  text-align: center;
  margin-top: 50px;
  font-weight: bold;
}
.user {
  max-width: 100%;
  width: 300px;
  display: flex;
  justify-content: space-around;
  gap: 16px;
  background: rgb(236, 235, 235);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 20px;
  padding: 20px;
  margin: 20px auto;
}
</style>
