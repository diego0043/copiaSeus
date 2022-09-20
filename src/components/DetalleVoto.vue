<template>
  <div v-if="data_carg == false" class="splash_screen">
    <q-img src="../assets/gifs/62694-space.gif"></q-img>
    <div class="row container q-ml-lg text-grey text-h4">
      <div class="col-1 circular-item">
        <q-circular-progress
          indeterminate
          size="20px"
          color="blue"
          class="q-ma-md"
        />
      </div>
      <div class="col text-h5 q-mt-sm q-ml-md">
        <span class="text-loading">Espera un momento...</span>
      </div>
    </div>
  </div>

  <div v-if="data_carg == true" class="col-12 bg-white">
    <q-page>
      <div class="flex flex-center">
        <h1 id="titulo">DETALLE DE TU VOTO</h1>
      </div>

      <div class="flex flex-center q-mb-xl">
        <div class="contenedor">
          <!-- foto y info del candidato-->
          <div class="row bg-white shadow-5 card-principal">
            <div class="col-4">
              <q-img
                class="image container-img"
                src="../assets/personal_info2.svg"
              />
            </div>
            <!-- Informacion de la eleccion -->
            <div class="col q-mt-md q-ml-md">
              <div class="titulo">DATOS DE LA ELECCIÓN</div>

              <div class="q-ml-lg q-mt-sm q-mb-sm sub-principal">
                NOMBRE DE LA ELECCIÓN<br />
                <span class="text-weight-regular text-grey-8">{{
                  detalle_voto.nombre
                }}</span>
              </div>
              <div class="q-ml-lg q-mt-xs q-mb-sm sub-principal">
                INICIO EL DÍA<br />
                <span class="text-weight-regular text-grey-8">{{
                  detalle_voto.diaInicio
                }}</span>
              </div>
              <div class="q-ml-lg q-mt-xs sub-principal">
                TERMINO EL DÍA<br />
                <span class="text-weight-regular text-grey-8">{{
                  detalle_voto.diaCierre
                }}</span>
              </div>
            </div>
          </div>

          <!-- DIA -->
          <div class="row q-mt-xl bg-white card-info shadow-5">
            <div class="col text-informacion text-grey-8">
              <q-img
                class="img-info"
                src="../assets/assets_detalleVoto/date.svg"
              >
              </q-img>
            </div>

            <div class="col-8 q-ml-md mt sub-titulos">
              <div class="row items">DÍA</div>

              <div class="row q-mt-sm text-weight-regular text-grey-8 items">
                {{ detalle_voto.dia }}
              </div>
            </div>
          </div>

          <!-- HORA -->
          <div class="row q-mt-lg bg-white card-info shadow-5">
            <div class="col text-informacion text-grey-8">
              <q-img
                class="img-info"
                src="../assets/assets_detalleVoto/watch.svg"
              >
              </q-img>
            </div>

            <div class="col-8 q-ml-md mt sub-titulos">
              <div class="row items">HORA</div>

              <div class="row q-mt-sm text-weight-regular text-grey-8 items">
                {{ detalle_voto.hora }}
              </div>
            </div>
          </div>

          <!-- GPS -->
          <div class="row q-mt-lg bg-white card-info shadow-5">
            <div class="col text-informacion text-grey-8">
              <q-img
                class="img-info"
                src="../assets/assets_detalleVoto/gps.svg"
              >
              </q-img>
            </div>

            <div class="col-8 q-ml-md mt sub-titulos">
              <div class="row items">GPS</div>

              <div class="row q-mt-sm text-weight-regular text-grey-8 items">
                lat: {{ detalle_voto.lat }} , long: {{ detalle_voto.long }}
              </div>
            </div>
          </div>

          <!-- ID BLOCKCHAIN -->
          <div class="row q-mt-lg bg-white card-info shadow-5">
            <div class="col text-informacion text-grey-8">
              <q-img
                class="img-info"
                src="../assets/assets_detalleVoto/server.svg"
              >
              </q-img>
            </div>

            <div class="col-8 q-ml-md mt sub-titulos">
              <div class="row items">
                <div class="col-9">
                  <div class="row">ID BLOQUE</div>

                  <div class="row q-mt-sm text-weight-regular text-grey-8">
                    {{ detalle_voto.bloque }}
                  </div>
                </div>
                <div class="col">
                  <button class="btn-style-copy">
                    <q-icon class="icon-copy" name="content_copy" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- DISPOSITIVO -->
          <div class="row q-mt-lg bg-white card-info shadow-5">
            <div class="col text-informacion text-grey-8">
              <q-img
                class="img-info"
                src="../assets/assets_detalleVoto/phone.svg"
              >
              </q-img>
            </div>

            <div class="col-8 q-ml-md mt sub-titulos">
              <div class="row items">DISPOSITIVO</div>

              <div class="row q-mt-sm text-weight-regular text-grey-8 items">
                {{ detalle_voto.dispositivo }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { db } from "src/boot/db";
export default {
  props: {
    nameVotacion: String,
    url_imagen: String,
  },
  data() {
    return {
      detalle_voto: [],
      data_carg: false,
    };
  },
  computed: {
    ...mapGetters(["id_doc_actual", "uidStutent"]),
  },

  methods: {
    toastMenssageCopy() {
      this.$q.notify({
        type: "positive",
        message: `Bloque copiado`,
      });
    },

    async findData(id_user, id_doc) {
      // item.fechaHasta.toDate().toLocaleString()
      const doc = await db.collection("alumnos").doc(id_user).get();
      const registro_elecciones = doc.data().registro_votaciones;
      const detalle = registro_elecciones.filter(
        (item) => item.idEleccion == id_doc
      );

      const data_voto = {
        nombre: detalle[0].nombreEleccion,
        diaInicio: detalle[0].diaInicioEleccion.toDate().toLocaleString(),
        diaCierre: detalle[0].diaFinalEleccion.toDate().toLocaleString(),
        dia: detalle[0].diaRealizacionVoto,
        hora: detalle[0].horaRealizacionVoto,
        lat: detalle[0].gps.latitud,
        long: detalle[0].gps.longitud,
        bloque: detalle[0].idBloque,
        dispositivo: detalle[0].dispositivo,
      };

      this.detalle_voto = data_voto;
      this.data_carg = true;
    },
  },

  created() {
    setTimeout(() => this.findData(this.uidStutent, this.id_doc_actual), 1000);
  },
};
</script>

<style scoped>
@import "../css/titulo.css";

.contenedor {
  min-width: 80%;
  width: 90%;
  min-height: 55vh;
}

.titulo {
  display: inline-block;
  margin-left: -50px;
  font-weight: bold;
  font-size: 1.3rem;
  color: #699bf7;
}

#titulo {
  color: #699bf7;
  padding: 10px;
}

