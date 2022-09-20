<template>
  <q-page class="">
    <AdminElecciones />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import AdminElecciones from "components/AdminElecciones.vue";

export default defineComponent({
  name: "admin",
  components: {
    AdminElecciones,
  },
});
</script>
