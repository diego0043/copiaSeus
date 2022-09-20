<template>
  <div class="q-mx-lg">
    <RegistroUsuario />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import RegistroUsuario from "src/components/RegistroUsuario.vue";

export default defineComponent({
  name: "nuevoRegistro",
  components: {
    RegistroUsuario,
  },
});
</script>

<style></style>
