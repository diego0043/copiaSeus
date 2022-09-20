<template>
  <div class="flex flex-center">
    <h1 id="titulo">Resultados de Elecciones</h1>
  </div>
  <div aling="center" class="flex flex-center">
    <h5
      id="Indica"
      style="font-family: fantasy, 'Courier New', Courier, monospace"
    >
      Ver datos generales acerca de:
    </h5>

    <q-card style="min-width: 280px; width: 75%">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="usuarios" label="Usuarios" />
        <q-tab name="elecciones" label="Elecciones Registradas" />
        <q-tab name="blockchain" label="Blockchain" />
        <q-tab name="votos" label="Votos" />
      </q-tabs>

      <q-separator />

      <!-- pestañas -->

      <q-tab-panels v-model="tab" animated>
        <!-- pestaña usuarios -->

        <q-tab-panel name="usuarios">
          <div class="row flex-center">
            <div class="col-10 qfield">
              <q-field
                rounded
                outlined
                label="Usuarios Registrados"
                stack-label
                style="font-size: large"
              >
                <template v-slot:prepend>
                  <span
                    class="material-icons text-primary"
                    style="font-size: 3rem"
                  >
                    person
                  </span>
                </template>

                <template v-slot:label>
                  <span
                    class="text-weight-bold text-deep"
                    style="font-size: large"
                    >Usuarios Registrados</span
                  >
                </template>

                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    {{ tamanio }}
                  </div>
                </template>
              </q-field>
            </div>
          </div>

          <div class="row flex-center">
            <div class="col-10 qfield">
              <q-field
                rounded
                outlined
                label="Usuarios Verificados"
                stack-label
                style="font-size: large"
              >
                <template v-slot:label>
                  <span
                    class="text-weight-bold text-deep"
                    style="font-size: large"
                    >Usuarios Verificados</span
                  >
                </template>
                <template v-slot:prepend>
                  <span
                    class="material-icons text-primary"
                    style="font-size: 3rem"
                    >account_circle</span
                  >
                </template>

                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    {{ tamanio2 }}
                  </div>
                </template>
              </q-field>
            </div>
          </div>
        </q-tab-panel>

        <!-- Pestaña elecciones -->

        <q-tab-panel name="elecciones">
          <div class="q-pa-xs row items-start q-gutter-md flex flex-center">
            <q-card
              v-for="(eleccion, key) in elecciones"
              :key="key"
              class="mycard"
            >
              <div class="row">
                <span
                  class="material-icons"
                  style="font-size: 250%; color: #5c5c5c"
                >
                  how_to_vote
                </span>
                <div
                  class="text-h6 q-mb-xs"
                  style="
                    font-size: large;
                    font-family: fantasy;
                    font-weight: 45;
                    font-style: oblique;
                    color: #001a57;
                  "
                >
                  {{ eleccion.nombre }}
                </div>
              </div>

              <q-list>
                <q-item clickable>
                  <q-item-section avatar>
                    <span
                      class="material-icons text-primary"
                      style="font-size: 200%"
                    >
                      today
                    </span>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Realizada</q-item-label>
                    <q-item-label caption>{{
                      eleccion.fechaDesde.toDate().toLocaleString()
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section avatar>
                    <span
                      class="material-icons text-primary"
                      style="font-size: 200%"
                    >
                      groups
                    </span>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Candidatos</q-item-label>
                    <q-item-label caption>{{
                      eleccion.candidatos.length
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </q-tab-panel>
        <!-- Pestaña votos -->

        <q-tab-panel name="votos">
          <div class="row flex flex-center">
            <div class="col-10 qfield">
              <q-field
                rounded
                outlined
                label="Usuarios Registrados"
                stack-label
                style="font-size: large"
              >
                <template v-slot:prepend>
                  <span
                    class="material-icons text-primary"
                    style="font-size: 250%; margin-right: 15px"
                  >
                    how_to_vote
                  </span>
                </template>

                <template v-slot:label>
                  <span
                    class="text-weight-bold text-deep"
                    style="font-size: large"
                    >Total de Votos registrados</span
                  >
                </template>

                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    {{ sumaVotosTotales }}
                  </div>
                </template>
              </q-field>
            </div>
          </div>
          <!-- tarjetas de votos en cada eleccion -->

          <div class="q-pa-md row items-start q-gutter-md flex flex-center">
            <q-card v-for="(eleccion, key) in votos" :key="key" class="mycard2">
              <div class="row">
                <span
                  class="material-icons text-primary"
                  style="font-size: 250%"
                >
                  how_to_vote
                </span>
                <div
                  class="text-h6 q-mb-xs"
                  style="
                    font-size: large;
                    font-family: fantasy;
                    font-weight: 45;
                    font-style: oblique;
                    color: #001a57;
                  "
                >
                  {{ eleccion.nombre }}
                </div>
              </div>
              <q-list>
                <q-item
                  clickable
                  v-if="fechaActual > eleccion.fechaHasta.toDate()"
                >
                  <q-item-section avatar>
                    <span
                      class="material-icons"
                      style="font-size: 200%; color: #a3a3a3"
                    >
                      poll
                    </span>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Votos:</q-item-label>
                    <q-item-label caption style="font-size: medium">{{
                      eleccion.totalVotosPorEleccion
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item-section v-else>
                  <q-item-section avatar>
                    <span
                      class="material-icons"
                      style="font-size: 200%; color: #a3a3a3"
                    >
                      poll
                    </span>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Votos:</q-item-label>
                    <q-item-label caption style="font-size: medium">
                      Los votos se mostraran hasta que finalize la eleccion
                    </q-item-label>
                  </q-item-section>
                </q-item-section>
              </q-list>
            </q-card>
          </div>
        </q-tab-panel>
        <!-- Pestaña blockchain -->
        <q-tab-panel name="blockchain">
          <q-banner class="bg-grey-3">
            <template v-slot:avatar>
              <q-icon name="file_present" color="blue" />
            </template>
            <div
              class="text-subtitle1 text-weight-medium"
              style="
                font-size: large;
                font-family: fantasy;
                font-weight: 45;
                font-style: oblique;
                color: #001a57;
              "
            >
              Visualice información de las votaciones través <br />de la base de
              datos Blockchain
            </div>

            <template v-slot:action>
              <q-btn
                outline
                rounded
                color="primary"
                label="blockchain"
                href="#/blockchain/index"
              />
            </template>
          </q-banner>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>

  <!--fin de tab -->

  <br />
  <br />

  <!-- Pestaña desplegables -->
  <div class="flex flex-center">
    <br />
    <h5
      id="Indica"
      style="font-family: fantasy, 'Courier New', Courier, monospace"
    >
      Datos de resultados:
    </h5>

    <div class="q-pa-md" style="min-width: 280px; width: 79%">
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          group="somegroup"
          v-for="(eleccion, index) in elecciones"
          :key="index"
          @click="calcularDatos(eleccion.id)"
          default-closed
          ><q-separator />
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar
                icon="how_to_vote"
                color="primary"
                text-color="white"
                size="3em"
              />
            </q-item-section>

            <q-item-section
              style="
                font-size: large;
                font-family: fantasy;
                font-weight: 45;
                font-style: oblique;
                color: #001a57;
              "
              >{{ eleccion.nombre }}</q-item-section
            >

            <q-item-section side>
              <div class="row items-center">
                <q-icon name="insights" color="primary" size="24px" />
              </div>
            </q-item-section>
          </template>

          <q-card v-if="fechaActual > eleccion.fechaHasta.toDate()">
            <q-card-section>
              <div class="row">
                <div class="col">
                  <q-card>
                    <q-markup-table>
                      <thead auto-width>
                        <tr>
                          <th class="text-left">Planilla</th>
                          <th class="text-left">Votos</th>
                          <th class="text-left">Porcentaje(%)</th>
                          <th class="text-left"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(candidato, key) in eleccion.candidatos"
                          :key="key"
                        >
                          <td class="text-left">
                            {{ candidato.nombre }}
                          </td>
                          <td class="text-left">
                            {{ candidato.votos }}
                          </td>
                          <td class="text-left">
                            {{
                              ((candidato.votos / totalVotos) * 100).toFixed(2)
                            }}
                          </td>
                          <q-td auto-width> </q-td>
                        </tr>
                      </tbody>
                    </q-markup-table>
                    <q-card-section>
                      <Pie
                        :chart-options="chartOptions"
                        :chart-data="chartData"
                        :chart-id="chartId"
                        :css-classes="cssClasses"
                        :styles="styles"
                        :width="width"
                        :height="height"
                      />
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </q-card-section>
          </q-card>
          <q-card v-else>
            <q-card-section class="text-indigo-10">
              Los resultados se mostraran hasta que termine la
              eleccion</q-card-section
            >
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
  <!--fin de tab -->
</template>

<script>
import { db } from "src/boot/db";
import { mapGetters, mapActions } from "vuex";
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  Plugin,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const colums = [];

const rows = [];

export default {
  components: { Pie },
  props: {
    chartId: {
      type: String,
      default: "pie-chart",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      default: () => {},
    },
  },
  data() {
    return {
      totalVotos: 0,
      chartData: {
        labels: ["candidato A", "candidato B"],
        datasets: [
          {
            backgroundColor: [
              "#0526F7",
              "#E46651",
              "#00D8FF",
              "#DD1B16",
              "#C23C4E",
              "#ECF705",
              "#18F705",
              "#05F7F3",
              "#7A05F7",
              "#F705B1",
            ],
            data: [40],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      tab: "usuarios",
      colums,
      rows,
      tamanio: null,
      tamanio2: null,

      //para elecciones registradas
      elecciones: [],
      votos: [],
      sumaVotosTotales: 0,
      fechaActual: "",
      iteraciones: ["Elección A", "Elección B"],
      //fin script elecciones registradas
    };
  },
  computed: {
    ...mapGetters(["getterVotosPorCandidato", "isValidate"]),
  },
  created() {
    this.filtrarVotosPorCandidato();
  },
  methods: {
    ...mapActions(["filtrarVotosPorCandidato"]),
    async obtenerElecciones() {
      try {
        this.$q.loading.show({
          message: "Por favor, espere un momento...",
          position: "center",
        });
        const query = await db.collection("elecciones").get();
        query.forEach((element) => {
          let eleccion = {
            id: element.id,
            candidatos: element.data().candidatos,
            descripcion: element.data().descripcion,
            fechaDesde: element.data().fechaDesde,
            fechaHasta: element.data().fechaHasta,
            nombre: element.data().nombre,
          };
          this.elecciones.push(eleccion);
        });
        //console.log(this.candidatos);
      } catch (error) {
        console.log(error);
      } finally {
        this.$q.loading.hide();
      }
      this.votosPorEleccion();
    },
    calcularDatos(id) {
      //aqui tengo que obtener los datos de los candidatos de cada eleccion
      let eleccion = this.elecciones.filter((el) => el.id == id);

      const cdtEleccion = eleccion[0].candidatos;
      this.chartData.labels = [];
      this.chartData.datasets[0].data = [];
      this.totalVotos = 0;
      for (let i = 0; i < cdtEleccion.length; i++) {
        this.chartData.labels.push(cdtEleccion[i].nombre);
        this.chartData.datasets[0].data.push(cdtEleccion[i].votos);
        this.totalVotos = this.totalVotos + cdtEleccion[i].votos;
      }
      //console.log(this.totalVotos);
    },
    votosPorEleccion() {
      let sumaVotos = 0;

      this.elecciones.forEach((el) => {
        //console.log(el.nombre);
        el.candidatos.forEach((ct) => {
          sumaVotos += ct.votos;
        });
        this.votos.push({
          id: el.id,
          nombre: el.nombre,
          fechaHasta: el.fechaHasta,
          totalVotosPorEleccion: sumaVotos,
        });
        this.sumaVotosTotales += sumaVotos;
        sumaVotos = 0;
      });
    },
  },
  mounted() {
    db.collection("alumnos")
      .get()
      .then((doc) => {
        //  console.log(typeof doc.size);
        this.tamanio = doc.size;
      });

    db.collection("alumnos")
      .where("validacion1", "==", true)
      .get()
      .then((doc) => {
        //  console.log(typeof doc.size);
        this.tamanio2 = doc.size;
      });
  },
  created() {
    this.obtenerElecciones();
    const hoy = Date.now();
    this.fechaActual = new Date(hoy);
  },
};
</script>
<!-- Aca agregue -->

<style>
@import "../css/titulo.css";

.qfield {
  margin-right: 10%;
  margin-left: 10%;
  margin-top: 5px;
}

/*style de tarjetas de elecciones*/
.mycard {
  width: 100%;
  max-width: 200px;
  min-height: 150px;
  max-height: 400px;
}
.mycard2 {
  width: 100%;
  max-width: 200px;
  min-height: 100px;
  max-height: 300px;
}
</style>
