import store from "../store"

const routes = [
  {
    path: "/home",
    component: () => import("layouts/principal.vue"),
    children: [
      {
        path: "/home",
        name: "PageHome",
        component: () => import("pages/Home.vue"),
        meta: { protegida: true }
      },
      {
        path: "/home/comovotar",
        component: () => import("pages/ComoVotar.vue"),
        meta: { protegida: true }
      },
      {
        path: "/home/resultado",
        component: () => import("pages/Resultado.vue"),
        meta: { protegida: true, verificacion1: true }
      },
      {
        path: "/home/votar",
        name: "votaciones",
        component: () => import("pages/Votar.vue"),
        meta: { protegida: true, verificacion1: true }
      },
      {
        path: "/home/votacionActiva",
        name: "eleccionVoto",
        component: () => import("pages/EleccionVoto.vue"),
        meta: { protegida: true, verificacion1: true }
      },
      {
        path: "/home/detalleMiVoto",
        name: "detalle",
        component: () => import("src/pages/DetalleMiVoto.vue"),
        meta: { protegida: true, verificacion1: true }
      },
    ],
  },
  {
    path: "/desktop",
    component: () => import("layouts/desktop.vue"),
    children: [
      {
        path: "/desktop",
        name: "PageDesktop",
        component: () => import("pages/Desktop.vue"),
        meta: { protegida: true }
      },
      { path: "/desktop/admin", name: "adminElecciones", component: () => import("pages/admin.vue"), meta: { protegida: true } },
      {
        path: "/desktop/administracionCandidatos/:id",
        name: "admincandidatos",
        component: () => import("src/pages/AdministracionCandidatos.vue"),
        meta: { protegida: true }
      },
      {
        path: "/desktop/editarEleccion/:id",
        name: "editareleccion",
        component: () => import("src/pages/EditarEleccion.vue"),
        meta: { protegida: true }
      },
      {
        path: "/desktop/verEleccion/:id",
        name: "vereleccion",
        component: () => import("src/pages/VerEleccion.vue"),
        meta: { protegida: true }
      },
      {
        path: "/desktop/padron",
        name: "padron"
        , component: () => import("pages/padron.vue"),
        meta: { protegida: true }
      },
      {
        path: "/desktop/padronNuevo",
        name: "nuevoRegistro",
        component: () => import("pages/padronNuevo.vue"),
        meta: { protegida: true }
      },
    ],
  },
  {
    path: "/blockchain",
    component: () => import("layouts/blockchain.vue"),
    children: [
      { path: "index", name: "blockchain", component: () => import("pages/indexBlockchain.vue"), meta: { protegida: true } },
      {
        path: "/blockchain/blocks",
        component: () => import("pages/blocks.vue"),
        meta: { protegida: true }
      },
      { path: "/blockchain/block", component: () => import("pages/hash.vue"), meta: { protegida: true } },
      {
        path: "/blockchain/about",
        component: () => import("pages/aboutBlockchain.vue"),
        meta: { protegida: true }
      },
    ],
  },

  {
    path: "/",
    component: () => import("layouts/login.vue"),
    children: [
      { path: "", component: () => import("pages/Registrarse.vue"), meta: { protegida: false } },
      { path: "/login", component: () => import("pages/Index.vue"), },
      { path: "/registro", component: () => import("pages/PageRegistroUsuario.vue"), },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it.

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];


export default routes;
