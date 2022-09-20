<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      label="Agregar Nuevo Candidato"
      color="secondary"
      icon="person_add"
      @click="fixed = true"
    />

    <q-dialog v-model="fixed">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="bg-light-green-8">
          <div class="text-white text-h5">
            Nuevo Candidato: {{ eleccion.titulo }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section
          style="max-height: 50vh bg-light-green-3"
          class="scroll"
        >
          <div class="row" justify-center>
            <div class="col" style="margin-top: 20px; margin-left: 30px">
              <div class="col">
                <q-img
                  style="height: 140px; width: 200px"
                  class="col-2 justify-around q-px-md"
                  :src="foto"
                />
              </div>
            </div>
            <div class="col">
              <div class="q-pa-md">
                <div class="q-gutter-sm row items-start">
                  <q-file
                    filled
                    bottom-slots
                    v-model="imagn"
                    label="Subir imagen"
                    counter
                    max-files="1"
                    accept="image/*"
                    :rules="imgRules"
                    required
                  >
                    <template v-slot:before>
                      <q-icon name="folder_open" />
                    </template>

                    <template v-slot:hint> Field hint </template>

                    <template v-slot:append>
                      <q-btn round dense flat icon="add" @click.stop />
                    </template>
                  </q-file>
                </div>
              </div>
            </div>
          </div>
          <div class="row" justify-center>
            <div class="col">
              <div class="q-pa-md text-h6">Nombre:</div>
            </div>
            <div class="col">
              <div class="q-pa-md">
                <div class="q-gutter-md" style="max-width: 300px">
                  <q-input
                    standout="bg-teal text-white"
                    v-model="nom"
                    :rules="txtRules"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row" justify-center>
            <div class="col">
              <div class="q-pa-md text-h6">Descripción:</div>
            </div>
            <div class="col">
              <div class="q-pa-md q-gutter-sm">
                <q-editor
                  v-model="desc"
                  :definitions="{
                    bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' },
                  }"
                />
              </div>
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
            @click="nuevoCandidato"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { db, storage, FieldValue } from "src/boot/db";
export default {
  data() {
    return {
      basic: false,
      fixed: false,
    };
  },
  data() {
    return {
      model: null,
      text: "",
      desc: "",
      nom: "",
      imagn: null,
      imagenes: [],
      foto: "",
      downloadURL: "",
      votosCandidato: 0,
      newCandidato: {},
      titulo: "",
      eleccion: [],
      imgRules: [(v) => !!v || "Debe agregar una imagen"],

      txtRules: [(v) => !!v || "Este campo es requerido"],
    };
  },
  created() {
    this.leerDatos();
  },
  methods: {
    leerDatos() {
      const docRef = db.collection("elecciones").doc(this.$route.params.id);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            // console.log("Document data:", doc.data());
            let eleccion = {
              titulo: doc.data().nombre,
            };
            this.eleccion = eleccion;
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    },

    nuevoCandidato() {
      try {
        if (this.nom != "" && this.desc != "" && this.imagn != null) {
          const ref = storage.ref();
          const carpeta = this.$route.params.id;
          const refImg = ref.child(`${carpeta}/` + this.nom);
          refImg.put(this.imagn).then(() => {
            refImg.getDownloadURL().then((url) => {
              this.downloadURL = url;
              this.imagn = null;

              this.newCandidato = {
                nombre: this.nom,
                descripcion: this.desc,
                imagen: this.downloadURL,
                votos: this.votosCandidato,
              };
              const query = db
                .collection("elecciones")
                .doc(this.$route.params.id)
                .update({
                  candidatos: FieldValue.arrayUnion(this.newCandidato),
                });
              this.$emit("crear", this.newCandidato);
              this.nom = "";
              this.desc = "";
            });
          });

          this.$q.notify({
            message: "Candidato creado con éxito!",
            color: "dark",
            textColor: "white",
            icon: "cloud_done",
          });
        } else {
          this.$q.notify({
            message: "Debe llenar todos los campos",
            color: "red",
            textColor: "white",
            icon: "clear",
          });
          this.nom = "";
          this.desc = "";
          this.imagn = "";
        }
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
    },
  },
};
</script>
