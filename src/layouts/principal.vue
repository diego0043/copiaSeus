<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-style">
      <q-toolbar>
        <q-btn flat dense round aria-label="Menu" @click="toggleLeftDrawer"
          ><q-img src="../assets/menu.svg"></q-img
        ></q-btn>

        <q-img class="user-img" :src="fotoURL"></q-img>

        <q-toolbar-title> </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen">
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

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-item class="item" to="desktop" exact v-if="isAdmin">
          <q-item-section avatar>
            <q-icon class="item-icon" size="md" name="admin_panel_settings" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="item-title text-grey"
              >Administracion</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="text-white footer-size shadow-1">
      <div>
        <div class="q-gutter-y-md">
          <q-tabs
            indicator-color="transparent"
            active-color="primary"
            dense
            class="text-grey"
          >
            <div class="row">
              <div class="col q-ml-sm">
                <q-route-tab
                  v-on:click="cambiarColor('home')"
                  id="home"
                  to="/home"
                  exact
                  class="item-menu"
                >
                  <q-icon name="home" size="2.7em" />
                  <span>INICIO</span>
                </q-route-tab>
              </div>
              <div class="col">
                <q-route-tab
                  :disable="!isValidate"
                  v-on:click="cambiarColor('votar')"
                  id="votar"
                  to="/home/votar"
                  exact
                  class="item-menu"
                >
                  <q-icon name="how_to_vote" size="2.7em" />
                  <span>VOTAR</span>
                </q-route-tab>
              </div>
              <div class="col item-menu">
                <q-route-tab
                  :disable="!isValidate"
                  v-on:click="cambiarColor('results')"
                  id="results"
                  to="/home/resultado"
                  exact
                  class="item-menu"
                >
                  <q-icon name="query_stats" size="2.7em" />
                  <span>RESULTADOS</span>
                </q-route-tab>
              </div>
            </div>
          </q-tabs>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { auth, db } from "src/boot/db";
import { LocalStorage } from "quasar";
import { mapGetters } from "vuex";

const linksList = [
  // {
  //   title: "Cerrar Sesion",
  //   icon: "logout",
  //   link: "#",
  // },
  {
    title: "Acerca de",
    icon: "code",
    link: "https://github.com/diseno2022/seus",
  },
  {
    title: "¿Como votar?",
    icon: "info",
    link: "#/home/comovotar",
  },
  {
    title: "Contacto",
    icon: "record_voice_over",
    link: "mailto:ernesto.calderon@ues.edu.sv",
  } /*
  {
    title: "Administracion",
    icon: "admin_panel_settings",
    link: "#/desktop",
  },*/,
];

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },
  data() {
    return {
      isAdmin: false,
      comiteElectoral: null,
    };
  },

  computed: {
    ...mapGetters(["isValidate"]),
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
            LocalStorage.set("usuarioAutenticado", "0");
            window.location = "#/";
          }, 1000);
        })
        .catch((error) => {
          // An error happened.
        });
    },
    async getComiteElectoral() {
      this.comiteElectoral = [];
      try {
        const query = await db
          .collection("comiteelectoral")
          .where("correo", "==", this.correoUsuario)
          .get();
        query.forEach((element) => {
          let admin = {
            id: element.id,
            correo: element.data().correo,
            nombre: element.data().nombre,
          };
          this.comiteElectoral = admin;
        });
      } catch (error) {
        console.error(error);
      }

      if (this.comiteElectoral.correo == this.correoUsuario) {
        this.isAdmin = true;
      }
    },
  },

  setup() {
    const leftDrawerOpen = ref(false);
    return {
      fotoURL: "",
      nombreUsuario: "",
      correoUsuario: "",
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
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

        this.getComiteElectoral();
      } else {
        this.fotoURL =
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fpeople-happy-face-man-with-glasses-icon-vector-id650836204%3Fk%3D6%26m%3D650836204%26s%3D170667a%26w%3D0%26h%3DtdnMNumVvPXnjylQpAhcgmusHh6QdqTagUgFrmzYMuo%3D&f=1&nofb=1";
        this.nombreUsuario = "Tommy";
      }
    });
  },
  created() {},
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
