import { createStore } from 'vuex'
import { LocalStorage } from 'quasar'
import { db } from "src/boot/db";
import { Device } from "@capacitor/device";
import { Geolocation } from "@capacitor/geolocation"
const SHA256 = require("crypto-js/sha256");


export default createStore({
  state: {
    nombre: LocalStorage.getItem("nombre_usuario"),
    carnet: "",
    id_estudiante: LocalStorage.getItem("id_estudiante"),
    candidatos: [],
    data_elecciones: [],
    data_cargada: false,
    isValidate: false,
    MobileDevice: false,
    id_votacion_seleccionada: "",
    uniqueId: "",
    coordenadasUsuario: "",
    votosPorCandidato: null,
    obtenerHash: [],
    hashActual: "",
    phonenumber: "",
    variableUsuarioAutenticado: localStorage.getItem('usuarioAutenticado'),
  },

  getters: {
    usuarioAutenticado: state => state.variableUsuarioAutenticado,
    candidatos: state => state.candidatos,
    dataProcesada: state => state.data_elecciones,
    data_cargada: state => state.data_cargada,
    isValidate: state => state.isValidate,
    MobileDevice: state => state.MobileDevice,
    phonenumber: state => state.phonenumber,
    id_doc_actual: state => state.id_votacion_seleccionada,
    carnet_usuario: state => state.carnet,
    document_info_cel: state => state.uniqueId,
    uidStutent: state => state.id_estudiante,
    gpsUsuario: state => state.coordenadasUsuario,
    getterVotosPorCandidato: state => state.votosPorCandidato,
    obtenerHash: state => state.obtenerHash,
    hashActual: state => state.hashActual
  },


  mutations: {
    setCandidates(state, payload) {
      state.candidatos = payload;
    },
    setControl_Data(state, payload) {
      state.data_cargada = payload;
    },
    setData_elecciones(state, payload) {
      state.data_elecciones = payload;
    },
    setIsvalidate(state, payload) {
      state.isValidate = payload;
    },
    setMobileDevice(state, payload) {
      state.MobileDevice = payload;
    },
    setIdVotacionActual(state, payload) {
      state.id_votacion_seleccionada = payload;
    },
    setId_cel(state, payload) {
      state.uniqueId = payload;
    },
    setCarnet(state, payload) {
      state.carnet = payload;
    },
    setPosicion(state, payload) {
      state.coordenadasUsuario = payload;
    },
    setFiltrarVotosPorCandidato(state, payload) {
      state.votosPorCandidato = payload;
    },

    setObDeHash(state, payload) {
      state.obtenerHash = payload;
    },

    setHashActual(state, payload) {
      state.hashActual = payload
    },

    setPhonenumber(state, payload) {
      state.phonenumber = payload;
    }


  },

  actions: {

    async updateBlockData({ commit }, { id, eleccionName, nombre, descripcion, imagen }) {

      let doc = ''
      let data = await db.collection("cadenadebloques").get();
      let existe = false;

      data.forEach(item => {//Primero verificamos si el id de la eleccion existe
        if (item.id === id) {
          existe = true
        }
      })

      if (existe) {//si existe solo pide la informacion del bloque de la eleccion

        doc = await db.collection("cadenadebloques").doc(id).collection(id).get();

      } else {//sino, creara el bloque genesis con un bloque mas que se ocupara para llenarlo con los votos

        //Creando bloque genesis 
        await db.collection("cadenadebloques").doc(id).set({ existe: '1' })

        await db.collection("cadenadebloques").doc(id).collection(id).add({
          eleccion: {
            id: id,
            nombre: eleccionName
          },
          hashPrevio: '',
          votos: ['bloque genesis']
        })

        const docRef3 = await db.collection("cadenadebloques").doc(id).collection(id).get()
        let idGenesis = '';
        let dataEdit = '';

        docRef3.forEach((item) => {
          idGenesis = item.id
          dataEdit = item.data()

        })

        await db.collection("cadenadebloques").doc(id).collection(id).doc(idGenesis).update({
          hash: SHA256(JSON.stringify({ ...dataEdit, hash: null })).toString()
        })

        //Creando nuevo bloque y asignando hash previo (el del genesis)
        await db.collection("cadenadebloques").doc(id).collection(id).add({
          eleccion: {
            id: id,
            nombre: eleccionName
          },
          hash: '',
          hashPrevio: SHA256(JSON.stringify({ ...dataEdit, hash: null })).toString(),
          votos: []
        })

        //Obteniendo la informacio del bloque de la eleccion para colocar el voto.
        doc = await db.collection("cadenadebloques").doc(id).collection(id).get();
      }

      let idBloqueActual = null;
      let votosUpdate = [];


      doc.forEach(bloque => {
        if (bloque.data().votos.length < 10 && bloque.data().votos[0] !== 'bloque genesis') {
          idBloqueActual = bloque.id;
          votosUpdate = bloque.data().votos;

          votosUpdate.push({
            nombre: nombre,
            descripcion: descripcion,
            imagen: imagen
          })
        }
      })

      const docRef = await db.collection("cadenadebloques").doc(id).collection(id).doc(idBloqueActual);

      await docRef.update({
        votos: votosUpdate
      });

      const docRef2 = await db.collection("cadenadebloques").doc(id).collection(id).doc(idBloqueActual).get();


      if (docRef2.data().votos.length >= 10) {

        await docRef.update({//Generando y asignando hash al bloque
          hash: SHA256(JSON.stringify({ ...docRef2.data(), hash: null })).toString()

        })

        //Creando nuevo bloque y asignando hash previo
        await db.collection("cadenadebloques").doc(id).collection(id).add({
          eleccion: {
            id: id,
            nombre: eleccionName
          },
          hash: '',
          hashPrevio: SHA256(JSON.stringify({ ...docRef2.data(), hash: null })).toString(),
          votos: []
        })

      }

    },

    getCandidates({ commit, state }, id) {
      const filtro = state.data_elecciones.filter(eleccion => eleccion.id_ref.includes(id));
      const [{ candidatos }] = filtro;
      commit("setCandidates", candidatos)
    },

    async filtrarVotosPorCandidato({ commit }) {//Suma todos los votos de una eleccion
      const doc = await db.collection("elecciones").get();
      let arrayDataVotosPorCandidato = [];
      let votos = []
      let nombreCandidato = null

      doc.forEach(item => {
        let nombre = item.data().nombre
        votos = []
        item.data().candidatos.forEach(candidato => {
          nombreCandidato = candidato.nombre
          votos.push({ nombreCandidato: nombreCandidato, voto: candidato.votos })
        })
        arrayDataVotosPorCandidato.push({ nombreEleccion: nombre, votos })

      });

      commit("setFiltrarVotosPorCandidato", arrayDataVotosPorCandidato)
    },

    async valordehash({ commit }) {//extrae el hash del bloque
      const doc = await db.collection("cadenadebloques").get();

      let valorHash = [];
      doc.forEach(item => {

        let varhash = item.data().hash
        let valPrevioHash = item.data().hashPrevio
        let valVotos = item.data().votos
        valorHash.push({ varhash, valPrevioHash, valVotos })

      })

      // console.log(valorHash)
      commit("setObDeHash", valorHash)

    },




    action_set_id_votacion_actual({ commit }, id_actual) {
      commit("setIdVotacionActual", id_actual)
    },

    async fetch_Data_ordenada_elecciones({ commit, getters }) {


      let elecciones = [];
      let id_documentos = [];
      try {
        const collection = await db.collection("elecciones").get();
        collection.forEach(doc => {
          id_documentos.push(doc.id)
          elecciones.push(doc.data())
        });

      } catch (error) {
        console.log(`${error}`)
      }

      commit("setControl_Data", true);

      let data_procesada = []

      elecciones.forEach((item, index) => {

        let object_item_data = {
          descripcion: item.descripcion,
          fechaDesde: item.fechaDesde,
          fechaHasta: item.fechaHasta,
          nombre: item.nombre,
          ya_vote: item.participantes.includes(getters.carnet_usuario),
          id_ref: id_documentos[index],
          candidatos: item.candidatos
        }

        data_procesada.push(object_item_data)

      })

      commit("setData_elecciones", data_procesada)

    },

    async isValidate_usr({ commit, getters }, id) {

      let alumnos = [];
      try {
        const collection = await db.collection("alumnos").doc(getters.uidStutent).get();
        const docRef = collection.data()
        const userVerification = docRef.dispositivo
        //console.log(userVerification.id, getters.document_info_cel.identificador_unico)

        docRef.validacion1 ? commit("setIsvalidate", true) : commit("setIsvalidate", false);
        userVerification.id == getters.document_info_cel.identificador_unico ? commit("setMobileDevice", true) : commit("setMobileDevice", true);


      } catch (err) {
        console.log(`${err}`);
      }
      /*
      commit("setPhonenumber", telefono);
      const alumnoUser = alumnos.filter(alumno => alumno.carnet.includes(getters.carnet_usuario.toUpperCase()));
      const [firstMatch] = alumnoUser;
      const [{ validacion1 }] = alumnoUser;
      const telefono = firstMatch.telefono;
      const id = firstMatch.dispositivo.id;
      */






    },

    async posicion_usr({ commit }) {
      const coordinates = await Geolocation.getCurrentPosition();
      let coordenadas = {
        latitud: coordinates.coords.latitude,
        longitud: coordinates.coords.longitude
      }
      commit("setPosicion", coordenadas);
    },

    async device_info({ commit }) {
      let modelo_tel = "";
      let manufacturer = "";
      let os = "";
      let name_usr = "";
      let uniqueId = ""
      await Device.getInfo().then((info) => {
        modelo_tel = info.model;
        manufacturer = info.manufacturer;
        os = info.operatingSystem;
        name_usr = info.name

      })

      await Device.getId().then((info) => {
        uniqueId = info.uuid
      })

      let device_object_info = {
        identificador_unico: uniqueId,
        modelo: modelo_tel,
        manufacturacion_by: manufacturer,
        sistema_operativo: os,
        nombre_usuario: name_usr
      }

      commit("setId_cel", device_object_info)

    },
    loadCarnet({ commit }) {
      if (LocalStorage.getItem("carnet_usuario")) {
        commit("setCarnet", LocalStorage.getItem("carnet_usuario"))
      } else {
        commit("setCarnet", "")
      }
    }

  },
  modules: {
  }
})
