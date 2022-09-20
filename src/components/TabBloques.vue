<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 1010px">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="bloques" label="Bloques" />
          <q-tab name="transacciones" label="Transacciones" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated virtual-scroll>
          <q-tab-panel name="bloques">
            <div class="q-pa-md">
              <h5>
                <b>Últimos Bloques </b>
              </h5>
              <q-markup-table>
                <thead class="bg-grey-1 text-h4">
                  <tr>
                    <th class="text-left">Altura</th>
                    <th class="text-left">Hash</th>

                    <th class="text-left">Tamaño</th>
                    <th class="text-left">Total de votos</th>
                    <th class="text-left">Fecha y hora</th>
                  </tr>
                </thead>
                <tbody class="bg-grey-1 text-h4">
                  <tr v-for="(valor, index) in obtenerHash" :key="index">
                    <td class="text-left">
                      <a :href="valor.hash" style="text-decoration: none">01</a>
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
                    <td class="text-left">463.571 bytes</td>
                    <td class="text-left">10</td>
                    <td class="text-left">2022-03-19 15:50</td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
            <br />
            <q-btn
              outline
              color="primary"
              label="Ver todos los bloques"
              style="margin-left: 15px"
              href="#/blockchain/blocks"
              icon-right="arrow_right_alt"
            ></q-btn>
          </q-tab-panel>

          <q-tab-panel name="transacciones">
            <div class="q-pa-md">
              <h5>
                <b>Últimas Transacciones</b>
              </h5>
              <q-table
                title
                :rows="rows"
                :columns="columns"
                row-key="correlativo"
                hide-bottom
                class="bg-grey-1 text-h4"
              >
              </q-table>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { db } from "src/boot/db";
import Chart from "chart.js/auto";
import { mapGetters, mapActions, mapMutations } from "vuex";
const columns = [
  {
    name: "correlativo",
    align: "left",
    label: "Correlativo",
    field: "correlativo",
    sortable: true,
  },
  {
    name: "hash",
    align: "left",
    label: "Hash",
    field: "hash",
    sortable: true,
  },
  {
    name: "fecha",
    align: "left",
    label: "Fecha de realización",
    field: "fecha",
    sortable: true,
  },
];

const rows = [];

export default {
  setup() {
    return {
      tab: ref("bloques"),
      columns,
      rows,
    };
  },

  computed: {
    ...mapGetters(["obtenerHash"]),
    ...mapMutations(["setHashActual"]),
  },
  created() {
    this.valordehash();
  },
  methods: {
    ...mapActions(["valordehash", "setearHasActual"]),
    mandarBlock(event) {
      console.log("evento des");
      console.log(event);
      this.setearHasActual(event);
    },
  },
};
</script>