.sub-titulos {
  font-weight: bold;
  font-size: 1rem;
  margin-top: 5%;
  color: #699bf7;
}

.text-informacion {
  margin-top: 5%;
}

.text-loading {
  text-align: center;
}

.card-info {
  height: 100px;
  border-radius: 18px;
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  justify-content: space-between;
  align-items: flex-start;
}

.card-principal {
  border-radius: 20px;
  height: 240px;
}

.img-info {
  top: auto;
  width: 50px;
  height: auto;
  margin-left: 25%;
  /*margin-bottom: %;*/
}

.subtitulos-color {
  color: #699bf7;
  font-weight: bold;
}

.sub-principal {
  color: #699bf7;
  font-weight: bold;
}

.mt {
  margin-top: 20px !important;
}

.container-img {
  margin-left: 5px;
  margin-top: 60px;
  width: 135px;
}

.btn-style-copy {
  background-color: white;
  border: none;
  width: 50px;
  padding: 10px;
}

.text-loading {
  margin-left: 20px;
}

.icon-copy {
  color: grey;
  font-size: 2em;
}

.icon-copy:active {
  color: #699bf7;
}

.items {
  margin-left: -20px;
}

@media (min-width: 500px) {
  .container-img {
    margin-left: 20px;
    margin-bottom: 0px;
    margin-top: 20px;
    width: 80%;
  }
}

@media (max-width: 350px) {
  .ml {
    margin-left: 13px;
  }
}

.splash_screen {
  margin-top: 100px;
}
</style>
