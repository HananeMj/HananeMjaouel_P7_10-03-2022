<template>
  <div class="container bootstrap snippets bootdey">
    <div class="row">
      <div class="col-sm-6 col-md-4 col-md-offset-4">
        <h1 class="text-center login-title">Se connecter</h1>
        <div class="account-wall">
          <img
            class="profile-img"
            src="https://bootdey.com/img/Content/avatar/avatar7.png"
            alt=""
          />
          <form @submit.prevent="handleSubmit()" class="form-signin">
            <input
              v-model="email"
              type="text"
              class="form-control"
              placeholder="Email"
              required
              autofocus
            />
            <input
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Mot de passe"
              required
            />
            <button class="btn btn-lg btn-primary btn-block">Connexion</button>
            <!--<label class="checkbox pull-left">
              <input type="checkbox" value="remember-me" />
              Remember me
            </label>
            <a href="#" class="pull-right need-help">Need help? </a
            ><span class="clearfix"></span>-->
          </form>
        </div>
        <router-link to="/register" class="text-center new-account"
          >Créer un compte
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleSubmit() {
      if (this.email == "" || this.password == "") {
        alert("Veuillez entrer vos identifiants !");
      } else {
        axios
          .post("http://localhost:5000/api/user/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            let resToken = response.data.token;
            let resUser = response.data.userId;
            localStorage.setItem("token", resToken);
            localStorage.setItem("user", JSON.stringify(resUser));
            this.$router.push("/feed");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
<style scoped>
body {
  margin-top: 20px;

  background: #ddd;
}
.form-signin {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  font-size: 16px;
  height: auto;
  padding: 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="text"] {
  margin-bottom: -1px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.account-wall {
  margin-top: 20px;
  padding: 40px 0px 20px 0px;
  background-color: #f7f7f7;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.login-title {
  color: #555;
  font-size: 18px;
  font-weight: 400;
  display: block;
}
.profile-img {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
.need-help {
  margin-top: 10px;
}
.new-account {
  display: block;
  margin-top: 10px;
}
</style>
