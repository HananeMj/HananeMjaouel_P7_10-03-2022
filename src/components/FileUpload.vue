<template>
  <div class="file">
    <form @submit.prevent="onSubmit()" enctype="multipart/form-data">
      <div class="form-row">
        <label>
          <input
            type="file"
            name="image"
            id="image"
            class="form-row__input"
            @change="onFileSelected($event)"
          /> </label
        ><br />
      </div>
      <div class="form-row">
        <button @click="onUpload()" type="button" class="btn btn-success">
          Valider
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FileUpload",
  emits: ["newAvatar"],
  data() {
    return {
      user: {},
      selectedFile: "",
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log(event);
    },
    onUpload() {
      const formdata = new FormData();
      formdata.append("image", this.selectedFile, this.selectedFile.name);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .put(
          `http://localhost:5000/api/user/profil/${this.user.iduser}`,
          formdata
        )
        .then((response) => {
          //this.user = response.data;
          console.log("Photo mise à jour", response);
          this.$emit("newAvatar", response.data);
        })
        .catch((err) => console.log("Echec de mise à jour de la photo", err));
    },
  },
};
</script>

<style scoped>
.btn {
  height: 30px;
  margin-bottom: 20px;
}
</style>
