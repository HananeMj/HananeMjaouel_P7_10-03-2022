<template>
  <div class="home">
    <PostInput @newPost="getNewPost" />
    <h3>Fil d'actualités</h3>
    <div v-for="post in posts" :key="post.idpost" class="wrapper">
      <SocialPost :post="post" />
    </div>
  </div>
</template>

<script>
import SocialPost from "@/components/SocialPost.vue";
import PostInput from "@/components/PostInput.vue";
import axios from "axios";
export default {
  name: "FeedView",

  components: {
    SocialPost,
    PostInput,
  },

  data() {
    return {
      user: {},
      post: {},
      idpost: null,
      posts: [],
      //likes: [],
      //comments: [],
      content: "",
    };
  },
  methods: {
    getNewPost(value) {
      console.log(value);
      this.posts.unshift(value);
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

    /*axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axios
      .get(`http://localhost:5000/api/post/${this.id}/comments`)
      .then((response) => {
        console.log(response);
        this.comments = response.data.comments;
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });*/
  },
};
</script>

<style scoped>
body {
  margin-top: 20px;
  background: #eee;
}
h3 {
  text-align: center;
}
</style>
