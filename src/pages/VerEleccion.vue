<template>
  <div class="q-pa-md">
    <h4 align="center" class="flex flex-center">Detalle de la elección</h4>
    <q-page-sticky position="top-right" :offset="[18, 18]">
      <q-btn
        push
        round
        color="primary"
        icon="arrow_back_ios_new"
        @click="$router.push({ path: '/desktop' })"
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
              v-model="eleccion.nombre"
              rounded
              outlined
              color="green"
              disable
            >
              <template v-slot:prepend>
                <q-icon name="turned_in_not" />
              </template>
            </q-input>
          </div>
        </div>
        <br />
        <div class="row" justify-center>
          <div class="col" style="margin-top: 20px">
            <div class="text-subtitle1">Fecha de Habilitación</div>
          </div>
          <div class="col">
            <q-input
              v-model="eleccion.fechaDesde"
              rounded
              outlined
              color="green"
              disable
            >
              <template v-slot:prepend>
                <q-icon name="event" />
              </template>
            </q-input>
          </div>
        </div>
        <br />
        <div class="row" justify-center>
          <div class="col" style="margin-top: 20px">
            <div class="text-subtitle1">Fecha de Finalizacion</div>
          </div>
          <div class="col">
            <q-input
              v-model="eleccion.fechaHasta"
              rounded
              outlined
              color="green"
              disable
            >
              <template v-slot:prepend>
                <q-icon name="event" />
              </template>
            </q-input>
          </div>
        </div>
        <br />

        <div class="row" justify-center>
          <div class="col" style="margin-top: 20px">
            <div class="text-subtitle1">Descripción</div>
          </div>
          <div class="col">
            <div class="q-pa-xs" style="max-width: 700px">
              <q-input
                v-model="eleccion.descripcion"
                color="green"
                type="textarea"
                disable
                rounded
                outlined
              >
              </q-input>
            </div>
          </div>
        </div>
        <br />
        <div class="row" justify-center>
          <div class="col" style="margin-top: 20px">
            <div class="text-subtitle1">Candidatos</div>
          </div>
          <div class="col">
            <q-list class="shadow-2 rounded-borders" style="width: 100%">
              <q-item v-for="(candidato, key) in candidatos" :key="key">
                <q-item-section thumbnail>
                  <img :src="candidato.imagen" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ candidato.nombre }}</q-item-label>
                  <q-item-label
                    caption
                    lines="2"
                    v-html="candidato.descripcion"
                  ></q-item-label>
                </q-item-section>
                <q-item-section side top>
                  <q-item-label caption
                    >Votos {{ candidato.votos }}</q-item-label
                  >
                  <q-icon name="how_to_vote" color="yellow" />
                </q-item-section>
              </q-item>

              <q-separator inset="item-thumbnail" />
            </q-list>
          </div>
        </div>
        <br />
      </q-card-section>
    </q-card>
    <q-card-actions align="right">
      <q-btn
        flat
        icon="verified"
        style="background: indigo; color: white"
        label="OK"
        @click="
          $router.push({
            path: '/desktop',
          })
        "
      />
    </q-card-actions>
  </div>
</template>
<script>
import { db } from "../boot/db";

export default {
  setup() {},
  data() {
    return {
      id: "",
      eleccion: {},
      candidatos: [],
    };
  },
  methods: {
    leerDatos() {
      const docRef = db.collection("elecciones").doc(this.$route.params.id);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            // console.log("Document data:", doc.data());
            let eleccion = {
              descripcion: doc.data().descripcion,
              fechaDesde: doc.data().fechaDesde.toDate().toLocaleString(),
              fechaHasta: doc.data().fechaHasta.toDate().toLocaleString(),
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
  },
  created() {
    this.leerDatos();
  },
};
</script>
