<template>
  <div>
    <q-img class="logo-desktop desktop-only" src="../assets/seusappLogo.svg">
    </q-img>
    <q-img class="logo mobile-only" src="../assets/seusappLogo.svg"> </q-img>
    <div class="parrafo">
      SEUS es la aplicación oficial de la Universidad de El Salvador para
      realizar votaciones de forma segura y transparente
    </div>
    <div class="row buttons-movil mobile-only">
      <div class="col-sm-12 col-xs-12">
        <button class="btn-principal" @click="toIniciarSesion()">
          Iniciar Sesión
        </button>
      </div>
      <div class="col-sm-12 col-xs-12">
        <button class="btn-secundario" @click="toRegistrarse()">
          Registrarse
        </button>
      </div>
    </div>

    <div class="row buttons-desktop desktop-only">
      <div class="col-lg-6 col-xl-6">
        <button class="btn-principal-desktop" @click="toIniciarSesion()">
          Iniciar Sesión
        </button>
      </div>
      <div class="col-lg-6 col-xl-6">
        <button class="btn-secundario-desktop" @click="toRegistrarse()">
          Registrarse
        </button>
      </div>
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#699bf7"
        fill-opacity="1"
        d="M0,32L48,58.7C96,85,192,139,288,149.3C384,160,480,128,576,122.7C672,117,768,139,864,160C960,181,1056,203,1152,192C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  methods: {
    toIniciarSesion() {
      this.$router.push({ path: "/login" });
    },
    toRegistrarse() {
      this.$router.push({ path: "/registro" });
    },
  },
};
</script>

<style scoped>
.buttons-movil {
  margin-top: 80px;
}

.buttons-desktop {
  margin-top: 50px;
}

.logo-desktop {
  display: block;
  margin-top: -70px;
  margin-right: auto;
  margin-left: auto;
  width: 450px;
}

.logo {
  display: block;
  margin-right: auto;
  margin-left: auto;
  width: 400px;
  margin-top: -60px;
}

.parrafo {
  margin-right: 20px;
  margin-left: 20px;
  text-align: center;
  font-size: 1.2em;
  color: grey;
  font-weight: bold;
}

.btn-principal {
  display: block;
  width: 330px;
  margin-left: auto;
  margin-right: auto;
  color: white;
  background-color: #699bf7;
  border: 1px solid #699bf7;
  border-radius: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 1.5em;
  margin-bottom: 20px;
  margin-top: 40px;
}

.btn-principal:active {
  background-color: #5b8eec;
}

.btn-secundario {
  display: block;
  width: 330px;
  margin-left: auto;
  margin-right: auto;
  color: #699bf7;
  background-color: white;
  border: 1px solid #699bf7;
  border-radius: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 1.5em;
}

.btn-secundario:active {
  background-color: #e7ebf3;
}

.btn-principal-desktop {
  display: block;
  width: 250px;
  margin-left: 50px;
  margin-right: 20px;
  color: white;
  background-color: #699bf7;
  border: 1px solid #699bf7;
  border-radius: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 1.5em;
  margin-bottom: 20px;
  cursor: pointer;
}

.btn-principal-desktop:active {
  background-color: #5b8eec;
}

.btn-secundario-desktop {
  display: block;
  width: 250px;
  margin-left: auto;
  margin-right: auto;
  color: #699bf7;
  background-color: white;
  border: 1px solid #699bf7;
  border-radius: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 1.5em;
  cursor: pointer;
}

.btn-secundario-desktop:active {
  background-color: #e7ebf3;
}
</style>
