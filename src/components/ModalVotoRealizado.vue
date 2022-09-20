<template>
  <div>
    <q-dialog persistent v-model="open">
      <q-card>
        <q-card-section v-if="voto_realizado == false">
          <q-img width="300px" src="../assets/gifs/90741-round-loader.gif">
          </q-img>
        </q-card-section>

        <q-card-section v-if="voto_realizado == true">
          <q-img width="300px" src="../assets/gifs/90846-loading-rocket.gif">
          </q-img>
        </q-card-section>

        <!-- titulo o mensaje principal -->
        <q-card-section
          v-if="voto_realizado == false"
          class="texto_guardando text-grey"
        >
          Guardando voto...
        </q-card-section>

        <q-card-section
          v-if="voto_realizado == true"
          class="texto_guardando text-grey"
        >
          ¡Tu voto se registro exitosamente!
        </q-card-section>

        <q-card-section v-if="voto_realizado == true" class="q-mt-lg">
          <button class="btn-style" @click="regresar_votaciones">
            OK
          </button>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "ModalVotoRealizado",
  props: {
    voto_realizado: Boolean,
  },
  data() {
    return {
      open: false,
      progress1: 0.3,
      progress2: 30,
    };
  },
  methods: {
    regresar_votaciones() {
      this.$router.push({
        name: "detalle",
      });
    },
    show() {
      this.open = true;
    },
  },
};
</script>

<style scoped>
.texto_guardando {
  text-align: center;
  font-weight: bold;
  font-size: 1.4em;
  margin-top: -20px;
}

.porcentaje {
  text-align: center;
}

.btn-style {
  border-radius: 15px;
  min-width: 140px;
  width: 80%;
  background-color: white;
  color: #699bf7;
  border: 1px solid #699bf7;
  padding-bottom: 5px;
  position: absolute;
  bottom: 15px;
  padding-top: 5px;
  margin-left: 10px;
}

.btn-style:hover {
  background-color: rgba(105, 155, 247, 0.06);
}
</style>
