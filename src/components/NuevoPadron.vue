<template>
  <div class="container">
    <div class="text-h5">
      <q-page-sticky position="top-right" :offset="[18, 18]">
        <q-btn
          push
          round
          color="secondary"
          icon="arrow_back_ios_new"
          @click="$router.push({ path: '/desktop/padron' })"
        />
      </q-page-sticky>
      <b>Agregar a un administrador (Comite Electoral)</b>
    </div>
    <div class="q-pa-md">
      <div class="row justify-center">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
          style="min-width: 50%"
        >
          <q-input
            filled
            v-model="nuevoPadron.nombre"
            label="Nombre"
            hint="Escriba su nombre completo"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Tiene que escribir su nombre',
            ]"
          />
          <q-input
            filled
            v-model="nuevoPadron.carnet"
            label="Carnet"
            hint="Escriba su carnet"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Tiene su escribir su carnet',
            ]"
          />

          <q-select
            filled
            :options="options"
            v-model="nuevoPadron.carrera"
            label="Carrera"
          />

          <q-input
            filled
            v-model="nuevoPadron.dui"
            label="DUI"
            hint="Digite su DUI"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Tiene que digitar su DUI',
            ]"
          />
          <q-input
            filled
            v-model="nuevoPadron.correo"
            label="Correo"
            hint="Escriba su correo institucional"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Tiene su escribir su correo institucional',
            ]"
          />

          <div>
            <q-btn
              label="Aceptar"
              type="submit"
              color="primary"
              @click="sendData"
            />
            <q-btn
              label="Cancelar"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { db } from "../boot/db";

export default defineComponent({
  name: "NuevoPadron",

  data() {
    return {
      nuevoPadron: {
        nombre: null,
        carnet: null,
        dui: null,
        correo: null,
        carrera: null,
      },
      options: [
        "Ing. de sistemas",
        "Ing. Industrial",
        "Abogado",
        "Ing. quimica",
        "Ing. Civil",
        "Contaduria",
        "Administracion de empresas",
        "Medicina",
        "Biologia",
        "Mercadeo",
        "Profesorado",
      ],
      accept: false,
    };
  },
  methods: {
    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Aceptado",
        });
      }
    },
    onReset() {
      this.name = null;
      this.carnet = null;
      this.dui = null;
      this.direccion = null;
      this.accept = false;
    },
    async sendData() {
      try {
        await db.collection("comiteelectoral").add(this.nuevoPadron);
        this.$router.push("padron");
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>
