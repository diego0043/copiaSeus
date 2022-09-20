<template>
  <q-page class="">
    <Logueo />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import Logueo from "components/Logueo.vue";

export default defineComponent({
  name: "PageIndex",
  components: {
    Logueo,
  },
});
</script>
