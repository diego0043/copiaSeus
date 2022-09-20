<template>
  <div class="q-pa-md" style="width: 1000px">
    <div class="row">
      <div class="col-10">
        <img src="~assets/seusappLogo.png" style="width: 100%; height: 100%" />
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md">
        <q-list bordered class="rounded-borders">
          <q-item-label header
            >Elecciones Creadas
            <q-item-label align="right">
              <q-btn
                round
                color="secondary"
                icon="how_to_vote"
                size="sm"
                @click="
                  $router.push({
                    name: 'adminElecciones',
                  })
                "
              />
            </q-item-label>
          </q-item-label>

          <q-item v-for="(eleccion, key) in elecciones" :key="key">
            <q-item-section avatar top>
              <q-icon name="fact_check" color="green" size="34px" />
            </q-item-section>

            <q-item-section top class="col-2 gt-sm">
              <q-item-label class="q-mt-sm"
                >Eleccion {{ key + 1 }}</q-item-label
              >
            </q-item-section>

            <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-medium">{{ eleccion.nombre }}</span>
              </q-item-label>
              <q-item-label caption lines="1">
                Fecha inicio:
                {{ eleccion.fechaDesde.toDate().toLocaleString() }}
              </q-item-label>
              <q-item-label caption lines="1">
                Fecha finalizacion:
                {{ eleccion.fechaHasta.toDate().toLocaleString() }}
              </q-item-label>
              <q-item-label
                lines="1"
                class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase"
              >
              </q-item-label>
            </q-item-section>

            <q-item-section top side>
              <div class="text-grey-8">
                <q-btn
                  size="12px"
                  flat
                  dense
                  round
                  icon="visibility"
                  @click="
                    $router.push({
                      name: 'vereleccion',
                      params: {
                        id: eleccion.id,
                      },
                    })
                  "
                />
              </div>
            </q-item-section>
          </q-item>

          <q-separator spaced />
        </q-list>
      </div>
      <div class="col-12 col-md">
        <q-card class="my-card rounded-borders" flat bordered>
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2942/2942813.png"
                />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>Administradores: Personas con Acesso </q-item-label>
              <q-item-label caption>
                Lista Actualizada
                <q-item-label align="right">
                  <q-btn
                    round
                    color="secondary"
                    icon="manage_accounts"
                    size="sm"
                    @click="
                      $router.push({
                        path: '/desktop/padron',
                      })
                    "
                  />
                </q-item-label>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-list bordered class="rounded-borders">
            <q-item
              v-for="(admin, key) in admins"
              :key="key"
              class="q-my-sm"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  {{ admin.nombre.charAt(0).toUpperCase() }}
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ admin.nombre }}</q-item-label>
                <q-item-label caption lines="1">{{
                  admin.correo
                }}</q-item-label>
              </q-item-section>
              <q-item-section top side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn size="12px" flat dense round icon="perm_identity" />
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../boot/db";

export default {
  setup() {
    return {};
  },
  data() {
    return {
      elecciones: [],
      candidatos: [],
      admins: [],
      contador: 0,
    };
  },
  methods: {
    //metodo que sirve para poder obtener la lista de administradores.
    async obtenerAdmin() {
      try {
        const admins = await db.collection("comiteelectoral").get();
        admins.forEach((element) => {
          let admin = {
            nombre: element.data().nombre,
            carnet: element.data().carnet,
            carrera: element.data().carrera,
            dui: element.data().dui,
            correo: element.data().correo,
          };
          this.admins.push(admin);
        });
      } catch (error) {
        console.log("No se ha podido recuperar admins; ERROR:" + error);
      } finally {
      }
    },
    //metodo que sirve para obtener las elecciones
    async obtenerElecciones() {
      try {
        this.$q.loading.show();
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

          let candidatos = element.data().candidatos;
          candidatos.forEach((data) => {
            let candidato = {
              nombre: data.nombre,
              descripcion: data.descripcion,
              imagen: data.imagen,
              eleccion: element.data().nombre,
            };
            //-------haciendo validacion para evitar candidatos duplicados en el array------------------
            if (!this.candidatos.includes(candidato)) {
              this.candidatos.push(candidato);
            }

            //------------------------------------------------------------------------------------------
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.$q.loading.hide();
      }
    },
  },
  created() {
    this.obtenerElecciones();
    this.obtenerAdmin();
  },
};
</script>

<style></style>
