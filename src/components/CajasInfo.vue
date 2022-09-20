<template>
  <div class="q-pt-xl">
    <div class="row justify-center q-mt-xl q-pt-xl">
      <q-card bordered class="col my-card" style="position: absolute">
        <q-separator color="dark" class="q-mx-xs q-mt-xs" style="height: 5px" />
        <q-card-section class="">
          <div class="text-h6 text-start">+812</div>
          <div class="text-subtitle2">
            Usuarios <i class="fa fa-users q-ml-xl"></i>
          </div>
        </q-card-section>
      </q-card>

      <q-card
        bordered
        class="col my-card"
        style="position: relative; bottom: 80px; left: 100px"
      >
        <q-separator color="red" class="q-mx-xs q-mt-xs" style="height: 5px" />
        <q-card-section class="">
          <div class="text-h6 text-start">+1,466</div>
          <div class="text-subtitle2">
            Descargas <i class="fa fa-download q-ml-xl"></i>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CajasInfo",

  data() {
    return {
      descargas: 0,
      usuarios: 0,
    };
  },

  props: {},
});
</script>
