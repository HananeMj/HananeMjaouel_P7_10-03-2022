<template>
  <!-- <header>
    <nav class="navbar navbar-expand">
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" @click="disconnectUser">Se deconnecter</a>
        </li>
        <li class="nav-item">
          <router-link to="/postlist" class="nav-link"
            >Fil d'actualités</router-link
          >
        </li>
      </div>
    </nav>
  </header>-->
  <form @submit.prevent="createPost" class="submit-form">
    <div class="form-group">
      <label for="content">Quoi de neuf ?</label>
      <input
        @keyup.enter="savePost(content)"
        v-model="content"
        type="text"
        class="form-control"
        id="content"
        required
        name="content"
      />
    </div>
    <div class="form-group">
      <label for="picture">Publier une photo</label>
      <input
        class="form-control-label upload-File"
        type="file"
        ref="picture"
        accept="image/*"
        id="picture"
        name="picture"
      />
    </div>
    <button class="btn btn-success">Publier</button>

    <div class="alert alert--success" v-show="!isValid">Publié !</div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "PostInput",
  emits: ["newPost"],

  data() {
    return {
      userId: localStorage.getItem("userId"),
      user: {},
      content: "",
      picture: "",
      isValid: "false",
    };
  },
  methods: {
    savePost(content) {
      console.log(content);
    },
    createPost() {
      console.log(this.content, this.picture);
      const formData = new FormData();
      formData.append("content", this.content);
      formData.append("picture", this.picture);
      console.log(formData);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .post("http://localhost:5000/api/post", formData)

        .then((response) => {
          this.$emit("newPost", response.data.post);
          console.log("post crée !" + response);
          document.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    mounted() {
      this.$router.push("/feed");
    },
  },
};
</script>

<style scoped>
.submit-form {
  max-width: 300px;
  margin: auto;
}
.custom-file-input :hover {
  cursor: pointer;
}
</style>
