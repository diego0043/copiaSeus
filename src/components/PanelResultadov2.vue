<template>
  <!--Loader mientras la data no esta cargada-->
  <!-- 
    <div class="row" v-if="data_cargada != true">
      <div class="col">
        <q-card class="my-card2" flat>
          <q-card-section>
            <q-img width="400px" src="../assets/gifs/83948-search.gif"> </q-img>
          </q-card-section>
          <q-card-section> </q-card-section>
          <q-card-section class="text-grey text-h4 q-ml-md">
            <div class="row container">
              <div class="col-1 circular-item">
                <q-circular-progress
                  indeterminate
                  size="20px"
                  color="blue"
                  class="q-ma-md"
                />
              </div>
              <div class="col text-h5 q-mt-sm q-ml-md">
                <span class="text-loading">Cargando Resultados...</span>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  
  -->
  <!-- v-if="data_cargada != false" -->
  <div aling="center" class="flex flex-center">
    <h1 id="titulo">Resultados de Elecciones</h1>
  </div>

  <q-img class="img-analytics" src="../assets/gifs/analytics.gif"></q-img>

  <!-- Datos usuarios registrados y verificados -->
  <!-- v-if="data_cargada != false" -->
  <div class="flex flex-center">
    <div class="row contenedor">
      <div class="col-4">
        <Doughnut
          :colors="colors"
          :data="data"
          :grosor="grosor"
          class="chartStyle"
        />
      </div>
      <div class="col-8 texto-usuarios">
        <div class="row usr-ver">Usuarios verificados</div>
        <div class="row usr-reg">Usuarios registrados</div>
      </div>
    </div>
  </div>

  <div class="contenedor-data">
    <div class="q-pa-md">
      <div class="q-gutter-y-md no-shadow" style="max-width: 600px">
        <q-card class="no-shadow">
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="mails" label="Registro Elecciones" />
            <q-tab name="alarms" label="Blockchain" />
          </q-tabs>

          <q-separator class="separador" />

          <q-tab-panels class="card-altura" v-model="tab" animated>
            <q-tab-panel name="mails">
              <!-- input busquedas -->
              <q-input
                class="q-mt-sm q-mb-xl"
                outlined
                rounded
                bottom-slots
                v-model="text"
                placeholder="Buscar elección"
                counter
                maxlength="50"
                :dense="dense"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>

              <div>
                <q-infinite-scroll :offset="250">
                  <q-card
                    v-for="(item, index) in dataProcesada"
                    :key="(item, index)"
                    style="width: 360px"
                    class="card-eleccion shadow-5"
                  >
                    <div
                      class="row"
                      v-show="
                        Date.parse(Date()) >
                        Date.parse(item.fechaHasta.toDate())
                      "
                    >
                      <div class="col-10">
                        <div class="row">
                          <span class="title-cards">{{ item.nombre }}</span>
                        </div>
                        <div class="row">
                          <span class="fecha-fin">
                            <q-icon name="event" />
                            {{ item.fechaHasta.toDate().toDateString() }}</span
                          >
                        </div>
                      </div>
                      <div class="col-2">
                        <button
                          class="btn-modal"
                          @click="irDetalle(dataProcesada[index])"
                        >
                          <q-icon name="arrow_forward_ios" />
                        </button>
                      </div>
                    </div>
                  </q-card>
                </q-infinite-scroll>
              </div>
            </q-tab-panel>

            <q-tab-panel name="alarms">
              <q-img src="../assets/security.svg" class="img-blockchain">
              </q-img>
              <div>
                <h5 class="usr-ver q-mb-md">¿Como ver datos en blockchain?</h5>
                <p class="parrafo">
                  Nuestro explorador de blockchain es una herramienta que puedes
                  emplear para consultar las operaciones y eventos en nuestra
                  blockchain. Como por ejemplo las transacciones que suceden
                  dentro de la red se registran en la cadena de bloques en
                  tiempo real, de manera transparente, rápida y segura
                </p>
              </div>
              <div>
                <button class="btn-style" @click="irBlockchain()">
                  BLOCKCHAIN
                </button>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </div>

  <!-- Modal-->
  <q-dialog v-model="modal" full-height full-width>
    <q-card>
      <!-- Titulo-->
      <q-card-section>
        <div class="row">
          <div class="col-10 label-titulo">Elección:</div>
          <div class="col-2">
            <button class="btn-close" v-close-popup>
              <q-icon size="lg" name="close"></q-icon>
            </button>
          </div>
        </div>
        <div class="row text-name-modal">{{ nameDetalle }}</div>
      </q-card-section>
      <!-- Grafica-->
      <q-card-section>
        <div>
          <Doughnut
            :colors="colorsDetalle"
            :data="votosDetalle"
            :grosor="grosorDetalle"
            class="chartStyleDetalle"
          />
        </div>
      </q-card-section>

      <!-- Nombres de candidatos y sus votos-->
      <q-card-section v-for="(item, index) in dataDetalle" :key="(item, index)">
        <div>
          <div class="row q-mb-sm">
            <div class="col text-name-modal">
              <q-icon
                class="point"
                :style="[{ color: colorsDetalle[index] }]"
                name="circle"
              ></q-icon>
              {{ item }}
            </div>
            <div class="col">
              <q-chip
                class="chip-votos"
                outline
                color="primary"
                text-color="white"
                icon="bar_chart"
              >
                Votos: {{ votosDetalle[index] }}
              </q-chip>
            </div>
          </div>
          <div class="row">
            <q-linear-progress
              size="lg"
              :value="((votosDetalle[index] / totalVotosDetalle) * 100) / 100"
              :style="[{ color: colorsDetalle[index] }]"
              label="Change Model"
            />
            <div
              :style="[{ color: colorsDetalle[index] }]"
              class="porcentajeCandidato"
            >
              {{ (votosDetalle[index] / totalVotosDetalle) * 100 }}%
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col">
            <q-chip
              v-if="participacion != false"
              outline
              color="primary"
              class="participe"
              text-color="white"
              icon="sentiment_satisfied_alt"
            >
              Participaste
            </q-chip>
            <q-chip
              v-if="participacion != true"
              outline
              color="primary"
              class="participe"
              text-color="white"
              icon="sentiment_very_dissatisfied"
            >
              No participaste
            </q-chip>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Doughnut from "./Doughnut.vue";

