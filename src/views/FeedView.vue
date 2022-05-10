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
          <router-link to="/members" class="nav-link"
            >Membres <Icon icon="fa:group" style="color: #1e90ff" height="25"
          /></router-link>
        </li>
        <li class="nav-item active">
          <router-link to="/profil" class="nav-link" href="#"
            >Profil <span class="sr-only">(current)</span>
            <Icon
              icon="carbon:user-avatar-filled"
              style="color: #1e90ff"
              height="30"
            />
          </router-link>
        </li>
        <li class="nav-item">
          <a @click="logOutUser" class="nav-link"
            >Déconnexion
            <Icon icon="heroicons-outline:logout" color="#1E90FF" height="30"
          /></a>
        </li>
      </ul>
    </div>
  </nav>
  <div class="home">
    <div class="input">
      <PostInput @newPost="getNewPost" />
    </div>
    <h1>Fil d'actualités</h1>
    <div v-for="post in posts" :key="post.idpost" class="wrapper">
      <SocialPost :post="post" />
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import SocialPost from "@/components/SocialPost.vue";
import PostInput from "@/components/PostInput.vue";
import axios from "axios";
export default {
  name: "FeedView",

  components: {
    SocialPost,
    PostInput,
    Icon,
  },
  //props: ["post"],

  data() {
    return {
      user: {},
      post: {},
      idpost: "",
      posts: [
        {
          idpost: "",
          content: "",
          picture: "",
          createdat: "",
          likes: Number,
        },
      ],
      likes: [],
      content: "",
      picture: "",
    };
  },
  methods: {
    getNewPost(value) {
      console.log(value);
      this.posts.unshift(value);
      this.picture = this.post.picture;
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
      .get("http://localhost:5000/api/post/")
      .then((response) => {
        console.log(response.data);
        this.posts = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.row {
  justify-content: center;
}
body {
  margin-top: 20px;
  background: #eee;
}
h1 {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 50px;
  font-weight: bold;
  color: red;
}
.input {
  margin-top: 50px;
}
</style>
