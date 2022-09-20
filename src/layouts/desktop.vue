<template>
  <q-layout view="lHh Lpr lFf" class="desktop-only">
    <q-header class="bg-style">
      <q-toolbar>
        <q-btn flat dense round aria-label="Menu" @click="toggleLeftDrawer"
          ><q-img src="../assets/menu.svg"></q-img
        ></q-btn>
        <q-avatar>
          <img src="~assets/seusappLogo.png" />
        </q-avatar>
        <q-toolbar-title class="text-blue-grey-4 text-h5 text-weight-bold">
          Panel Administrativo
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="300"
      :breakpoint="400"
    >
      <q-list padding>
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
        <!-- Cerrar Sesion -->
        <q-item class="item" clickable tag="a" @click="salirGoogle">
          <q-item-section avatar>
            <q-icon class="item-icon" size="md" name="logout" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="item-title text-grey"
              >Cerrar Sesion</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { defineComponent, ref } from "vue";
import { auth } from "src/boot/db";
import { LocalStorage } from "quasar";

const linksList = [
  {
    title: "Inicio Panel Administrativo",

    icon: "apps",
    link: "/#/desktop",
  },
  {
    title: "Administrar Elecciones",
    icon: "how_to_vote",
    link: "#/desktop/admin",
  },
  {
    title: "Administrar Comite Electoral",

    icon: "manage_accounts",
    link: "#/desktop/padron",
  },
  {
    title: "Home",

    icon: "home",
    link: "/#/home",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },
  methods: {
    cambiarColor: function (id_get) {
      let id_item = id_get;

      if (id_item == "votar") {
        document.getElementById(id_item).style.color = "#699bf7";
      } else {
        document.getElementById("votar").style.color = "#ADADAD";
      }
    },

    salirGoogle: function () {
      auth
        .signOut()
        .then(() => {
          // Sign-out successful.
          //console.log("salir");
          setTimeout(() => {
            window.location = "#/";
          }, 1000);
        })
        .catch((error) => {
          // An error happened.
        });
    },
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

<style scope>
.bg-style {
  background-color: white;
}

.user {
  margin-top: 20px;
  margin-bottom: 30px;
}

.avatar-img {
  margin-left: 20px;
  border: 1px solid black;
}

.avatar-name {
  font-size: 2rem;
  font-weight: bold;
  margin-top: 5%;
  margin-left: 10px;
}

.footer-size {
  max-height: 70px;
  padding-bottom: 10px;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  margin-left: 0px;
  border-radius: 0px;
  background-color: white;
}

.item-menu {
  width: 100%;
  margin-right: 30px;
  font-weight: bold;
  margin-top: -5px;
}

.item-menu:active {
  background-color: transparent;
}

.btn-style {
  color: black;
  font-weight: bold;
}

.item {
  margin-bottom: 10px;
}

.item:hover {
  background-color: rgba(105, 155, 247, 0.1);
}

.item-icon {
  font-size: 2.5em;
  color: #699bf7;
}

.item-title {
  margin-top: 5px;
  font-size: 1rem;
  font-weight: bold;
}

.user-img {
  border-radius: 100%;
  width: 30px;
  position: absolute;
  right: 10px;
}
</style>
