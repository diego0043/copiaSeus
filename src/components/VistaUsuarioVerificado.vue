<template>
  <div class="contenedor">
    <div class="row principal q-ml-md">
      <div class="col-8">
        <div class="row text-user2">Bienvenido,</div>
        <div class="row text-user">
          {{ name }} <q-icon class="q-ml-sm icon" name="verified"></q-icon>
        </div>
      </div>
    </div>
    <div class="row">
      <q-img class="img" src="../assets/gifs/102800-blue-circle.gif"></q-img>
    </div>

    <div class="shadow-2 items">
      <q-expansion-item
        class="overflow-hidden text-items"
        label="Información de tu dispositivo registrado"
        header-class="text-grey"
        expand-icon-class="text-blue-4"
      >
        <q-card>
          <q-card-section>
            <div class="row q-mb-md">
              <div class="col text-sub-title">Modelo:</div>
              <div class="col">{{ device.model }}</div>
            </div>
            <div class="row q-mb-md">
              <div class="col text-sub-title">Sistema Operativo:</div>
              <div class="col">{{ device.operatingSystem }}</div>
            </div>
            <div class="row q-mb-md">
              <div class="col text-sub-title">Manufacturado por:</div>
              <div class="col">{{ device.manufacturer }}</div>
            </div>
            <div class="row q-mb-md">
              <div class="col text-sub-title">Identificador unico</div>
              <div class="col">{{ device.id }}</div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>

    <div class="shadow-2 items q-mt-md">
      <q-expansion-item
        class="overflow-hidden text-items"
        label="Información personal"
        header-class="text-grey"
        expand-icon-class="text-blue-4"
      >
        <q-card>
          <q-card-section>
            <div class="row q-mb-md">
              <div class="col-3 text-sub-title">Nombre:</div>
              <div class="col">{{ user.nombre }}</div>
            </div>
            <div class="row q-mb-md">
              <div class="col-3 text-sub-title">Carnet:</div>
              <div class="col">{{ user.carnet }}</div>
            </div>
            <div class="row q-mb-md">
              <div class="col-3 text-sub-title">Telefono</div>
              <div class="col">{{ user.tel }}</div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>

    <div class="shadow-2 items q-mt-md">
      <q-expansion-item
        class="overflow-hidden text-items"
        label="¿Como votar?"
        header-class="text-grey"
        expand-icon-class="text-blue-4"
      >
        <q-card>
          <q-card-section class="text-center">
            <iframe
              width="450"
              height="300"
              src="https://www.youtube.com/embed/zw2YKnMrIKE"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
  </div>
</template>

<script>
import { LocalStorage } from "quasar";
import { db } from "src/boot/db";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      img: LocalStorage.getItem("url_imagen"),
      name: "",
      device: {},
      user: {},
    };
  },
  computed: {
    ...mapGetters(["uidStutent"]),
  },
  methods: {
    async getUserInfo() {
      const doc = await db.collection("alumnos").doc(this.uidStutent).get();
      const docRef = doc.data();
      const object_device = docRef.dispositivo;

      const object_user = {
        nombre: docRef.nombreCompleto,
        carnet: docRef.carnet,
        tel: docRef.telefono,
      };

      this.device = object_device;
      this.user = object_user;
    },
  },
  created() {
    let nombre = LocalStorage.getItem("nombre_usuario");
    let arr = nombre.split(" ");
    this.name = arr[0] + " " + arr[1];
    this.getUserInfo();
  },
};
</script>

<style scoped>
.contenedor {
  width: 100%;
}

.text-user {
  color: grey;
  font-weight: bold;
  font-size: 1.4em;
}

.text-user2 {
  color: grey;
  font-weight: bold;
  font-size: 2.5em;
}

.icon {
  font-size: 1.3em;
  margin-top: 2px;
  color: #699bf7;
}

.items {
  padding: 10px;
  border-radius: 20px;
  width: 90%;
  margin-right: auto;
  margin-left: auto;
}

.text-items {
  text-align: left;
  font-weight: bold;
  font-size: 1.1em;
}

.img {
  width: 300px;
  margin-right: auto;
  margin-left: auto;
}

.text-sub-title {
  color: #699bf7;
  font-weight: bold;
}
</style>
