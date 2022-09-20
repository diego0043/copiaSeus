<template>
  <div class="flex flex-center">
    <q-page>
      <div class="row justify-center q-gutter-sm">
        <div class="col-12">
          <div id="container">
            <h1 id="titulo">{{ nameVotacion }}</h1>
          </div>
          <q-intersection transition="scale" class="example-item">
            <Candidato
              :nameVotacion="nameVotacion"
              v-for="(candidato, index) in candidatos"
              :key="(candidato, index)"
              :candidato="candidato"
              :index_candidato="index"
            />
          </q-intersection>
        </div>
      </div>

    </q-page>
  </div>
</template>

<script>
import Candidato from "src/components/Candidato.vue";
import { mapGetters } from "vuex";

export default {
  components: { Candidato },
  props: {
    nameVotacion: String,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["candidatos"]),
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Raleway:400,700,900,400italic,700italic,900italic);
@import "../css/titulo.css";

#container {
  display: flex;
  flex-direction: column;
  float: left;
  justify-content: center;
  padding: 1em;
  width: 100%;
  align-items: center;
}
a {
  color: #024794;
}

a:hover {
  text-decoration: none;
}

.name-votacion {
  color: #699bf7;
  font-size: 2em;
  font-weight: bold;
  margin-top: -15px;
}

#titulo {
  text-align: center;
}
</style>
