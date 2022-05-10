<template>
  <form @submit.prevent="createPost()" id="uploadForm" class="submit-form">
    <div class="form-group">
      <!--<label for="content">Quoi de neuf ?</label>-->
      <input
        placeholder="Quoi de neuf ?"
        aria-label="entrez votre publication "
        @keyup.enter="savePost(content)"
        v-model="content"
        type="text"
        class="form-control"
        required
        name="content"
      />
    </div>

    <div class="form-row push">
      <a @click="upload = !upload" class="btn">
        <Icon
          icon="ic:outline-add-photo-alternate"
          style="color: red"
          height="40"
        />
      </a>
    </div>

    <div v-if="upload" class="form group">
      <input
        class="form-control-label upload-File"
        ref="file"
        type="file"
        accept="image/*"
        id="image"
        name="image"
        aria-label="publier une image"
      />
    </div>
    <div class="upload_photo">
      <button class="btn btn-danger">Publier</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { Icon } from "@iconify/vue";
export default {
  name: "PostInput",
  emits: ["newPost"],
  components: { Icon },
  data() {
    return {
      userId: localStorage.getItem("userId"),
      user: {},
      content: "",
      picture: "",
      upload: false,
    };
  },
  methods: {
    savePost(content) {
      console.log(content);
    },

    createPost() {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const data = new FormData(document.getElementById("uploadForm"));
      var imageFile = document.querySelector("#image");
      console.log(imageFile.file);
      data.append("image", imageFile.file);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .post("http://localhost:5000/api/post", data, config)

        .then((response) => {
          this.upload = false;
          this.$emit("newPost", response.data.post);
          console.log("post crée !" + response.data);
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
.btn-danger {
  color: black;
  border-radius: 25px;
  font-weight: 600;
  background-color: red;
}
</style>
