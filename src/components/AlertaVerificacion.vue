<template>
  <div>
    <q-dialog v-model="open" persistent>
      <q-card class="my-card">
        <q-card-section
          class="row items-center q-pb-none"
          style="transform: translateY(-15%)"
        >
          <q-space />
          <q-btn icon="close" flat round dense @click="closeModal">
            <q-tooltip> Close Alert </q-tooltip>
          </q-btn>
        </q-card-section>
        <q-img src="../assets/img_verificarse.svg" width="300px" />
        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">{{ mensaje.titulo }}</div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">¡Para continuar!</div>
          <div class="text-caption text-grey">Debes {{ mensaje.texto }}</div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            color="primary"
            :label="mensaje.btn"
            icon="login"
            @click="$router.push('/home')"
            class="style-btn"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "AlertaVerificacion",
  props: ["mensaje"],
  data() {
    return {
      open: false,
    };
  },
  methods: {
    closeModal() {
      this.open = false;
    },
    show() {
      this.open = true;
    },
  },
};
</script>

<style scope>
.style-btn {
  border-radius: 15px;
  width: 140px;
}
</style>
