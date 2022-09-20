<template>
  <div class="q-mx-lg">
    <div class="row justify-center q-mt-lg">
      <p class="text-left text-bold text-h3" style="display: block">Hola,</p>
    </div>
    <div class="row justify-center">
      <p class="text-left text-grey text-bold text-h6" style="display: block">
        Primero Debes Registrarte
      </p>
    </div>

    <q-separator color="dark" size="5px" inset />

    <div class="row justify-center text-left q-mt-lg">
      <p class="text-left text-bold text-h3" style="display: block">SEUS</p>
    </div>
    <div class="row justify-center text-start q-mb-lg">
      <p class="text-left text-grey text-bold text-h6" style="display: block">
        Sistema Electoral
        <q-icon name="inventory" class="q-pl-lg" />
      </p>
    </div>

    <div class="row justify-center q-my-lg">
      <img
        alt="minerva"
        src="~assets/minerva.png"
        style="width: 56px; height: 56px"
        class=""
      />
      <p class="text-left text-bold text-h8 q-mx-sm">
        Esta App es de uso exclusivo
        <span
          class="text-grey text-caption"
          style="display: block; width: 200px"
        >
          para los estudiantes de la Universidad de El Salvador
        </span>
      </p>
    </div>

    <div class="row justify-center">
      <q-btn
        rounded
        v-if="estadoTerminos === true"
        class="q-my-md glossy text-bold"
        @click="registrarseGoogle()"
      >
        <img
          alt="Google logo"
          src="~assets/google.ico"
          style="width: 32px; height: 32px; padding: 5px"
        />
        Registrarse con Google
      </q-btn>
      <p
        style="font-size: small; width: 190px"
        class="text-center text-red text-body"
        v-else
      >
        <q-icon name="warning" class="q-pr-sm" style="font-size: 18px" />¡Debes
        Aceptar los Términos y Condiciones para Registrarte!
      </p>
    </div>

    <div class="row justify-center">
      <q-checkbox
        v-model="estadoTerminos"
        label="Acepto Términos y Condiciones"
        class="text-grey text-bold text-italic q-mt-lg q-mb-lg"
      />
    </div>

    <div class="row justify-center">
      <p>
        ¿Ya tienes una cuenta?
        <a class="text-bold" href="#/login">Inicia Sesion.</a>
      </p>
    </div>

    <!-- loading spinner -->
    <q-inner-loading
      :showing="visible"
      size="70px"
      color="primary"
      label="Cargando ..."
      label-class="text-blue-10"
      label-style="font-size: 1.5em"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { LocalStorage } from "quasar";
import { db, auth, GoogleAuthProvider } from "src/boot/db";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "RegistroUsuario",

  data() {
    return {
      estadoTerminos: false,
      visible: true,
    };
  },
  computed: {
    ...mapGetters(["document_info_cel"]),
  },
  methods: {
    ...mapActions(["device_info"]),
    alertaCorreoNoValido() {
      this.$q.notify({
        position: "top-right",
        type: "negative",
        iconSize: "50px",
        classes: "text-h6 q-pa-lg",
        timeout: 9000,
        message:
          "¡Debe usar el correo institucional utilizado para clases de meet y que es el mismo utilizado para inscribir materias en el sistema de academica de la UES! (ejemplo: carnet@ues.edu.sv)",
      });
    },
    registrarseGoogle() {
      var provider = new GoogleAuthProvider();

      auth
        .signInWithRedirect(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          // console.error("ERROR:", errorMessage);
        });
    },
  },
  props: {},
  mounted() {
    auth.onAuthStateChanged((user) => {
      try {
        if (user) {
          var verificarCorreo = user.email.indexOf("@ues.edu.sv");
          //consulta de un documento
          var docRef = db.collection("alumnos").doc(user.uid);
          docRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                var carnet = user.email.substring(0, user.email.indexOf("@"));
                carnet = carnet.toUpperCase();
                LocalStorage.set("nombre_usuario", user.displayName);
                LocalStorage.set("correo_usuario", user.email);
                LocalStorage.set("url_imagen", user.photoURL);
                LocalStorage.set("carnet_usuario", carnet);
                LocalStorage.set("id_estudiante", user.uid);
                LocalStorage.set("usuarioAutenticado", '1');
                this.device_info();

                this.$router.push({
                  name: "PageHome",
                });
              } else if (verificarCorreo > -1) {
                // doc.data() will be undefined in this case
                //console.log("No such document!");
                //Para obtener el carnet
                var carnet = user.email.substring(0, user.email.indexOf("@"));
                carnet = carnet.toUpperCase();
                LocalStorage.set("nombre_usuario", user.displayName);
                LocalStorage.set("correo_usuario", user.email);
                LocalStorage.set("url_imagen", user.photoURL);
                LocalStorage.set("carnet_usuario", carnet);
                LocalStorage.set("id_estudiante", user.uid);
                LocalStorage.set("usuarioAutenticado", '1');
                //object alumno nuevo
                var alumno = {
                  carnet: carnet,
                  nombreCompleto: user.displayName,
                  telefono: "",
                  validacion1: false,
                  registro_votaciones: [],
                  dispositivo: {},
                };
                //Firestore coleccion alumnos
                db.collection("alumnos")
                  .doc(user.uid)
                  .set(alumno)
                  .then(console.log("se agrego alumno"))
                  .catch((error) => console.error(error));
                this.device_info();
                this.$router.push({
                  name: "PageHome",
                });
              } else {
                this.alertaCorreoNoValido();
                user.delete();
              }
            })
            .catch((error) => {
              console.log("Error getting document:", error);
            });
        } else {
          //console.log("No hay usuario");
          this.visible = false;
        }
      } catch (error) {
        console.log(error);
      }
    });
  },
  created() {
    this.device_info();
  },
});
</script>
