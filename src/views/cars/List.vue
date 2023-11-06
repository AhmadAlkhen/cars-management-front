<template>
  <div>
    <v-container class="mb-4">
      <h1 class="text-center">Cars List</h1>
      <div class="d-flex flex-row justify-end">
        <v-row>
          <!-- Pagination controls -->
          <v-col cols="4">
            <v-select
              v-model="perPage"
              :items="perPages"
              label="Items per page"
            ></v-select>
          </v-col>
        </v-row>
        <router-link to="/create">
          <v-btn class="mr-3" color="success">Add Car</v-btn>
        </router-link>
      </div>
    </v-container>
    <v-container class="mb-2">
      <v-row>
        <v-col cols="3" v-for="car in cars" :key="car.id">
          <v-card class="mx-auto">
            <v-img
              class="align-end text-white"
              height="200"
              src="@/assets/car.jpg"
              cover
            >
              <v-card-title>{{ car.make }} , {{ car.model }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pt-4">
              <b> Year:</b> {{ car.year }}
            </v-card-subtitle>

            <v-card-text>
              <div><b>VIN:</b> {{ car.vin }}</div>
              <div><b>Shipping Status:</b> {{ car.shipping_status }}</div>
            </v-card-text>
            <v-card-text>
              <div>
                <v-select
                  v-model="car.shipping_status"
                  :items="shippingStatusOptions"
                  label="Shipping Status"
                  outlined
                  dense
                  required
                ></v-select>
              </div>
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
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { mapState, mapActions } from "vuex";
import carImg from "@/assets/images/car.jpg";

const toast = useToast();
export default {
  computed: {
    ...mapState([
      "cars",
      "carsTotal",
      "perPage",
      "currentPage",
      "shippingStatusOptions",
      "perPages",
    ]),
    // perPages() {
    //   return [2, 5, 10];
    // },

    totalPages() {
      return Math.ceil(this.carsTotal / this.perPage);
    },
    perPage: {
      get() {
        return this.$store.state.perPage;
      },
      set(value) {
        this.$store.commit("SET_PER_PAGE", value);
      },
    },
    currentPage: {
      get() {
        return this.$store.state.currentPage;
      },
      set(value) {
        this.$store.commit("SET_CURRENT_PAGE", value);
      },
    },
  },
  mounted() {
    this.fetchCars().then(() => {
      this.cars.forEach((car) => {
        this.$watch(
          () => car.shipping_status,
          (newStatus, oldStatus) => {
            if (newStatus !== oldStatus) {
              this.updateShippingStatus(car);
              toast.success(`Shipping status updated to ${newStatus}`, {
                timeout: 2000,
              });
            }
          }
        );
      });
    });
  },
  methods: {
    ...mapActions(["fetchCars", "updateShippingStatus"]),

    updatePerPage(value) {
      this.perPage = value;
      this.fetchCars();
    },
    updateCurrentPage(value) {
      this.currentPage = value;
      this.fetchCars();
    },
  },
  watch: {
    perPage(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fetchCars();
      }
    },
    currentPage(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fetchCars();
      }
    },
  },
};
</script>
