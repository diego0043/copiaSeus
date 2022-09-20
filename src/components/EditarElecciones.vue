<template>
  <div class="q-pa-md">
    <h4 align="center" class="flex flex-center">
      Editar {{ eleccion.titulo }}
    </h4>
    <q-page-sticky position="top-right" :offset="[18, 18]">
      <q-btn
        push
        round
        color="primary"
        icon="arrow_back_ios_new"
        @click="$router.push({ path: '/desktop/admin' })"
      />
    </q-page-sticky>
  </div>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="row" justify-center>
          <div class="col" style="margin-top: 20px">
            <div class="text-subtitle1">Nombre de Elección</div>
          </div>
          <div class="col">
            <q-input
              outlined
              v-model="eleccion.nombre"
              color="green"
              label="Escriba un nuevo nombre"
              counter
              maxlength="50"
              :rules="txtRules"
              required
            >
              <template v-slot:hint> Maximo 50 letras. </template>
            </q-input>
          </div>
        </div>

        <div class="row" justify-center>
          <div class="col" style="margin-top: 20px">
            <div class="text-subtitle1">Fecha de habilitación</div>
          </div>
          <div class="col">
            <q-input
              v-model="eleccion.fechaDesde"
              color="green"
              outlined
              label="Seleccione una fecha desde el calendario"
              mask="date"
              :rules="['date']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer" color="green">
                  <q-popup-proxy
                    ref="qDateProxy"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="eleccion.fechaDesde" color="green">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="green" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template v-slot:hint>Formato año/mes/día</template>
            </q-input>
          </div>
        </div>

        <div class="row" justify-center>
          <div class="col" style="margin-top: 20px">
            <div class="text-subtitle1">Hora de Inicio</div>
          </div>
          <div class="col">
            <q-input
              color="green"
              outlined
              label="Seleccione una hora desde el reloj"
              v-model="eleccion.fechaDesde2"
              mask="fulltime"
              :rules="['fulltime']"
              with-seconds
            >
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer" color="green">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time
                      v-model="eleccion.fechaDesde2"
                      with-seconds
                      format24h
                      color="green"
                    >
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" flat color="green" />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template v-slot:hint>Formato de 24 hrs.</template>
            </q-input>
          </div>
        </div>
        <div class="row" justify-center>
          <div class="col" style="margin-top: 20px">
            <div class="text-subtitle1">Fecha de cierre</div>
          </div>
          <div class="col">
            <q-input
              v-model="eleccion.fechaHasta"
              color="green"
              outlined
              label="Seleccione una fecha desde el calendario"
              mask="date"
              :rules="['date']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer" color="green">
                  <q-popup-proxy
                    ref="qDateProxy"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="eleccion.fechaHasta" color="green">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="green" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template v-slot:hint>Formato año/mes/día</template>
            </q-input>
          </div>
        </div>
        <div class="row" justify-center>
          <div class="col" style="margin-top: 20px">
            <div class="text-subtitle1">Hora de cierre</div>
          </div>
          <div class="col">
            <q-input
              color="green"
              outlined
              label="Seleccione una hora desde el reloj"
              v-model="eleccion.fechaHasta2"
              mask="fulltime"
              :rules="['fulltime']"
              with-seconds
            >
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer" color="green">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time
                      v-model="eleccion.fechaHasta2"
                      with-seconds
                      format24h
                      color="green"
                    >
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" flat color="green" />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template v-slot:hint>Formato de 24 hrs.</template>
            </q-input>
          </div>
        </div>

        <div class="row" justify-center>
          <div class="col" style="margin-top: 20px">
            <div class="text-subtitle1">Descripción</div>
          </div>
          <div class="col">
            <div class="q-pa-xs" style="max-width: 700px">
              <q-input
                outlined
                v-model="eleccion.descripcion"
                color="green"
                label="Escriba una descripcción"
                counter
                maxlength="150"
                autogrow
                :rules="txtRules"
                required
              >
                <template v-slot:hint> Máximo 150 letras. </template>
              </q-input>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card-actions align="right">
      <q-btn
        flat
        icon="save_alt"
        style="background: green; color: white"
        label="GUARDAR"
        @click="Editar"
      />

      <q-btn
        flat
        icon="restore_page"
        style="background: blue; color: white"
        label="RESTAURAR"
        @click="leerDatos"
      />
      <q-btn
        flat
        icon="cancel"
        style="background: red; color: white"
        label="CANCELAR"
        @click="
          $router.push({
            path: '/desktop/admin',
          })
        "
      />
    </q-card-actions>
  </div>
