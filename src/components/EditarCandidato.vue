<template>
  <div>
    <!--Boton para editar candidato-->
    <q-item-label align="right">
      <q-btn
        round
        color="secondary"
        icon="edit"
        size="md"
        glossy
        @click="confirm = true"
      />
    </q-item-label>
    <!--Boton para eliminar candidato-->
    <q-item-label align="right">
      <q-btn
        round
        color="red"
        icon="delete"
        size="md"
        glossy
        @click="eliminarCandidato()"
      />
    </q-item-label>
    <q-dialog v-model="confirm" persistent>
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="bg-secondary">
          <div class="text-white text-h5">
            <q-icon name="edit" size="md"></q-icon>Editar Candidato
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section
          style="max-height: 50vh bg-light-green-3"
          class="scroll"
        >
          <div class="row" justify-center>
            <div class="col" style="margin-top: 20px">
              <div class="col">
                <p class="text-subtitle2">Imagen actual</p>
                <q-separator />
                <q-img
                  style="height: 140px; width: 200px"
                  class="col-2 justify-around q-px-md"
                  :src="imagenCandidato"
                />
                <q-separator />
              </div>
            </div>
            <div class="col">
              <div class="q-pa-md">
                <div class="q-gutter-sm row items-start">
                  <q-file
                    filled
                    bottom-slots
                    v-model="file"
                    label="Cambiar imagen"
                    counter
                    max-files="1"
                    id="seleccionArchivos"
                    @change="cargarImagen"
                  >
                    <template v-slot:before>
                      <q-icon name="image" />
                    </template>

                    <template v-slot:hint> Field hint </template>

                    <template v-slot:append>
                      <q-btn round dense flat icon="folder_open" @click.stop />
                    </template>
                  </q-file>
                </div>
              </div>
            </div>
          </div>
          <div class="row" justify-center>
            <div class="col text-subtitle2" style="margin-top: 20px">
              Nombre:
            </div>
            <div class="col-9" style="margin-top: 20px">
              <q-input outlined v-model="nombreCandidato"
                ><template v-slot:prepend> <q-icon name="edit" /> </template
              ></q-input>
            </div>
          </div>
          <div class="row" justify-center>
            <div class="col text-subtitle2" style="margin-top: 20px">
              Descripción:
            </div>
            <div class="col-9" style="margin-top: 20px">
              <q-editor
                v-model="descripcionCandidato"
                :definitions="{
                  bold: {
                    label: 'Bold',
                    icon: null,
                    tip: 'My bold tooltip',
                  },
                }"
              />
            </div>
          </div>
        </q-card-section>
        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Salir" color="secondary" v-close-popup />
          <q-btn
            flat
            label="Guardar"
            color="secondary"
            v-close-popup
            @click="updateCandidato()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { defineComponent } from "vue";
import { db, storage, FieldValue } from "../boot/db";

