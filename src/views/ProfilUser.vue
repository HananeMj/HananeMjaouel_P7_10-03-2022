<template>
  <div v-if="user" class="container bootdey">
    <hr />
    <div class="wrap clearfix">
      <!--Avatar -->
      <div v-if="user.avatar" class="col-sm-4 col-xs-12 avatar">
        <img src="user.avatar" class="img-thumbnail" alt="" />
      </div>
      <div v-else class="col-sm-4 col-xs-12 avatar">
        <img
          src="https://bootdey.com/img/Content/avatar/avatar7.png"
          class="img-thumbnail"
          alt=""
        />
      </div>

      <p>{{ user.username }}</p>
      <!-- End Avatar -->
      <div class="col-sm-8 col-xs-12">
        <div class="icons col-xs-12">
          <button class="btn btn-default">
            <span class="glyphicon glyphicon-user"></span>
          </button>

          <button class="btn btn-default">
            <span class="glyphicon glyphicon-refresh"></span>
          </button>
          <a href="#" @click="deleteAccount(user)" class="btn btn-default">
            <span class="glyphicon glyphicon-trash"></span>
          </a>
        </div>
        <div class="col-xs-12 content">
          <h2>{{ user.isadmin }}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos a
            similique dicta modi minus nostrum magnam provident reprehenderit in
            quae
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ProfilUser",
  props: ["iduser"],
  data() {
    return {
      user: {},
    };
  },
  methods: {
    deleteAccount() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios.delete(`http://localhost:5000/api/user` + this.iduser);
    },
  },
  mounted() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axios
      .get(`http://localhost:5000/api/user` + this.iduser)
      .then((response) => {
        this.user = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style></style>
