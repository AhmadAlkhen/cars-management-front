import { createStore } from "vuex";
import axios from "@/plugins/axios";
export default createStore({
  state: {
    cars: [],
    carsTotal: 0,
    perPage: 2,
    currentPage: 1,
    shippingStatusOptions: ["Pending", "In Transit", "Delivered"],
    perPages: [2, 5, 10],
  },
  actions: {
    async fetchCars({ commit, state }) {
      try {
        const response = await axios.get("cars/index", {
          params: {
            perPage: state.perPage,
            currentPage: state.currentPage,
          },
        });
        commit("SET_CARS", response.data.data.data);
        commit("SET_CARS_TOTAL", response.data.data.total);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    },
    async updateShippingStatus({ commit }, car) {
      try {
        const response = await axios.put(`cars/update/${car.id}`, {
          shipping_status: car.shipping_status,
        });
        console.log("Shipping status updated:", response.data);
      } catch (error) {
        console.error("Error updating shipping status:", error);
      }
    },
  },
  mutations: {
    SET_CARS(state, cars) {
      state.cars = cars;
    },
    SET_CARS_TOTAL(state, total) {
      state.carsTotal = total;
    },
    SET_PER_PAGE(state, perPage) {
      state.perPage = perPage;
    },
    SET_CURRENT_PAGE(state, currentPage) {
      state.currentPage = currentPage;
    },
  },
});
