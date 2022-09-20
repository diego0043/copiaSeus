const SHA256 = require("crypto-js/sha256");

class Block {
  //Asignacion de valores en el constructor
  constructor({ eleccion, votos }) {
    this.hash = null;
    this.votos = votos;
    this.eleccion = eleccion;
    this.hashprevio = null;
  }

  //metodo para validar si no han existido cambios en el bloque
  validate() {
    const self = this;
    return new Promise((resolve, reject) => {
      let currenthash = self.hash;

      //utilizamos el spred operator para hacer una  copia del objeto completo sin el hash y lo recalculamos
      self.hash = SHA256(JSON.stringify({ ...self, hash: null })).toString();

      if (currenthash !== self.hash) {
        return resolve(false);
      }
      resolve(true);
    });
  }

  //metodo para obtener los datos

  getBlokData() {
    const self = this;
    return new Promise((resolve, reject) => {
      let data = self.body;
      let dataObject = JSON.parse(data);

      if (dataObject === "Genesis Block") {
        reject(new Error("This is the Genesis block"));
      }

      resolve(dataObject);
    });
  }

}

module.exports = Block;
