<template>
  <div class="q-pa-md">
    <q-parallax>
      <template v-slot:media>
        <img src="~assets/foto-uesfmocc.jpg" />
      </template>

      <template v-slot:content="scope">
        <div
          class="absolute column items-center"
          :style="{
            opacity: 0.45 + (1 - scope.percentScrolled) * 0.55,
            top: scope.percentScrolled * 60 + '%',
            left: 0,
            right: 0,
          }"
        >
          <div class="text-h3 text-indigo-14 text-center">
            Sistema Electoral Universitario
          </div>
          <div class="text-h6 text-indigo-14 text-center">Blockchain</div>
        </div>
      </template>
    </q-parallax>
    <div class="tems-center">
      <img
        src="~assets/seusappLogo.png"
        style="width: 200px; height: 200px"
        :ratio="1"
      />
      <q-card>
        <q-card-section>
          Blockchain es una base de datos distribuida e inmutable que facilita
          el proceso de registro de transacciones. Ningún participante puede
          cambiar o falsificar una transacción una vez grabada en la blockchain.
          A medida que se produce una transacción, se registra como un "bloque"
          de datos. En el caso de SEUS este bloque se crea cada vez que se
          registren 10 votos.
        </q-card-section>
        <q-card-section>
          Cada bloque está conectado al bloque anterior y al bloque posterior.
          Estos bloques forman una cadena de datos. Los bloques confirman tanto
          el tiempo exacto como la secuencia de las transacciones y se unen de
          forma segura para evitar que se alteren o se inserten entre dos
          bloques existentes. De esta forma evitamos que exista un posible
          fraude en la elecciones.
        </q-card-section>
        <q-card-section>
          Las transacciones se unen y forman una cadena irreversible: un
          blockchain. Cada bloque adicional refuerza la verificación del bloque
          anterior y, por lo tanto, de todo el blockchain. Esto hace que dicha
          cadena sea a prueba de manipulaciones, lo que constituye la ventaja
          principal de la inalterabilidad. Esto evita que alguien
          malintencionado modifique la cadena.
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
//~assets/logo.png
</script>
