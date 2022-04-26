<template>
  <AddPost @postResponse="getAllPosts()" />
  <div v-if="user.isAdmin || user_id">
    <div v-for="post in posts" :key="post.id" class="container">
      <div class="row">
        <div class="col-md-8">
          <div class="post-content">
            <img
              src="post.picture"
              alt="post-image"
              class="img-responsive post-image"
            />
            <div class="post-container">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                alt="user"
                class="profile-photo-md pull-left"
              />
              <div class="post-detail">
                <div class="user-info">
                  <h5>
                    <router-link to="/profil" class="profile-link">{{
                      user.username
                    }}</router-link>
                    <button
                      v-if="user.id == post.user_id"
                      @click.prevent="deletePost(post.id)"
                      title="delete"
                      class="btn btn-danger"
                    >
                      Supprimer
                    </button>
                  </h5>
                  <p class="text-muted">Published at {{ post.createdAt }}</p>
                </div>
                <div class="reaction">
                  <a class="btn text-green"
                    ><i class="fa fa-thumbs-up"></i> 13</a
                  >
                  <a class="btn text-red"
                    ><i class="fa fa-thumbs-down"></i> 0</a
                  >
                </div>
                <div class="line-divider"></div>
                <div class="post-text">
                  <p>
                    {{ post.content }}

                    <i class="em em-anguished"></i>
                    <i class="em em-anguished"></i>
                    <i class="em em-anguished"></i>
                  </p>
                </div>
                <div class="line-divider"></div>

                <div
                  v-for="comment in comments"
                  :key="comment.id"
                  class="post-comment"
                >
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    alt=""
                    class="profile-photo-sm"
                  />
                  <p>
                    <a href="timeline.html" class="profile-link">{{
                      user.username
                    }}</a>
                    {{ comment.content }}
                  </p>
                </div>
                <div class="post-comment">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    alt=""
                    class="profile-photo-sm"
                  />
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Commenter la publication"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddPost from "@/components/AddPost.vue";

import axios from "axios";

export default {
  name: "AllPosts",
  components: {
    AddPost,
  },
  data() {
    return {
      token: localStorage.getItem("token"),
      user_id: localStorage.getItem("user_id"),
      user: [],
      post: {},
      posts: [],
      comment: {},
      comments: [],
    };
  },
  created() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/post")
      .then((res) => {
        this.posts = res.data.posts;
        console.log(this.posts);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/api/user", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.user = response.data.user;
        console.log(this.user);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:5000/api/comment", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.comments = response.data.comments;
        console.log(this.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    getUser() {
      axios
        .get("http://localhost:5000/api/user", {
          headers: {
            Authorization: "Bearer " + this.token,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.user = response.data.user;
          console.log(this.user);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getComments() {
      axios
        .get("http://localhost:5000/api/comment", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.comments = response.data;
          console.log(this.comments);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deletePost(id) {
      axios
        .delete("http://localhost:5000/api/comment/${id}", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          let i = this.posts.map((data) => data.id).indexOf(id);
          this.posts.splice(i, 1);
          alert("Post supprimé !");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getAllPosts() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .get("http://localhost:5000/api/post")
        .then((res) => {
          this.posts = res.data.data;
          console.log(res.data.data);
        })
        .catch((error) => {
          console.log(error);
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
