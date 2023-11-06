<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-right">
        <h2 class="text-center">Login</h2>
        <form @submit.prevent="logIn">
          <v-text-field
            v-model="email"
            label="Email Address"
            required
            outlined
            dense
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            outlined
            dense
            required
          ></v-text-field>

          <v-btn type="submit" class="mr-3">Submit</v-btn>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "@/plugins/axios";
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  data() {
    return {
      email: "user@user.com",
      password: "user",
    };
  },

  methods: {
    async logIn() {
      try {
        const formData = new FormData();
        formData.append("email", this.email);
        formData.append("password", this.password);

        const response = await axios.post("auth/login", formData);

        localStorage.setItem(
          "userData",
          JSON.stringify(response.data.userData)
        );
        localStorage.setItem("accessToken", response.data.accessToken);

        toast.success(response.data.message, {
          timeout: 2000,
        });
        this.$router.push('/create')
      } catch (error) {
        toast.warning(error.response?.data?.message || error.message, {
          timeout: 2000,
        });
      }
    },
  },
};
</script>

<style scoped>
form {
  max-width: 300px;
  margin: 0 auto;
}
</style>
