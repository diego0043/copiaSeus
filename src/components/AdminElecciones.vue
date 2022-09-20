<template>
  <div class="q-pa-md">
    <h4 style="margin-top: 0px">ELECCIONES</h4>
    <AdminNuevaEleccion />
  </div>

  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Elecciones registradas</div>
      </q-card-section>

      <q-markup-table>
        <thead auto-width>
          <tr>
            <th class="text-left">Nombre</th>
            <th class="text-left">Fecha de inicio</th>
            <th class="text-left">Fecha de finalizacion</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(eleccion, key) in elecciones" :key="key">
            <td class="text-left">
              {{ eleccion.nombre }}
            </td>
            <td class="text-left">
              {{ eleccion.fechaDesde.toDate().toLocaleString() }}
            </td>
            <td class="text-left">
              {{ eleccion.fechaHasta.toDate().toLocaleString() }}
            </td>
            <q-td auto-width>
              <q-btn-group push>
                <q-btn
                  color="yellow"
                  glossy
                  push
                  label="EDITAR"
                  icon="edit"
                  @click="
                    $router.push({
                      name: 'editareleccion',
                      params: {
                        id: eleccion.id,
                      },
                    })
                  "
                  class="text-white btn-style q-pr-sm"
                />
                <q-btn
                  color="red"
                  glossy
                  push
                  label="ELIMINAR"
                  icon="delete"
                  @click="eliminar(index, eleccion.id)"
                />
                <q-btn
                  color="green"
                  glossy
                  push
                  label="CANDIDATO"
                  icon="people"
                  @click="
                    $router.push({
                      name: 'admincandidatos',
                      params: {
                        id: eleccion.id,
                      },
                    })
                  "
                  class="text-white btn-style q-pr-sm"
                >
                </q-btn>
              </q-btn-group>
            </q-td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>
  </div>
</template>

<script>
import { db, storage } from "../boot/db";
import { defineComponent } from "vue";
import AdminNuevaEleccion from "components/AdminNuevaEleccion";

export default defineComponent({
  components: {
    AdminNuevaEleccion,
  },

  setup() {
    return {};
  },
  data() {
    return {
      elecciones: [],
      candidatos: [],

      contador: 0,
    };
  },

  methods: {
    //metodo que sirve para obtener las elecciones
    async obtenerElecciones() {
      try {
        this.$q.loading.show({
          message: "Por favor, espere un momento...",
          position: "center",
        });
        const query = await db.collection("elecciones").get();
        query.forEach((element) => {
          let eleccion = {
            id: element.id,
            candidatos: element.data().candidatos,
            descripcion: element.data().descripcion,
            fechaDesde: element.data().fechaDesde,
            fechaHasta: element.data().fechaHasta,
            nombre: element.data().nombre,
          };
          this.elecciones.push(eleccion);
        });
        //console.log(this.candidatos);
      } catch (error) {
        console.log(error);
      } finally {
        this.$q.loading.hide();
      }
    },
    eliminar(index, id) {
      this.$q
        .dialog({
          title: "Cuidado!",
          message: "¿Esta seguro que quiere eliminar la elección?",
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          try {
            this.$q.loading.show();
            const query = await db.collection("elecciones").doc(id).delete();
            let elec = this.elecciones.filter((c) => c.id != id);
            this.elecciones = elec;
            this.$q.notify({
              message: "La eleccion ha sido eliminada con exito!",
              color: "green",
              textColor: "white",
              icon: "info_outline",
            });
          } catch (error) {
            this.$q.notify({
              message: error,
              color: "red",
              textColor: "white",
              icon: "clear",
            });
          } finally {
            this.$q.loading.hide();
          }
        });
    },
  },
  created() {
    this.obtenerElecciones();
  },
});
</script>

<style></style>
