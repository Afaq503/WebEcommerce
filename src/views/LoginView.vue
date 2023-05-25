<template>
  <v-app>
    <div class="background"></div>
    <v-main class="d-flex justify-center align-center">
      <v-col cols="10" lg="4" class="mx-auto">
        <v-card class="pa-4">
          <div class="text-center">
            <v-avatar size="100" color="blue-lighten-4">
              <v-icon size="40" color="blue">mdi-account</v-icon>
            </v-avatar>
            <v-toolbar-title class="v-toolbar__title">
              Web E Comm.. Login
            </v-toolbar-title>
          </div>
          <v-form ref="form" @submit.prevent="validate">
            <v-card-text>
              <v-text-field
                v-model="email"
                required
                color="blue"
                type="email"
                label="Email"
                placeholder="Email"
                hint="Enter your email to access this website"
                prepend-inner-icon="mdi-account" />
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                required
                color="blue"
                :type="passwordShow ? 'text' : 'password'"
                label="Password"
                placeholder="Password"
                prepend-inner-icon="mdi-key"
                hint="Enter your password to access this website"
                :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="passwordShow = !passwordShow" />
              <v-switch required label="Remember me" color="blue"></v-switch>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                :loading="loading"
                type="submit"
                color="blue-darken-4"
                variant="flat">
                <span class="text-white px-8">Login</span>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-main>
    <v-snackbar location="top" v-model="snackbar" color="green">
      {{ text }}
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      valid: true,
      loading: false,
      snackbar: false,
      passwordShow: false,
      password: "",
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 6) || "Password must be at least 6 characters",
      ],
      email: "",
      // emailRules: [
      // (v) => !!v || "Email is required",
      // (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      // ],
      text: "",
    };
  },
  methods: {
    async validate() {
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          this.loading = true;
          fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: this.email,
              password: this.password,
            }),
          })
            .then((res) => {
              if (res.ok) {
                console.log(res);
                return res.json();
              } else {
                throw new Error("Login failed. Please try again jamil.");
              }
            })
            .then((data) => {
              const token = data.token;
              localStorage.setItem("token", token);
              this.$router.push({ name: "Dashborad" });
            })
            .catch((error) => {
              console.log(error);
              this.snackbar = true;
              this.text = "Login failed. Please try again.";
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
  },
  mounted() {
    const token = localStorage.getItem("token");
    if (token) {
      this.$router.push({ name: "Dashborad" });
    }
  },
};
</script>

<style>
.background {
  height: 300px;
  width: 100%;
  display: block;
  position: absolute;
  top: 0;
  background-size: cover;
}
</style>
