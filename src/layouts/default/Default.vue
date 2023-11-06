<template>
  <div>
    <v-container class="mb-4">
      <h1 class="red">Car List</h1>
      <v-row>
        <!-- Pagination controls -->
        <v-col cols="4">
          <v-select
            v-model="perPage"
            :items="perPages"
            label="Items per page"
            v-on:input="fetchCars()"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="mb-2">
      <v-row>
        <v-col cols="3" v-for="car in cars" :key="car.id">
          <v-card class="mx-auto">
            <v-img
              class="align-end text-white"
              height="200"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              cover
            >
              <v-card-title>{{ car.make }} , {{ car.model }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pt-4">
              Year: {{ car.year }}</v-card-subtitle
            >

            <v-card-text>
              <div>VIN: {{ car.vin }}</div>

              <div>Shipping Status: {{ car.shipping_status }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="mb-4">
      <v-row>
        <v-col cols="12" class="text-right">
          <v-pagination
            v-model="currentPage"
            :length="totalPages"
            @input="fetchCars"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      cars: [],
      carsTotal: "",
      perPage: 2,
      currentPage: 1,
    };
  },
  computed: {
    perPages() {
      return [2, 5, 10];
    },
    displayedCars() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.cars.slice(start, start + this.perPage);
    },
    totalPages() {
      return Math.ceil(this.carsTotal / this.perPage);
    },
  },
  mounted() {
    this.fetchCars();
  },
  methods: {
    async fetchCars() {
      try {
        console.log("Fetching");
        const response = await axios.get(
          "http://127.0.0.1:8000/api/cars/index",
          {
            params: {
              perPage: this.perPage,
              currentPage: this.currentPage,
            },
          }
        );
        this.cars = response.data.data.data;
        this.carsTotal = response.data.data.total;
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    },
  },

  watch: {
    perPage() {
      this.fetchCars();
    },
    currentPage() {
      this.fetchCars();
    },
  },
};
</script>
