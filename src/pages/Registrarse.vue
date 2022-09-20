<template>
  <q-page class="row">
    <!-- Registrarse -->
    <div class="col col-sm-12 col-md-6 q-pt-xl">
      <Signin />
      <!--  <registro-usuario />-->
    </div>

    <!--info usuarios y descargas  -->
    <div class="col col-md-6 gt-sm bg-primary q-pt-xl">
      <div class="row q-mt-lg justify-center">
        <!--cajas usuarios y descargas -->
        <cajas-info />
      </div>

      <div class="row q-mt-lg justify-center">
        <p class="text-white text-bold text-h3 text-center q-py-xl">
          Descubre una nueva forma de Votar.
          <span class="text-h6 text-italic tetx-white" style="display: block">
            Voto seguro, fácil y rapido.
          </span>
        </p>
      </div>

      <div class="row q-mt-lg justify-center q-pt-md">
        <i class="fa fa-circle q-ml-xl text-white"></i>
        <i class="fa fa-circle q-ml-xl text-white"></i>
        <i class="fa fa-circle q-ml-xl text-white"></i>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
//import RegistroUsuario from "components/RegistroUsuario.vue";
import CajasInfo from "components/CajasInfo.vue";
import Signin from "src/components/Signin.vue";

export default defineComponent({
  name: "PageRegistrarse",
  components: {
    //RegistroUsuario,
    CajasInfo,
    Signin,
  },
});
</script>

<style></style>
