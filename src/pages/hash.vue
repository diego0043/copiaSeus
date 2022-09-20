<template>
  <q-breadcrumbs active-color="white" style="font-size: 16px">
    <q-breadcrumbs-el label="Inicio" icon="home" />
    <q-breadcrumbs-el label="Blockchain" icon="widgets" />
    <q-breadcrumbs-el label="Bloques" />
    <q-breadcrumbs-el label="Bloque" />
  </q-breadcrumbs>
  <tabla-bloque></tabla-bloque>
</template>

<script>
import TablaBloque from "src/components/TablaBloque.vue";
export default {
  components: { TablaBloque },
  props: {},
  data() {
    return {};
  },
};
</script>
