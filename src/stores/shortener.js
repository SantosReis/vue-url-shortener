import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();
const API_URL = import.meta.env.VITE_API_URL;

export const useShortenerStore = defineStore("shortener", {
  state: () => ({
    shorternerList: [],
  }),
  getters: {
    shorterners: (state) => state.shorternerList,
  },
  actions: {
    async getShortener() {
      const data = await axios.get(API_URL + `/api/shortener-list`);
      this.shorternerList = data.data;
    },
    async handleShorternersSubmitted(shortenerData) {
      const currentList = this.shorternerList;

      axios
        .post(API_URL + "/api/shortener", {
          url: shortenerData.url,
        })
        .then(function (response) {
          if (!response.data.generated) {
            toast.error("Shortener already exists!");
            return false;
          }

          currentList.push({
            short: response.data.short_url,
            long: response.data.long_url,
          });
          toast.success("Shortener added");
        })
        .catch(function (error) {
          console.log(`handleShorternersSubmitted error`, error);
          // TODO sanatize errors in a better way
          if (error.response.data.errors.url[0]) {
            toast.error(error.response.data.errors.url[0]);
          }
        });
    },
    handleShorternerDeleted(id) {
      this.shorternerList = this.shorternerList.filter(
        (shorterner) => shorterner.id !== id
      );
      toast.success("Shortener deleted");
    },
    copyLink(url) {
      console.log(url);
      navigator.clipboard.writeText(url);
      toast.success("Copied!");
    },
  },
});
