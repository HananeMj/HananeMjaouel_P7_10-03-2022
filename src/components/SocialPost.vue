<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <div class="post-content">
          <div v-if="post.picture">
            <img
              :src="post.picture"
              alt="post-image"
              class="img-responsive post-image"
            />
          </div>
          <div class="post-container">
            <div>
              <img
                :src="post.avatar"
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
                <a @click="likePost(post.idpost)" class="btn text-green"
                  ><i class="fa fa-thumbs-up"></i>{{ likes }} 13</a
                >
                <a
                  @click="deletePost()"
                  v-if="post.userid == this.user.iduser || this.user.isadmin"
                  class="btn text-red"
                  ><i class="fa-solid fa-trash-can"></i
                ></a>
              </div>
              <div class="line-divider"></div>
              <div class="post-text">
                <p>
                  {{ post.content }} <i class="em em-anguished"></i>
                  <i class="em em-anguished"></i>
                  <i class="em em-anguished"></i>
                </p>
              </div>
              <div class="line-divider"></div>
              <button @click="getComments()" class="btn com__btn">
                Commentaires
              </button>
              <div
                v-for="comment in comments"
                :key="comment.idcomment"
                class="post-comment"
              >
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  alt=""
                  class="profile-photo-sm"
                />
                <p>
                  <router-link to="/profil" class="profile-link">{{
                    user.username
                  }}</router-link
                  ><i class="em em-laughing"></i> {{ comment.content }}
                </p>
                <button
                  @click="deleteCom(comment.idcomment)"
                  v-if="comment.userid == this.user.iduser || this.user.isadmin"
                >
                  Supprimer
                </button>
              </div>

              <div class="post-comment">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  alt=""
                  class="profile-photo-sm"
                />
                <form @click.prevent="addComment(post.idpost)" method="post">
                  <input
                    v-model="commentInput"
                    type="text"
                    id="content"
                    name="commentInput"
                    class="form-control"
                    placeholder="publier un commentaire"
                  />
                  <button class="button">Commenter</button>
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
import axios from "axios";
export default {
  name: "SocialPost",
  props: ["post"],

  data() {
    return {
      posts: [],
      commentInput: "",
      idpost: null,
      idcomment: null,
      content: "",
      user: {},
      comments: [],
      likes: 0,
    };
  },
  methods: {
    deletePost() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .delete(`http://localhost:5000/api/post/${this.idpost}`)

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
        .post(`http://localhost:5000/api/like/${this.idpost}`)
        .then((response) => {
          console.log(response);
          this.likes = response.data.result[0].likes;
        })
        .catch((error) => console.log(error));
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
        .post(`http://localhost:5000/api/post/${this.idPost}/comment`)
        .then((response) => {
          console.log(response);
          this.comments = response.data.comment;
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
  background: #f8f8f8;
  border-radius: 4px;
  width: 100%;
  border: 1px solid #f1f2f2;
  margin-bottom: 20px;
  overflow: hidden;
  position: relative;
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
}

img.profile-photo-sm {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.text-green {
  color: #8dc63f;
}

.text-red {
  color: #ef4136;
}

.following {
  color: #8dc63f;
  font-size: 12px;
  margin-left: 20px;
}
</style>
