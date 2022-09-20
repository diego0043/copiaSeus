<template>
  <q-page class="flex flex-center">
    <resumendesktop />
  </q-page>
</template>

<script>

import { defineComponent } from "vue";
import resumendesktop from "src/components/resumendesktop.vue"
export default defineComponent({
  name: "PageDesktop",
  components: {
    resumendesktop


  },
});
</script>

