<template>
  <div class="navbar">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link to="/" class="nav-link" href="#">
          <Icon icon="ant-design:home-outlined" height="30" /> Accueil
        </router-link>
      </li>
    </ul>
  </div>
  <div class="container h-100">
    <div class="row h-100">
      <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
        <div class="d-table-cell align-middle">
          <div class="text-center mt-4">
            <h1 class="h2">Créer un compte</h1>
          </div>

          <div class="card">
            <div class="card-body">
              <div class="m-sm-4">
                <form @submit.prevent="handleRegister">
                  <div class="form-group">
                    <label>Nom d'utilisateur</label>
                    <input
                      v-model="username"
                      class="form-control form-control-lg"
                      type="text"
                      name="name"
                      placeholder="nom d'utilisateur :"
                      aria-label="nom d'utilisateur"
                    />
                  </div>

                  <div class="form-group">
                    <label>Email</label>
                    <input
                      v-model="email"
                      class="form-control form-control-lg"
                      type="email"
                      name="email"
                      placeholder="e-mail :"
                      aria-label="email"
                    />
                  </div>
                  <div class="form-group">
                    <label>Mot de passe</label>
                    <input
                      v-model="password"
                      class="form-control form-control-lg"
                      type="password"
                      name="password"
                      placeholder="mot de passe :"
                      aria-label="mot de passe"
                    />
                  </div>
                  <div class="text-center mt-3">
                    <button type="submit" class="btn btn-lg btn-dark">
                      créer mon compte
                    </button>
                  </div>
                </form>
              </div>
              <div class="link">
                <p class="To-signup">Vous avez un compte ?</p>
                <router-link to="/login" class="text-center new-account"
                  >Connectez-vous
                </router-link>
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
export default {
  name: "RegisterView",
  components: { Icon },
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    handleRegister() {
      if (this.username == "" || this.email == "" || this.password == "") {
        this.message = "Veuillez remplir tous les champs !";
      }
      axios
        .post("http://localhost:5000/api/user/signup", {
          username: this.username,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          alert("Compte utilisateur crée");
          this.$router.push("/login");

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
  background-color: #f2f3f8;
}
.card {
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 15px 1px rgba(52, 40, 104, 0.08);
}

.card {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #e5e9f2;
  border-radius: 0.2rem;
}
.link {
  text-align: center;
}
.nav-link {
  color: black;
}
.text-center {
  color: black;
}
.btn-lg {
  background-color: red;
  border: red;
  font-weight: 600;
  border-radius: 25px;
  color: black;
}
</style>