export default defineComponent({
  components: {},
  setup() {
    return { confirm: ref(false) };
  },
  props: ["nombre", "descripcion", "imagen", "candidatos", "votos"],
  data() {
    return {
      descripcionCandidato: "",
      nombreCandidato: "",
      imagenCandidato: "",
      votosCandidato: 0,
      urlImagen: "",
      IDEleccion: "",
      ArrayCandidatos: this.candidatos,
      currentCandidato: {},
      newCandidato: {},
      idRef: null,
      progressUpload: 0,
      file: null,
      fileName: "",
      uploadTask: false,
      uploading: false,
      downloadURL: "",
      archivos: [],
      uploadEnd: false,
      imageData: null,
    };
  },
  methods: {
    uploadImagen(idEleccion, nombre) {
      this.fileName = this.file.name;
      this.uploading = true;
      var archivo = storage.ref("" + idEleccion + "/" + nombre);
      archivo
        .put(this.file)
        .then(() => {
          this.uploadEnd = true;
          archivo.getDownloadURL().then((url) => {
            this.downloadURL = url;
            this.uploading = false;
            this.file = null;
            // console.log("downloadURL:", this.downloadURL);
            //aqui se hace la operacion de actualizacion despues de subir la imagen porque ya tengo la url
            //nuevos valores del candidato
            this.newCandidato = {
              nombre: this.nombreCandidato,
              descripcion: this.descripcionCandidato,
              imagen: this.downloadURL,
              votos: this.votosCandidato,
            };
            // agregando candidato con nuevos valores
            const query2 = db
              .collection("elecciones")
              .doc(this.$route.params.id)
              .update({
                candidatos: FieldValue.arrayUnion(this.newCandidato),
              });
            //emitiendo un evento para actualizar el arreglo de candidatos
            this.$emit("actualizar", this.newCandidato);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async updateCandidato() {
      //-----------------------------------metodo para editar un candidato------------------------
      //metodo para actualizar candidato
      try {
        this.$q.loading.show();

        this.currentCandidato = {
          nombre: this.nombre,
          descripcion: this.descripcion,
          imagen: this.imagen,
          votos: this.votosCandidato,
        };

        //borrando candidato con valores actuales
        const query1 = await db
          .collection("elecciones")
          .doc(this.$route.params.id)
          .update({
            candidatos: FieldValue.arrayRemove(this.currentCandidato),
          });
        //emitiendo evento para borrar
        this.$emit("borrar", this.currentCandidato);

        if (this.file != null) {
          //si se va cambiar la foto se ejecuta este codigo
          //subiendo imagen, el canditato se actualiza hasta que se sube la imagen.
          this.uploadImagen(this.$route.params.id, this.nombreCandidato);
        } else {
          this.newCandidato = {
            nombre: this.nombreCandidato,
            descripcion: this.descripcionCandidato,
            imagen: this.imagen,
            votos: this.votosCandidato,
          };
          // agregando candidato con nuevos valores
          const query = db
            .collection("elecciones")
            .doc(this.$route.params.id)
            .update({
              candidatos: FieldValue.arrayUnion(this.newCandidato),
            });
          //emitiendo un evento
          this.$emit("actualizar", this.newCandidato);
        }

        //mostrando notificacion
        this.$q.notify({
          message: "Candidato actualizado con éxito!",
          color: "dark",
          textColor: "white",
          icon: "cloud_done",
        });
      } catch (error) {
        this.$q.notify({
          message:
            "Error: ha ocurrido un error al actualizar el candidato" + error,
          color: "red",
          textColor: "white",
          icon: "clear",
        });
      } finally {
        this.$q.loading.hide();
      }
    },
    async eliminarCandidato() {
      //------------------metodo para elminar un candidato----------------------------

      try {
        this.$q.loading.show();
        console.log("votos dentro de eliminar: ", this.votosCandidato);
        console.log(
          "nombre de eliminar: ",
          this.nombre,
          this.descripcion,
          this.imagen
        );
        this.currentCandidato = {
          nombre: this.nombreCandidato,
          descripcion: this.descripcion,
          imagen: this.imagen,
          votos: this.votosCandidato,
        };
        //eliminando el candidato
        const query = await db
          .collection("elecciones")
          .doc(this.$route.params.id)
          .update({
            candidatos: FieldValue.arrayRemove(this.currentCandidato),
          });
        //eliminando la imagen del storage
        // Create a reference to the file to delete
        var desertRef = storage.ref(
          "" + this.$route.params.id + "/" + this.currentCandidato.nombre
        );

        // Delete the file
        desertRef
          .delete()
          .then(() => {
            // File deleted successfully
            console.log("imagen del candidato eliminada");
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
            console.log("ha ocurrido un error al borrar la imagen:", error);
          });

        //emitiendo un evento para borrar candidato
        this.$emit("borrar", this.currentCandidato);

        //mostrando notificacion
        this.$q.notify({
          message: "Candidato Eliminado con éxito!",
          color: "dark",
          textColor: "white",
          icon: "cloud_done",
        });
      } catch (error) {
        this.$q.notify({
          message:
            "Error: ha ocurrido un error al eliminar el candidato" + error,
          color: "red",
          textColor: "white",
          icon: "clear",
        });
      } finally {
        this.$q.loading.hide();
      }
    },
    cargarImagen(event) {
      // Obtener referencia al input y a la imagen #seleccionArchivos #imagenPrevisualizacion
      //console.log(event.target.files);
    },
  },
  computed() {},
  mounted() {
    this.descripcionCandidato = this.descripcion;
    this.nombreCandidato = this.nombre;
    this.imagenCandidato = this.imagen;
    this.votosCandidato = this.votos;
    //console.log("votos: ", this.votosCandidato);
  },
});
</script>
