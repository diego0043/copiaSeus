<template>
  <div class="row">
    <div class="col">
      <q-breadcrumbs
        active-color="white"
        style="font-size: 16px; margin-top: 10px"
      >
        <q-breadcrumbs-el label="Inicio" icon="home" href="#/home" />
        <q-breadcrumbs-el
          label="Blockchain"
          icon="widgets"
          href="#/blockchain/index"
        />
        <q-breadcrumbs-el label="Bloques" href="#/blockchain/blocks" />
      </q-breadcrumbs>
    </div>
    <div class="col">
      <div class="q-pa-md" style="max-width: 450px">
        <div class="q-gutter-md">
          <q-input
            placeholder="Buscar una transacción o un bloque"
            v-model="search"
            debounce="1000"
            filled
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>
    </div>
  </div>

  <mostrar-bloques></mostrar-bloques>
</template>
<script>
import MostrarBloques from "src/components/MostrarBloques.vue";
export default {
  components: { MostrarBloques },
  props: {},
  data() {
    return {};
  },
};
</script>
