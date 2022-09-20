<template>
  <div>
    <div class="container">
      <div class="text-h4"><b>Comite Electoral</b></div>
      <div class="row">
        <div class="col-12">
          <div class="row justify-end items-center">
            <div class="text-subtitle-1 q-mx-sm">Buscar:</div>
            <q-input outlined v-model="search" dense>
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="col-12">
          <div class="row justify-between q-mt-md">
            <div class="row items-center">
              <q-btn color="green" push label="Excel" />
              <q-btn color="green" push label="CSV" class="q-mx-sm" />
            </div>
            <div class="row">
              <q-btn
                push
                icon="update"
                to="PadronNuevo"
                color="primary"
                label="Agregar nuevo registro"
              />
            </div>
          </div>
        </div>
        <div class="col-12 q-mt-md">
          <q-table
            :rows="comite"
            :columns="columns"
            row-key="name"
            :search="search"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.value }}
                </q-td>
                <q-td auto-width>
                  <q-btn-group>
                    <q-btn
                      color="red"
                      label="ELIMINAR"
                      icon="delete"
                      @click="borrarDato(props.row.id)"
                      dense
                    ></q-btn>
                    <q-btn
                      color="amber"
                      label="EDITAR"
                      icon="edit"
                      @click="editarModal(props.row)"
                      dense
                    ></q-btn>
                    <q-dialog v-model="icon">
                      <q-card>
                        <q-card-section class="row items-center q-pb-none">
                          <div class="text-h6">Editar {{ nombreEditar }}</div>
                          <q-space />
                          <q-btn icon="close" flat round dense v-close-popup />
                        </q-card-section>

                        <q-card-section>
                          <q-form
                            @submit="onSubmit"
                            @reset="onReset"
                            class="q-gutter-md"
                            style="min-width: 50%"
                          >
                            <q-input
                              filled
                              v-model="editarPadron.nombre"
                              label="Nombre"
                              hint="Escriba su nombre completo"
                              lazy-rules
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) ||
                                  'Tiene que escribir su nombre',
                              ]"
                            />
                            <q-input
                              filled
                              v-model="editarPadron.carnet"
                              label="Carnet"
                              hint="Escriba su carnet"
                              lazy-rules
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) ||
                                  'Tiene su escribir su carnet',
                              ]"
                            />

                            <q-select
                              filled
                              :options="options"
                              v-model="editarPadron.carrera"
                              label="Carrera"
                            />

                            <q-input
                              filled
                              v-model="editarPadron.dui"
                              label="DUI"
                              hint="Digite su DUI"
                              lazy-rules
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) ||
                                  'Tiene que digitar su DUI',
                              ]"
                            />
                            <q-input
                              filled
                              v-model="editarPadron.correo"
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
                                color="blue"
                                @click="editData"
                              />
                            </div>
                          </q-form>
                        </q-card-section>
                      </q-card>
                    </q-dialog>
                  </q-btn-group>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { db } from "../boot/db";

export default defineComponent({
  name: "AdministracionPadron",

  data() {
    return {
      search: "",
      loading: false,
      columns,
      comite: [],
      icon: false,
      nombreEditar: null,
      editarPadron: {},
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
    };
  },
  methods: {
    editarModal(persona) {
      this.nombreEditar = persona.nombre + " - " + persona.carnet;
      const { id, nombre, carnet, dui, correo, carrera } = persona;
      this.editarPadron = { id, nombre, carnet, dui, carrera, correo };
      this.icon = true;
    },
    async leerDatos() {
      this.comite = [];
      try {
        const docRef = await db.collection("comiteelectoral").get();
        docRef.forEach((doc) => {
          let padroncomite = doc.data();
          padroncomite.id = doc.id;
          this.comite.push(padroncomite);
        });
      } catch (error) {
        console.error(error);
      }
    },
    async borrarDato(id) {
      try {
        await db.collection("comiteelectoral").doc(id).delete();
        this.leerDatos();
      } catch (error) {
        console.error(error);
      }
    },
    async editData() {
      try {
        await db
          .collection("comiteelectoral")
          .doc(this.editarPadron.id)
          .update(this.editarPadron);
        this.leerDatos();
        this.icon = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
  async created() {
    await this.leerDatos();
  },
  props: {},
});
const columns = [
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "left",
    field: (row) => row.nombre,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "carnet",
    label: "Carnet",
    field: "carnet",
    sortable: true,
    align: "left",
  },
  {
    name: "carrera",
    label: "Carrera",
    field: "carrera",
    sortable: true,
    align: "left",
  },
  { name: "dui", label: "DUI", field: "dui", align: "left" },
  { name: "correo", label: "Correo", field: "correo", align: "left" },
];
</script>
