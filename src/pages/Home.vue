<template>
  <q-page class="flex flex-center">
    <verificacion />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import Verificacion from "src/components/Verificacion.vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "PageHome",
  components: {
    Verificacion,
  },
  methods: {
    ...mapActions(["isValidate_usr", "loadCarnet"]),
  },
  created() {
    this.loadCarnet();
    this.isValidate_usr();
  },
  onload() {
    this.isValidate_usr();
  },
});
</script>
