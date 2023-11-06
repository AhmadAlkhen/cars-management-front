<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-right">
        <h2 class="text-center">Add a new car</h2>
        <h4 class="text-center mt-2 note" v-if="!isLoggedIn">
          You should Login before add a car
          <router-link to="/login"> Login </router-link>
        </h4>
        <h4 class="text-center mt-2" v-else>
          Welcome , You are already logged in
        </h4>

        <form @submit.prevent="storeCar">
          <v-text-field
            v-model="make"
            label="Make"
            required
            outlined
            dense
          ></v-text-field>

          <v-text-field
            v-model="model"
            label="Model"
            outlined
            dense
            required
          ></v-text-field>

          <v-text-field
            v-model="year"
            label="Year"
            type="number"
            outlined
            dense
            required
          ></v-text-field>

          <v-text-field
            v-model="vin"
            label="VIN"
            outlined
            dense
            required
          ></v-text-field>

          <v-select
            v-model="shipping_status"
            :items="shippingStatusOptions"
            label="Shipping Status"
            outlined
            dense
            required
          ></v-select>
          <v-select
            v-model="status"
            :items="statusOptions"
            label="Status"
            item-title="name"
            item-value="val"
            outlined
            dense
            required
          ></v-select>

          <v-btn type="submit" class="mr-3">Submit</v-btn>
          <v-btn @click="clear" class="mr-3">Clear</v-btn>
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
  computed: {
    isLoggedIn() {
      const token = localStorage.getItem("accessToken");
      if (token) {
        return true;
      } else {
        return false;
      }
    },
  },

  data() {
    return {
      make: "",
      model: "",
      year: null,
      vin: "",
      status: "",
      shipping_status: "",
      statusOptions: [
        { name: "Active", val: 1 },
        { name: "Not active", val: 0 },
      ],
      shippingStatusOptions: ["Pending", "In Transit", "Delivered"],
    };
  },

  methods: {
    async storeCar() {
      try {
        const formData = new FormData();
        formData.append("make", this.make);
        formData.append("model", this.model);
        formData.append("year", this.year);
        formData.append("vin", this.vin);
        formData.append("status", this.status);
        formData.append("shipping_status", this.shipping_status);

        // axios.defaults.headers.common["Authorization"] = accessToken
        //   ? `Bearer ${accessToken}`
        //   : "";
        // const accessToken = localStorage.getItem("accessToken");
        // console.log(accessToken);

        // axios.defaults.headers.common["Authorization"] = accessToken
        //   ? `Bearer ${accessToken}`
        //   : "";
        const response = await axios.post("cars/store", formData);

        console.log("Car added successfully");
        toast.success(response.data.message, {
          timeout: 2000,
        });
        this.clear();
      } catch (error) {
        console.error("Error creating car:", error);
        toast.warning(error.response?.data?.message || error.message, {
          timeout: 2000,
        });
      }
    },

    clear() {
      // Clear form fields
      this.make = "";
      this.model = "";
      this.year = null;
      this.vin = "";
      this.status = "";
      this.shipping_status = "";
    },
  },
};
</script>

<style scoped>
form {
  max-width: 300px;
  margin: 0 auto;
}
.note {
  color: #ff2c2c;
}
</style>
