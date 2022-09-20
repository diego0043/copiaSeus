<template>
  <VistaUsuarioVerificado v-if="showComponent === 1" />
  <div
    v-if="showComponent === 0"
    class="q-pa-md q-gutter-sm w-100 j"
    style="width: 600px"
  >
    <div class="q-pa-md row items-start">
      <q-card class="my-card" flat bordered>
        <q-toolbar class="justify-between">
          <q-avatar v-if="!showAccess">
            <i class="fas fa-ban" style="color: red"></i>
          </q-avatar>

          <q-item-label style="color: red" v-if="!showAccess">
            Primera verificación pendiente
          </q-item-label>

          <q-avatar v-if="showAccess">
            <i class="fas fa-check-circle" style="color: green"></i>
          </q-avatar>

          <q-item-label v-if="showAccess" style="color: green">
            Primera verificación exitosa
          </q-item-label>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section horizontal>
          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" :src="fotoURL" />
          </q-card-section>

          <q-card-section class="q-pt-xs">
            <div class="text-overline">Solo un paso más!</div>

            <div class="text-h7 q-mt-sm q-mb-xs">{{ nombreUsuario }}</div>
            <div class="text-caption text-grey">
              {{ correoUsuario }}
            </div>
          </q-card-section>
        </q-card-section>

        <q-card-section class="q-pt-xs">
          <div class="text-h7 q-mt-sm q-mb-xs">Verificación</div>
          <div class="" id="idRegistrarDispositivo" v-if="smsSent === false">
            <!-- <form @submit.prevent="submit"> -->
            <div class="text-overline">Telefono</div>
            <div>
              <label
                for="phonenumber"
                style="font:family:system-ui;font-size: x-large;"
              ></label>
            </div>
            <div>
              <q-input
                :autofocus="false"
                bottom-slots
                filled
                type="tel"
                id="phonenumber"
                maxlength="12"
                mask="+503###########"
                required
                v-model="phoneNumber"
                placeholder="Introduce +503 mas el numero de celular"
                title="Introduce el numero de celular mas el codigo"
                lazy-rules
                :rules="[
                  (val) => val.length > 0 || '¡Introduzca un numero, porfavor!',
                  (val) => val.length == 12 || '¡Numero no válido!',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="phone" />
                </template>
                <template v-slot:append>
                  <q-icon
                    name="close"
                    @click="phoneNumber = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>

            <div
              id="recaptcha-container"
              style="background-color: #1b1a1a; width: 300px; margin: auto"
            ></div>

            <div class="flex flex-left q-py-md">
              <q-btn
                rounded
                color="primary"
                class="btn btn-primary"
                id="log-in"
                type="submit"
                @click="submit"
              >
                Registrar Dispositivo
              </q-btn>
            </div>
            <!-- </form> -->
          </div>

          <!--    <div id="idValidarCodigo" v-if="smsSent === true">
            <div class="text-overline">Ingrese el código enviado por SMS</div>

            <div>
              <q-input
                :autofocus="true"
                filled
                bottom-slots
                type="text"
                id="otpField"
                style="text-align: center"
                pattern="[0-9]{6}"
                maxlength="6"
                v-model="otpnum"
                placeholder="Ingrese el codigo"
                required
                :rules="[
                  (val) => val.length > 0 || '¡Introduzca el código, porfavor!',
                  (val) => val.length == 6 || '¡Código no válido!',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="vpn_key" />
                </template>
                <template v-slot:append>
                  <q-icon
                    name="close"
                    @click="text = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>

            <div>
              <q-btn
                flat
                color="primary"
                class="btn btn-primary"
                @click="verifyCode"
                id="otp-btn"
              >
                VALIDAR CODIGO
              </q-btn>
            </div>
          </div> -->
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <div class="text-caption text-primary text-center q-mt-sm q-mb-xs">
            <q-icon name="info" />
            ¡Recuerde que una vez válidado su dispositivo, solo podrá votar en
            ese!
          </div>
          <div
            class="q-mt-sm q-mb-xs text-primary text-center q-mt-md q-mb-md"
            style="font-size: 1.3em"
          >
            Datos del dispositivo
          </div>
          <div>
            <!-- identificador unico -->
            <div class="container q-mb-md">
              <div class="row text-primary">IDENTIFICADOR UNICO:</div>
              <div class="row text-caption text-grey q-mt-sm">
                <q-icon style="font-size: 32px" name="key"></q-icon>
                <span style="margin-top: 10px; margin-left: 10px">{{
                  document_info_cel.identificador_unico
                }}</span>
              </div>
            </div>

            <!-- modelo -->
            <div class="container q-mb-md">
              <div class="row text-primary">MODELO:</div>
              <div class="row text-caption text-grey q-mt-sm">
                <q-icon style="font-size: 32px" name="phone_iphone"></q-icon>
                <span style="margin-top: 10px; margin-left: 10px">{{
                  document_info_cel.modelo
                }}</span>
              </div>
            </div>

            <!-- manufacturo por: -->
            <div class="container q-mb-md">
              <div class="row text-primary">MANUFACTURADO POR:</div>
              <div class="row text-caption text-grey q-mt-sm">
                <q-icon
                  style="font-size: 32px"
                  name="precision_manufacturing
