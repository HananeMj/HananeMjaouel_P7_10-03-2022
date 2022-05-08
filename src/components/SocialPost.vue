<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <div class="post-content">
          <div class="post-container">
            <div v-if="post.picture">
              <img
                :src="post.picture"
                alt="post-image"
                class="img-responsive post-image"
              />
            </div>
            <div v-if="post.userid == this.userId" class="dropdown">
              <button
                class="btn btn-secondary"
                type="button"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <Icon icon="bi:three-dots" color="red" height="30" />
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button
                  data-toggle="modal"
                  data-target="#myModal"
                  @click="modifyPost(post.id)"
                  v-if="post.userid == this.userId"
                  class="dropdown-item"
                  type="button"
                >
                  Modifier
                </button>
                <button
                  @click="deletePost()"
                  v-if="post.userid == this.userId"
                  class="dropdown-item"
                  type="button"
                >
                  Supprimer
                </button>
              </div>

              <!-- Modal -->
              <form
                @submit.prevent="modifyPost()"
                id="uploadForm"
                class="submit-form"
              >
                <div
                  class="modal fade"
                  id="myModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Modifier ma publication
                        </h5>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
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
                      <div class="form group">
                        <label for="image">Ajouter une photo</label>
                        <input
                          class="form-control-label upload-File"
                          ref="file"
                          type="file"
                          accept="image/*"
                          id="image"
                          name="image"
                        />
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Fermer
                        </button>
                        <button type="submit" class="btn btn-primary">
                          Sauvegarder
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div v-if="post.avatar">
              <img
                :src="post.avatar"
                alt="user"
                class="profile-photo-md pull-left"
              />
            </div>
            <div v-else>
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt="user"
                class="profile-photo-md pull-left"
              />
            </div>
            <div class="post-detail">
              <div class="user-info">
                <h5>
                  <router-link to="/profil" class="profile-link">{{
                    post.username
                  }}</router-link>
                </h5>
                <p class="text-muted">{{ post.createdat }}</p>
              </div>

              <div class="reaction">
                <a @click="likePost(post.idpost)" class="btn text-green">
                  <Icon icon="subway:like" style="color: green" height="25" />{{
                    likes
                  }}
                </a>
              </div>
              <div class="line-divider">
                <div class="post-text">
                  <p>
                    {{ post.content }}
                  </p>
                </div>
              </div>
              <div class="line-divider">
                <a @click="getComments()" class="btn">
                  <Icon
                    icon="ant-design:comment-outlined"
                    color="grey"
                    height="35"
                  />
                  Commentaires
                </a>
                <div
                  v-for="comment in comments"
                  :key="comment.idcomment"
                  class="be-comment-content"
                >
                  <div v-if="!show">
                    <img
                      v-if="comment.avatar"
                      :src="comment.avatar"
                      alt="avatar commentaire"
                      class="profile-photo-sm"
                    />
                    <img
                      v-else
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="avatar commentaire"
                      class="profile-photo-sm"
                    />
                    <span class="be-comment-name">
                      <a href="blog-detail-2.html">{{ comment.username }}</a>
                    </span>
                    <span class="be-comment-time">
                      <i class="fa fa-clock-o"></i>
                      {{ comment.createdat }}
                    </span>
                    <p class="be-comment-text">
                      {{ comment.content }}
                    </p>
                    <a
                      v-if="
                        comment.userid == this.userId || this.isadmin == true
                      "
                      type="button"
                      class="btn"
                      @click="deleteComment(comment.idcomment)"
                    >
                      <Icon
                        icon="fluent:delete-28-filled"
                        style="color: red"
                        height="20"
                      />
                      Supp
                    </a>
                  </div>
                </div>
              </div>

              <div class="post-comment">
                <!--<img
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  alt=""
                  class="profile-photo-sm"
                />-->
                <form @click.prevent="addComment(post.idpost)" method="post">
                  <input
                    v-model="commentInput"
                    type="text"
                    id="content"
                    name="commentInput"
                    class="form-control"
                    placeholder="commenter"
                  />
                  <a type="button" class="btn">
                    <Icon
                      icon="akar-icons:comment-add"
                      style="color: grey"
                      height="30"
                    />
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import axios from "axios";
//import moment from "moment";
export default {
  name: "SocialPost",
  components: {
    Icon,
  },
  props: ["post"],

  data() {
    return {
      posts: [],
      commentInput: "",
      idpost: "",
      idcomment: null,
      content: "",
      user: {},
      comments: [],
      likes: 0,
      show: false,
      userId: localStorage.getItem("userId"),
      createdat: "",
      upload: false,
      isadmin: "",
    };
  },
  methods: {
    modifyPost() {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const fd = new FormData(document.getElementById("uploadForm"));
      var image = document.querySelector("#image");

      console.log("image.file" + image.file);
      console.log("content:" + this.content);

      fd.append("content", this.content);
      fd.append("image", image.file);

      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .put(`http://localhost:5000/api/post/${this.post.idpost}`, fd, config)
        .then((response) => {
          console.log(response.data + "publication modifiée");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deletePost() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .delete(`http://localhost:5000/api/post/${this.post.idpost}`)

        .then((response) => {
          console.log(response);
          alert("Post supprimé !");
          document.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    likePost() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .post(`http://localhost:5000/api/post/${this.post.idpost}/like/`, {})
        .then((response) => {
          console.log(response);
          this.likes = response.data.message;
        })
        .catch((err) => console.log(err));
    },

    getComments() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .get(`http://localhost:5000/api/post/${this.post.idpost}/comments`)
        .then((response) => {
          console.log(response);
          this.comments = response.data;
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addComment() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .post(`http://localhost:5000/api/post/${this.post.idpost}/comment`, {
          content: this.commentInput,
        })
        .then((response) => {
          console.log(response);
          this.show = false;
          this.commentInput = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteComment(idcomment) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .delete(`http://localhost:5000/api/post/comment/${idcomment}`)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.likes = this.post.likes;
  },
};
</script>

<style scoped>
body {
  margin-top: 20px;
}

/*==================================================
  Post Contents CSS
  ==================================================*/

.post-content {
  background: #f96b6b29;
  border-radius: 10px;
  width: 100%;
  border: 1px solid #f1f2f2;
  margin-bottom: 20px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
}

.post-content img.post-image,
video.post-video,
.google-maps {
  width: 100%;
  height: auto;
}

.post-content .google-maps .map {
  height: 300px;
}

.post-content .post-container {
  padding: 20px;
}

.post-content .post-container .post-detail {
  margin-left: 65px;
  position: relative;
}

.post-content .post-container .post-detail .post-text {
  line-height: 24px;
  margin: 0;
}

.post-content .post-container .post-detail .reaction {
  position: absolute;
  right: 0;
  top: 0;
}

.post-content .post-container .post-detail .post-comment {
  display: inline-flex;
  margin: 10px auto;
  width: 100%;
}

.post-content .post-container .post-detail .post-comment img.profile-photo-sm {
  margin-right: 10px;
}

.post-content .post-container .post-detail .post-comment .form-control {
  height: 30px;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  margin: 7px 0;
  min-width: 0;
}

img.profile-photo-md {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-top: 20px;
}

img.profile-photo-sm {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.text-green {
  color: #8dc63f;
}
.profile-link {
  font-weight: bold;
}
form {
  display: flex;
}
p {
  color: black;
}
.row {
  justify-content: center;
}
.dropdown {
  text-align: right;
  margin-top: 15px;
  margin-right: 30px;
}
.btn-secondary {
  color: red;
  background-color: transparent;
  border-color: transparent;
}
label {
  margin-right: 10px;
}
.form-group {
  text-align: left;
  margin-left: 10px;
  width: 95%;
}
</style>
