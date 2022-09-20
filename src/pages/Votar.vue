<template>
  <div class="flex flex-center mobile-only">
    <div class="row">
      <div class="col-12">
        <InterfazElecciones />
      </div>
    </div>
  </div>
</template>

<script>
import InterfazElecciones from "src/components/InterfazElecciones.vue";
import { mapActions } from "vuex";
export default {
  components: { InterfazElecciones },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["loadCarnet", " device_info"]),
  },
  created() {
    this.loadCarnet();
  },
  onload() {
    this.device_info();
  },
};
</script>
