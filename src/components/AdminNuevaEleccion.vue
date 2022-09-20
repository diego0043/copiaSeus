<template>
  <div>
    <q-btn color="primary" push @click="nuevaeleciondialog = true">
      <div class="row items-center no-wrap">
        <q-icon left name="format_list_numbered" />
        <div class="text-center">NUEVA<br />ELECCION</div>
      </div>
    </q-btn>

    <q-dialog
      v-model="nuevaeleciondialog"
      transition-show="rotate"
      transition-hide="rotate"
    >
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">NUEVA ELECCION</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row" justify-center>
            <div class="col text-subtitle1" style="margin-top: 20px">
              Nombre de Eleccion:
            </div>
            <div class="col">
              <q-input
                outlined
                v-model="nom"
                color="green"
                counter
                maxlength="50"
                :rules="txtRules"
                required
              >
                <template v-slot:hint> Máximo 50 letras. </template>
              </q-input>
            </div>
          </div>
          <div class="row" justify-center>
            <div class="col text-subtitle1" style="margin-top: 20px">
              Fecha de habilitación:
            </div>
            <div class="col">
              <q-input
                v-model="fechainicio"
                color="green"
                outlined
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
                      <q-date v-model="fechainicio" color="green">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="green"
                            flat
                          />
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
            <div class="col text-subtitle1" style="margin-top: 20px">
              Fecha de cierre:
            </div>
            <div class="col">
              <q-input
                v-model="fechafin"
                color="green"
                outlined
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
                      <q-date v-model="fechafin" color="green">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="green"
                            flat
                          />
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
            <div class="col text-subtitle1" style="margin-top: 20px">
              Hora de Inicio:
            </div>
            <div class="col">
              <q-input
                color="green"
                outlined
                v-model="horainicio"
                mask="fulltime"
                :rules="['fulltime']"
                with-seconds
              >
                <template v-slot:append>
                  <q-icon
                    name="access_time"
                    class="cursor-pointer"
                    color="green"
                  >
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time
                        v-model="horainicio"
                        with-seconds
                        format24h
                        color="green"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            flat
                            color="green"
                          />
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
            <div class="col text-subtitle1" style="margin-top: 20px">
              Hora de Cierre:
            </div>
            <div class="col">
              <q-input
                color="green"
                outlined
                v-model="horafin"
                mask="fulltime"
                :rules="['fulltime1']"
                with-seconds
              >
                <template v-slot:append>
                  <q-icon
                    name="access_time"
                    class="cursor-pointer"
                    color="green"
                  >
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time
                        v-model="horafin"
                        with-seconds
                        format24h
                        color="green"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            flat
                            color="green"
                          />
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
            <div class="col text-subtitle1" style="margin-top: 20px">
              Descripción:
            </div>
            <div class="col">
              <div class="q-pa-xs" style="max-width: 700px">
                <q-input
                  outlined
                  v-model="descrip"
                  color="green"
                  label="Agregue una descripción"
                  counter
                  maxlength="150"
                  autogrow
                  :rules="txtRules"
                  required
                >
                  <template v-slot:hint> Maximo 150 letras. </template>
                </q-input>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            icon="save_alt"
            style="background: green; color: white"
            label="GUARDAR"
            @click="guardar"
            v-close-popup
          />

          <q-btn
            flat
            icon="cancel"
            style="background: red; color: white"
            label="CANCELAR"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { db, Timestamp } from "src/boot/db";
export default {
  data() {
    return {
      elecciones: [],
      nom: "",
      fechafin: "",
      fechainicio: "",
      descrip: "",
      horainicio: "",
      horafin: "",
      nuevaeleciondialog: ref(false),
      txtRules: [(v) => !!v || "Este campo es requerido"],
    };
  },

  methods: {
    async guardar() {
      try {
        if (
          this.nom != "" &&
          this.descrip != "" &&
          this.fechainicio != "" &&
          this.fechafin != "" &&
          this.horainicio != "" &&
          this.horafin != ""
        ) {
          const query = await db.collection("elecciones").add({
            candidatos: [],
            descripcion: this.descrip,
            fechaDesde: Timestamp.fromDate(
              new Date(this.fechainicio + "," + this.horainicio)
            ),
            fechaHasta: Timestamp.fromDate(
              new Date(this.fechafin + "," + this.horafin)
            ),

            nombre: this.nom,
            participantes: [],
          });
          this.nom = "";
          this.descrip = "";
          this.fechainicio = "";
          this.fechafin = "";
          this.horainicio = "";
          this.horafin = "";
          this.$q.notify({
            message: "Eleccion creada",
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
          });
        } else {
          this.$q.notify({
            message: "Debe llenar todos los campos",
            color: "red",
            textColor: "white",
            icon: "clear",
          });

          this.nom = "";
          this.descrip = "";
          this.fechainicio = "";
          this.fechafin = "";
          this.horainicio = "";
          this.horafin = "";
        }
      } catch (error) {
        console.log(error);
        this.$q.notify({
          message: error,
          color: "red",
          textColor: "white",
          icon: "clear",
        });
      }
    },
  },
};
</script>

<style></style>
