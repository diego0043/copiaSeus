import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import store from "../store"
import { LocalStorage } from "quasar";



/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {

  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  Router.beforeEach((to, from, next) => {

    let autorizacion = to.matched.some(record => record.meta.protegida);
    let verificacion1 = to.matched.some(record => record.meta.verificacion1);
    let value = localStorage.getItem("usuarioAutenticado")
    let validacion1 = LocalStorage.getItem("validacion1")

    if (value === null) {
      LocalStorage.set('usuarioAutenticado', "0");
      value = localStorage.getItem("usuarioAutenticado").split('|');
    } else {
      value = value.split('|')
    }

    //validacion del dispositivo
    if (validacion1 === null) {
      LocalStorage.set("validacion1", false)
      validacion1 = LocalStorage.getItem("validacion1")
    } else {
      validacion1 = LocalStorage.getItem("validacion1")
    }

    if (autorizacion && verificacion1) {
      if (value[1] !== '0' && validacion1) {
        next()
      } else {
        next("/home")
      }
    } else if (autorizacion) {
      if (value[1] !== '0') {
        next()
      } else {
        next("/")
      }
    }
    else {
      next()
    }
  })

  return Router;
});