"
                ></q-icon>
                <span style="margin-top: 10px; margin-left: 10px">{{
                  document_info_cel.manufacturacion_by
                }}</span>
              </div>
            </div>

            <!-- sistema operativo: -->
            <div class="container">
              <div class="row text-primary">SISTEMA OPERATIVO:</div>
              <div class="row text-caption text-grey q-mt-sm">
                <q-icon style="font-size: 32px" name="android"></q-icon>
                <span style="margin-top: 10px; margin-left: 10px">{{
                  document_info_cel.sistema_operativo
                }}</span>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <q-inner-loading
      :showing="visible"
      label="Validando Dispositivo..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
  </div>
</template>

<script>
import firebase, { firestore } from "firebase";
import { LocalStorage } from "quasar";
import { db } from "src/boot/db";
import { ref } from "vue";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import VistaUsuarioVerificado from "./VistaUsuarioVerificado.vue";
export default {
  name: "login",
  components: {
    VistaUsuarioVerificado,
  },
  computed: {
    ...mapGetters([
      "document_info_cel",
      "uidStutent",
      "isValidate",
      "phonenumber",
    ]),
  },
  async created() {
    this.device_info();
    const doc = await db.collection("alumnos").doc(this.uidStutent).get();
    const docRef = doc.data();
    const validado = docRef.validacion1;
    if (validado) {
      this.showComponent = 1;
      LocalStorage.set("validacion1", validado);
    } else {
      LocalStorage.set("validacion1", validado);
      this.showComponent = 0;
      this.device_info();
      this.Geolocation();
    }
  },
  data() {
    return {
      fotoURL: "",
      nombreUsuario: "",
      correoUsuario: "",
      phoneNumber: "",
      confirmationResult: null,
      otpnum: "",
      recaptchaVerifier: null,
      recaptchaWidgetId: null,
      confirmResult: null,
      smsSent: false,
      toolbar: ref(false),
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      text: ref(""),
      showValidate: ref(false),
      showAccess: false,
      visible: ref(false),
      showComponent: 3,
      gps: null,
    };
  },
  mounted() {
    /*   firebase.auth().useDeviceLanguage();
                this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("log-in", {
                  size: "invisible",
                  callback: (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    console.log(response);
                  },
                }); */
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //ENVIAR NUMERO A LA BASE DE DATOS
        // var telefono = {
        //   telefono: this.phoneNumber,
        //   validacion1: true,
        // };
        // db.collection("alumnos")
        //   .doc("M8nL5mn9iQMJdVUCye0n5M4kJfb2") //AVERIGUAR COMO OBTENER EL ID
        //   .update(telefono);
        //
        const nameUser = LocalStorage.getItem("nombre_usuario");
        const firtsName = nameUser.split(" ");
        this.fotoURL = user.photoURL;
        this.correoUsuario = user.email;
        this.nombreUsuario = user.displayName;
        var docRef = db.collection("alumnos").doc(user.uid);
        docRef.get().then((doc) => {
          if (doc.exists) {
            //console.log("aqui");
            this.showAccess = doc.data().validacion1;
          } else {
            this.showAccess = false;
          }
        });
        //FIN PRUEBAS
        // INICIO CODIGO BUENO
        //console.log(this.document_info_cel.nombre_usuario);
      } else {
        this.fotoURL =
          "https://external-content.duckduckgo.com/iu/?u=https://i.pinimg.com/736x/6c/50/fe/6c50fedcbd921cb0990e1abdc9c971d7.jpg&f=1&nofb=1";
        this.nombreUsuario =
          "Bienvenido companero estudiante de la UES Institución en nuestro país eminentemente académica, rectora de la educación superior, formadora de profesionales con alores éticos firmes, garante del desarrollo, de la ciencia, el arte, la cultura y el deporte.";
      }
    });
  },

  methods: {
    ...mapActions(["device_info"]),
    Geolocation() {
      let this2 = this;
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          this2.gps = [position.coords.latitude, position.coords.longitude];
          //LocalStorage.set("gps-dispositivo", gps);
          //console.log(this2.gps)
        });
      } else {
        this.gps = null;
        //LocalStorage.set("gps-dispositivo", []);
        this.$q.notify({
          message: "La localización NO esta disponible",
          icon: "error",
          color: "negative",
        });
      }
    },
    alertaGps() {
      this.$q.notify({
        position: "top-right",
        type: "negative",
        iconSize: "50px",
        classes: "text-h6 q-pa-lg",
        timeout: 2000,
        message: "Error GPS no activado",
      });
    },

    submit() {
      if (this.phoneNumber.length == 12 && this.gps) {
        var telefono = {
          telefono: this.phoneNumber,
          validacion1: true,
          dispositivo: {
            id: this.document_info_cel.identificador_unico,
            model: this.document_info_cel.modelo,
            manufacturer: this.document_info_cel.manufacturacion_by,
            operatingSystem: this.document_info_cel.sistema_operativo,
            gps: this.gps,
          },
        };
        db.collection("alumnos")
          .doc(LocalStorage.getItem("id_estudiante")) //
          .update(telefono)
          .then(() => {
            this.$q.notify({
              progress: true,
              message:
                "Haz completado el registro y verificacion correctamente, ahora ya puedes votar desde este dispositivo",
              color: "positive",
              avatar: this.fotoURL,
              actions: [
                {
                  label: "Votar!",
                  color: "white",
                  handler: () => {
                    window.location = "#/home/votar";
                  },
                },
              ],
            });
            this.showAccess = true;
            LocalStorage.set("validacion1", true);

            setTimeout(() => {
              window.location = "#/home/votar";
            }, 3500);
          })
          .catch((error) => {
            console.log("No se verifico el dispositivo ", error.message);
          });

        //window.location = "#/home/votar";
      } else if (!this.gps) {
        this.alertaGps();
      } else {
      }
      //this.smsSent = false;
      /*    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
                          "recaptcha-container"
                        );
                        this.recaptchaVerifier.render().then((widgetId) => {
                          this.recaptchaWidgetId = widgetId;
                        });

                        var number = this.phoneNumber;
                        firebase
                          .auth()
                          .signInWithPhoneNumber(number, this.recaptchaVerifier)
                          .then((confirmationResult) => {
                            this.confirmResult = confirmationResult;
                            console.log(this.confirmResult);
                            alert("Sms enviado");
                            this.smsSent = true;
                          })
                          .catch((error) => {
                            console.log("Sms no enviado", error.message);
                          }); */
    },
    /*    verifyCode() {
                  this.confirmResult
                    .confirm(this.otpnum)
                    .then((result) => {
                      alert("Registro exitoso", result);
                      //ENVIAR NUMERO A LA BASE DE DATOS
                      if (this.phoneNumber.length == 12) {
                        var telefono = {
                          telefono: this.phoneNumber,
                          validacion1: true,
                        };

                        db.collection("alumnos")
                          .doc(LocalStorage.getItem("id_estudiante")) //
                          .update(telefono);
                      }
                      this.smsSent = false;
                      window.location = "#/home/votar";
                      //this.gotonext();
                      var user = result.user;
                      console.log(user);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }, */
  },
};
</script>
<style>
.my-card {
  width: 100%;
}

.btn-registrar {
  border: 1px solid #3a89d933;
}

.contenedor {
  margin-right: auto;
  margin-left: auto;
  width: 90%;
}
</style>
