<template>
  <div>
    <div class="q-pa-md">
      <div class="q-gutter-y-md column" style="max-width: 600px">
        <q-input color="blue-12" v-model="text" label="Buscar un bloque">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <br />
      <q-card class="my-card">
        <q-card-section>
          <div :class="{ 'truncate-chip-labels': truncate }">
            <h4>
              Bloque: {{ bloque
              }}<q-chip dense icon="info" color="primary" v-model="infoBlock">
                <q-tooltip>{{ infoBlockLabel }}</q-tooltip>
              </q-chip>
            </h4>
          </div>

          <q-card class="my-card">
            <q-card-section>
              Este bloque se minó el día {{ fecha }}<br />
            </q-card-section>
          </q-card>
        </q-card-section>
        <q-card-section>
          <div class="q-pa-md">
            <q-item style="max-width: 300px">
              <q-item-section class="text-indigo-14 text-bold"
                >Hash <q-tooltip></q-tooltip>
              </q-item-section>
              <tr v-for="(valor, index) in obtenerHash" :key="index">
                <td class="text-left">
                  <a :href="valor.hash" style="text-decoration: none"></a>
                </td>
                <td class="text-left">
                  <a
                    href="#/blockchain/block"
                    style="text-decoration: none"
                    @click="mandarBlock(valor.varhash)"
                  >
                    {{ valor.varhash }}</a
                  >
                </td>
              </tr>

              <q-item-section class="text-blue-grey-6"> </q-item-section>
            </q-item>
            <q-item style="max-width: 300px">
              <q-item-section class="text-indigo-14 text-bold"
                >Hash previo<q-tooltip>{{ HashPrevioLabel }}</q-tooltip>
              </q-item-section>
              <q-item-section class="text-blue-grey-6"> </q-item-section>
            </q-item>
            <q-item style="max-width: 300px">
              <q-item-section class="text-indigo-14 text-bold">
                Sello de tiempo<q-tooltip>{{ TiempoLabel }}</q-tooltip>
              </q-item-section>

              <q-item-section class="text-blue-grey-6"> </q-item-section>
            </q-item>
            <q-item style="max-width: 300px">
              <q-item-section class="text-indigo-14 text-bold">
                Altura <q-tooltip>{{ AlturaLabel }}</q-tooltip></q-item-section
              >
              <q-item-section class="text-blue-grey-6">
                {{ bloque }}
              </q-item-section>
            </q-item>
            <q-item style="max-width: 300px">
              <q-item-section class="text-indigo-14 text-bold">
                Eleccion<q-tooltip>{{ EleccionLabel }}</q-tooltip>
              </q-item-section>
              <q-item-section class="text-blue-grey-6">{{
                eleccion
              }}</q-item-section>
            </q-item>
            <q-item style="max-width: 300px">
              <q-item-section class="text-indigo-14 text-bold">
                Número de votos
                <q-tooltip>{{ VotosLabel }}</q-tooltip></q-item-section
              >
              <q-item-section class="text-blue-grey-6"> 10 </q-item-section>
            </q-item>
            <q-item style="max-width: 300px">
              <q-item-section class="text-indigo-14 text-bold">
                Tamaño<q-tooltip>{{ TamanioLabel }}</q-tooltip>
              </q-item-section>

              <q-item-section class="text-blue-grey-6">
                463.571 bytes
              </q-item-section>
            </q-item>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="q-pa-md">
      <h4>
        Votos del bloque
        <q-chip dense icon="info" color="primary" v-model="infoT">
          <q-tooltip>{{ infoTLabel }}</q-tooltip>
        </q-chip>
      </h4>
      <q-table title="" :rows="rows" :columns="columns" row-key="correlativo" />
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { db } from "src/boot/db";
import Chart from "chart.js/auto";
import { mapGetters, mapActions } from "vuex";

const columns = [
  {
    name: "correlativo",
    align: "left",
    label: "correlativo",
    field: "correlativo",
    sortable: true,
  },
  {
    name: "voto",
    align: "left",
    label: "voto",
    field: "voto",
    sortable: true,
  },
  {
    name: "fecha",
    align: "left",
    label: "fecha de realización",
    field: "fecha",
    sortable: true,
  },
];

const rows = [
  {
    correlativo: 1,
    voto: "partido rojo",
    fecha: "2022-03-19 15:50",
  },
  {
    correlativo: 2,
    voto: "partido azul",
    fecha: "2022-03-19 15:50",
  },
  {
    correlativo: 3,
    voto: "partido verde",
    fecha: "2022-03-19 15:50",
  },
  {
    correlativo: 4,
    voto: "partido azul",
    fecha: "2022-03-19 15:50",
  },
  {
    correlativo: 5,
    voto: "partido azul",
    fecha: "2022-03-19 15:50",
  },
  {
    correlativo: 6,
    voto: "partido verde",
    fecha: "2022-03-19 15:50",
  },
  {
    correlativo: 7,
    voto: "partido rojo",
    fecha: "2022-03-19 15:50",
  },
  {
    correlativo: 8,
    voto: "partido rojo",
    fecha: "2022-03-19 15:50",
  },
];

export default {
  setup() {
    const infoBlock = ref(true);
    const infoT = ref(true);
    return {
      truncate: ref(true),

      infoBlock,
      infoT,

      infoBlockLabel: "bloque a la altura xxx en la cadena.",
      infoTLabel: "Todos los votos grabados en el bloque a la altura xxx.",
      HashLabel: "Identificador unico para identificar un bloque particular",
      HashPrevioLabel: "Identificador del bloque anterior",
      TiempoLabel: "Todos los votos grabados en el bloque a la altura xxx.",
      AlturaLabel: "Numero de bloques conectados al blockchain",
      EleccionLabel: "Eleccion a la que pertenece el bloque",
      VotosLabel: "Numero de votos registrados en el bloque",
      TamanioLabel: "Tamaño total del bloque",

      columns,
      rows,
    };
  },
  data() {
    return {
      bloque: 111,
      fecha: "marzo 24, 2022 a las 7:34 PM GMT -06:00",
      eleccion: "Eleccion de junta directiva 2022",
    };
  },

  computed: {
    ...mapGetters(["obtenerHash", "hashActual"]),
  },
  created() {
    this.valordehash();
  },
  mounted() {
    this.buscarHash();
  },
  methods: {
    ...mapActions(["valordehash"]),
    buscarHash() {
      console.log("Informacion de bloque");
      console.log(this.hashActual);
      const objHash = this.obtenerHash.filter(
        (hash) => hash.hash == this.valordehash
      );
    },
  },
};
</script>

<style lang="sass" scoped>
.truncate-chip-labels > .q-chip
  max-width: 140px
</style>
