<template>
  <div class="home">
    <PostInput @newPost="getNewPost" />
    <h3>Fil d'actualités</h3>
    <div v-for="post in posts" :key="post.idpost" class="wrapper">
      <PostTwo :post="post" />
    </div>
  </div>
</template>

<script>
import PostTwo from "@/components/PostTwo.vue";
import PostInput from "@/components/PostInput.vue";
import axios from "axios";
export default {
  name: "FeedTwo",
  components: {
    PostTwo,
    PostInput,
  },
  data() {
    return {
      user: {},
      comments: [],
      idpost: null,
      posts: [
        {
          idpost: "",
          content: "",
          picture: "",
          createdat: "",
        },
      ],
      likes: [],
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
  },
};
</script>

<style></style>