</template>

<script>
import { ref } from "vue";
import { db, Timestamp } from "../boot/db";
import { useQuasar, QSpinnerGears } from "quasar";
export default {
  setup() {
    return {
      timeWithSeconds: ref("10:56:00"),
      time2WithSeconds: ref("20:56:00"),
      text: ref(""),
      textDes: ref(""),
    };
  },
  data() {
    return {
      id: "",
      eleccion: [],
      candidatos: [],
      nombre: "",
      fechaDesde: "",
      fechaDesde2: "",
      fechaHasta: "",
      fechaHasta2: "",
      descripcion: "",
      txtRules: [(v) => !!v || "Este campo es requerido"],
    };
  },
  created() {
    this.leerDatos();
  },
  /*created() {
    let dbRef = db.collection("elecciones").doc(this.$route.params.id);
    dbRef
      .get()
      .then((doc) => {
        this.eleccion = doc.data();
      })
      .catch((error) => {
        console.log(error);
      });
  },*/
  methods: {
    leerDatos() {
      const docRef = db.collection("elecciones").doc(this.$route.params.id);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            // console.log("Document data:", doc.data());
            let eleccion = {
              titulo: doc.data().nombre,
              descripcion: doc.data().descripcion,
              fechaDesde: doc
                .data()
                .fechaDesde.toDate()
                .toLocaleDateString("en-CA"),
              fechaDesde2: doc.data().fechaDesde.toDate().toTimeString(),
              fechaHasta: doc
                .data()
                .fechaHasta.toDate()
                .toLocaleDateString("en-CA"),
              fechaHasta2: doc.data().fechaHasta.toDate().toTimeString(),
              nombre: doc.data().nombre,
            };
            this.eleccion = eleccion;
            this.candidatos = doc.data().candidatos;
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    },

    async Editar() {
      try {
        if (
          this.eleccion.nombre != "" &&
          this.eleccion.descripcion != "" &&
          this.eleccion.fechaDesde != "" &&
          this.eleccion.fechaDesde2 != "" &&
          this.eleccion.fechaHasta != "" &&
          this.eleccion.fechaHasta2 != ""
        ) {
          db.collection("elecciones")
            .doc(this.$route.params.id)
            .update({
              nombre: this.eleccion.nombre,
              descripcion: this.eleccion.descripcion,
              fechaDesde: Timestamp.fromDate(
                new Date(
                  this.eleccion.fechaDesde + "," + this.eleccion.fechaDesde2
                )
              ),
              fechaHasta: Timestamp.fromDate(
                new Date(
                  this.eleccion.fechaHasta + "," + this.eleccion.fechaHasta2
                )
              ),
            })
            .then(() => {
              console.log("eleccion successfully updated!");
              let elec = this.elecciones.filter((c) => c.id != id);
              this.elecciones = elec;
            });
          this.$q.notify({
            spinner: QSpinnerGears,
            message: "Guardando cambios...",
            timeout: 200,
            position: "center",
          });

          setTimeout(() => {
            this.$q.notify({
              message: "Eleccion actualizada con éxito!",
              color: "green",
              textColor: "white",
              icon: "cloud_done",
              position: "center",
              timeout: 1000,
            });
          }, 1000);

          setTimeout(() => {
            this.$router.push({
              path: "/desktop/admin",
            });
          }, 1500);
        } else {
          this.$q.notify({
            message: "Debe llenar todos los campos",
            color: "red",
            textColor: "white",
            icon: "clear",
          });
        }
      } catch (error) {
        this.$q.notify({
          message:
            "Error: ha ocurrido un error al actualizar el candidato" + error,
          color: "red",
          textColor: "white",
          icon: "clear",
        });
      } finally {
      }
    },
  },
};
</script>

<style>
h4 {
  margin-top: 0px;
}
.q-pa-md {
  margin-left: 20px;
  margin-right: 20px;
}
.row {
  margin-bottom: 5px;
  margin-top: 5px;
}
</style>
