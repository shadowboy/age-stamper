import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");


// if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
//   window.document.addEventListener('touchmove', (e: any) => {
//     if (e.scale !== 1) {
//       e.preventDefault();
//     }
//   }, { passive: false });
// }