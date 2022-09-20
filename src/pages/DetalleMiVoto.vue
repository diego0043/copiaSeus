<template>
  <div class="flex flex-center">
    <div class="row">
      <div class="col-12">
        <DetalleVoto :nameVotacion="this.$route.params.nameVotacion" />
      </div>
    </div>
  </div>
</template>

<script>
import DetalleVoto from "src/components/DetalleVoto.vue";
export default {
  props: {
    nameVotacion: String,
  },
  components: { DetalleVoto },
  data() {
    return {};
  },
};
</script>
