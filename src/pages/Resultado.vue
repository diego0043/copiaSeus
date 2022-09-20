<template>
  <div class="flex flex-center">
    <div class="row">
      <div class="col-12">
        <PanelResultadov2 />
      </div>
    </div>
  </div>
</template>

<script>
import PanelResultadov2 from "src/components/PanelResultadov2.vue";
import { mapActions } from "vuex";
export default {
  components: { PanelResultadov2 },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["isValidate_usr"]),
  },
  created() {
    this.isValidate_usr();
  },
  onload() {
    this.isValidate_usr();
  },
};
</script>

<style></style>
