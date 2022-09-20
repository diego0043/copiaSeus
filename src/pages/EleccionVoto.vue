<template>
  <div class="flex flex-center">
    <div class="row">
      <div class="col-12">
        <ContainerCandidatos :nameVotacion="this.$route.params.nameVotacion" />
      </div>
    </div>
  </div>
</template>

<script>
import ContainerCandidatos from "src/components/ContainerCandidatos.vue";
export default {
  components: { ContainerCandidatos },
  props: {
    nameVoto: String,
  },
  data() {
    return {};
  },
};
</script>
