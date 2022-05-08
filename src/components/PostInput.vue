<template>
  <form @submit.prevent="createPost()" id="uploadForm" class="submit-form">
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
      <label for="picture">Publier une photo</label>
      <input
        class="form-control-label upload-File"
        ref="file"
        type="file"
        accept="image/*"
        id="image"
        name="image"
      />
    </div>
    <div class="upload_photo">
      <button class="glow-on-hover">Publier</button>
    </div>
  </form>
  <!-- <div class="alert alert--success" v-show="isSuccess">Publié !</div>-->
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
.glow-on-hover {
  width: 100px;
  height: 40px;
  border: none;
  outline: none;
  color: #fff;
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  margin: 20px auto;
}

.glow-on-hover:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing 20s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

.glow-on-hover:active {
  color: #000;
}

.glow-on-hover:active:after {
  background: transparent;
}

.glow-on-hover:hover:before {
  opacity: 1;
}

.glow-on-hover:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #111;
  left: 0;
  top: 0;
  border-radius: 10px;
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
