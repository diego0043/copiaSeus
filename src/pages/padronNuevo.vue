<template>
  <div class="q-mx-lg">
    <NuevoPadron />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import NuevoPadron from "components/NuevoPadron.vue";

export default defineComponent({
  name: "nuevoRegistro",
  components: {
    NuevoPadron,
  },
});
</script>

<style></style>
