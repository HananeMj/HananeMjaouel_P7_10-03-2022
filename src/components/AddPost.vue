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
  <form @submit.prevent="savePost()" class="submit-form">
    <div>
      <div class="form-group">
        <label for="content">Quoi de neuf ?</label>
        <input
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
      <button @click.prevent="savePost" class="btn btn-success">Publier</button>
    </div>
    <div class="submitOk">
      <h4 v-show="ifOk">Publié !</h4>
    </div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "AddPost",
  components: {},
  data() {
    return {
      userId: localStorage.getItem("userId"),
      ifok: false,
      content: "",
      picture: "",
    };
  },
  methods: {
    async savePost() {
      const formData = new FormData();
      formData.append("userId", parseInt(localStorage.getItem("user_id")));
      formData.append("content", document.getElementById("content").value);
      formData.append("picture", this.picture);
      console.log(formData);
      await axios
        .post("http://localhost:5000/api/post", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "form-data/multipart",
          },
        })

        .then(() => {
          this.$emit("postResponse");
          console.log("post crée !");
        })
        .catch((error) => {
          console.log(error);
        });
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
.submitOk {
}
</style>
