<template>
  <div class="q-mx-lg">
    <AdministracionPadron />
    <!-- <pre>{{ comite }}</pre>-->
  </div>
</template>

<script>
import { defineComponent } from "vue";
import AdministracionPadron from "components/AdministracionPadron.vue";
// import { db } from "../boot/db";

export default defineComponent({
  name: "padron",
  components: {
    AdministracionPadron,
  },
  data() {
    return {
      // comite: [],
    };
  },
  methods: {
    // async leerDatos() {
    //   try {
    //     const docRef = await db.collection("comiteelectoral").get();
    //     docRef.forEach((doc) => {
    //       let padroncomite = doc.data();
    //       padroncomite.id = doc.id;
    //       this.comite.push(padroncomite);
    //     });
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
  },
  async created() {
    // await this.leerDatos();
  },
});
</script>

<style></style>