export default {
  components: {
    Doughnut,
  },
  data() {
    return {
      tab: "mails",
      colors: ["#699bf7", "#808080"],
      data: [20, 19],
      grosor: 30,
      modal: false,
      colorsDetalle: [],
      dataDetalle: [],
      grosorDetalle: 65,
      votosDetalle: [],
      nameDetalle: "",
      imgDetalle: [],
      totalVotosDetalle: 0,
      participacion: false,
      mdColors: [
        "#47A6D4",
        "#47A6D4",
        "#6EBBDA",
        "#9ACCDD",
        "#A0D4E6",
        "#C5DAE7",
        "#D7EEFC",
        "#808080",
        "#999999",
        "#B5B5B5",
        "#C9C9C9",
        "#DEDEDE",
        "#EBEBEB",
      ],
    };
  },
  computed: {
    ...mapGetters(["dataProcesada", "data_cargada"]),
  },

  methods: {
    ...mapActions(["fetch_Data_ordenada_elecciones"]),
    irBlockchain() {
      this.$router.push({
        name: "blockchain",
      });
    },

    irDetalle(eleccion) {
      let numAleatorio = 0;
      let votos = 0;
      this.colorsDetalle = [];
      this.dataDetalle = [];
      this.votosDetalle = [];
      this.imgDetalle = [];
      this.nameDetalle = eleccion.nombre;
      this.participacion = false;
      eleccion.candidatos.forEach((element) => {
        this.colorsDetalle.push(this.mdColors[numAleatorio]);
        this.dataDetalle.push(element.nombre);
        this.votosDetalle.push(element.votos);
        this.imgDetalle.push(element.imagen);
        votos += element.votos;
        numAleatorio += 1;
      });
      this.participacion = eleccion.ya_vote;
      this.totalVotosDetalle = votos;
      this.modal = true;
    },
  },
  created() {
    this.fetch_Data_ordenada_elecciones();
  },
};
</script>

<style scoped>
@import "../css/titulo.css";

.chartStyle {
  width: 100px;
  height: 100px;
  margin-right: 40px;
  margin-bottom: auto;
}

.contenedor {
  width: 340px;
  margin-top: -10px;
  margin-bottom: 30px;
}

.separador {
  width: 95%;
  margin-left: auto;
  margin-right: auto;
}

.texto-usuarios {
  margin-top: auto;
  margin-bottom: auto;
  font-size: 22px;
}

.usr-ver {
  color: #699bf7;
  font-weight: bold;
}

.usr-reg {
  color: grey;
  font-weight: bold;
}

.contenedor-data {
  height: 765px;
  padding-top: 20px;
}

.card-altura {
  height: 660px;
}

.img-blockchain {
  margin-top: 20px;
  margin-right: auto;
  margin-left: auto;
}

.parrafo {
  color: grey;
}

.btn-style {
  border-radius: 10px;
  width: 170px;
  height: 40px;
  background-color: white;
  color: #699bf7;
  border: 1px solid #699bf7;
  padding-top: 5px;
}

.btn-style:active {
  color: white;
  background-color: #699bf7;
}

.img-principal {
  width: 350px;
  border: 1px solid black;
  margin-right: 100px;
}

.img-analytics {
  display: block;
  margin-top: -20px;
  margin-bottom: 50px;
}

.card-eleccion {
  height: 100px;
  background-color: white;
  border-radius: 10px;
}

.title-cards {
  color: #699bf7;
  font-weight: bold;
  font-size: 22px;
  margin-left: 15px;
  margin-top: 20px;
}

.fecha-fin {
  margin-left: 15px;
  color: grey;
}

.btn-modal {
  margin-top: 40%;
  background-color: white;
  font-size: 30px;
  border: 0px;
  color: #699bf7;
  font-weight: bold;
}

.btn-modal:active {
  color: #548cf3;
}

.titulo-modal {
  color: #548cf3;
  font-size: 30px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  font-weight: bold;
}

.chartStyleDetalle {
  margin-top: -10px;
}

.chip-votos {
  margin-left: 40%;
  margin-top: -2px;
}

.text-name-modal {
  color: grey;
  font-size: 20px;
  font-weight: bold;
}

.point {
  font-size: 16px;
}

.label-titulo {
  color: #548cf3;
  font-size: 30px;
  margin-right: auto;
  margin-left: auto;
  text-align: left;
  font-weight: bold;
}

.btn-close {
  margin-left: 15px;
  background-color: white;
  border: 0px;
  color: #699bf7;
}

.porcentajeCandidato {
  display: inline-block;
  font-size: 15px;
  font-weight: bold;
  width: 20px;
  text-align: center;
}

.resultadoChart {
  position: relative;
  background-color: red;
  top: 20;
}
</style>
