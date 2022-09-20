<template>
  <blockchain-data></blockchain-data>
  <tab-bloques></tab-bloques>
</template>

<script>
import BlockchainData from "src/components/BlockchainData.vue";
import TabBloques from "src/components/TabBloques.vue";
export default {
  components: { BlockchainData, TabBloques },
  props: {},
  data() {
    return {};
  },
};
</script>
