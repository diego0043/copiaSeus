<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-style">
      <q-toolbar>
        <q-btn flat dense round aria-label="Menu" @click="toggleLeftDrawer"
          ><q-img src="../assets/menu.svg"></q-img
        ></q-btn>
        <q-avatar>
          <img src="~assets/seusappLogo.png" />
        </q-avatar>
        <q-toolbar-title class="text-blue-grey-4 text-h5 text-weight-bold">
          Blockchain
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <div class="row user">
          <div class="col-4">
            <q-avatar size="70px" class="avatar-img">
              <img :src="fotoURL" />
            </q-avatar>
          </div>
          <div class="col avatar-name">
            <q-item-label class="text-grey">
              {{ nombreUsuario }}
            </q-item-label>
            <q-item-label class="text-overline text-grey">
              {{ correoUsuario }}
            </q-item-label>
          </div>
        </div>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { auth } from "src/boot/db";
import { LocalStorage } from "quasar";

const linksList = [
  {
    title: "Inicio",

    icon: "home",
    link: "#/blockchain/index",
  },
  {
    title: "Ir a resultados",

    icon: "insert_chart",
    link: "#/home/resultado",
  },
  {
    title: "Bloques",

    icon: "widgets",
    link: "#/blockchain/blocks",
  },
  {
    title: "Acerca de",

    icon: "support_agent",
    link: "#/blockchain/about",
  },
];

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      fotoURL: "",
      nombreUsuario: "",
      correoUsuario: "",
    };
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const nameUser = LocalStorage.getItem("nombre_usuario");
        const firtsName = nameUser.split(" ");
        this.fotoURL = user.photoURL;
        this.correoUsuario = user.email;
        this.nombreUsuario = firtsName[0];
      } else {
        this.fotoURL =
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fpeople-happy-face-man-with-glasses-icon-vector-id650836204%3Fk%3D6%26m%3D650836204%26s%3D170667a%26w%3D0%26h%3DtdnMNumVvPXnjylQpAhcgmusHh6QdqTagUgFrmzYMuo%3D&f=1&nofb=1";
        this.nombreUsuario = "Tommy";
      }
    });
  },
});
</script>
