<template>
  <div class="login-page container my-4">
    <h1 class="text-center">Login</h1>

    <b-form @submit="submitForToken">
      <b-form-group label="Username" label-for="username-field" label-cols-lg="2">
        <b-form-input id="username-field" v-model="username" type="text"></b-form-input>
      </b-form-group>

      <b-form-group label="Password" label-for="password-field" label-cols-lg="2">
        <b-form-input id="password-field" v-model="password" type="password"></b-form-input>
      </b-form-group>

      <div class="container d-flex justify-content-center">
        <button class="btn btn-primary mx-auto" type="submit">Login</button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import Axios from "axios"

export default {
  name: "Login",
  components: {},

  data: () => {
    return {
      backendHost: process.env.VUE_APP_BACKEND_HOST,
      username: "",
      password: "",
    }
  },

  methods: {
    ...mapActions(["getToken"]),

    async submitForToken(event) {
      event.preventDefault()

      const token = await this.getToken({ username: this.username, password: this.password })
      if (token) {
        Axios.defaults.headers.common["Authorization"] = `Token ${token}`
        localStorage.setItem("token", token)
        this.$router.push("app")
      } else {
        this.username = ""
        this.password = ""
      }
    },
  },
}
</script>
