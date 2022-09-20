<template>
  <div>
    <q-card>
      <q-card-section>
        <h5 class="text-bold text-blue-10">Blockchain Data</h5>
        <q-img src="~assets/graficaBlock.png" />
        <q-card>
          <q-card-section>
            <p>
              Blockchain del sistema electoral universitario<br />
              Puede encontrar toda informacion que necesite consultar almacenada
              en la blockchain.
            </p>
          </q-card-section></q-card
        >
        <q-item style="max-width: 300px">
          <q-item-section class="text-bold"> Block Height </q-item-section>
          <q-item-section>{{ BlockHeight }}</q-item-section>
        </q-item>
        <q-item style="max-width: 300px">
          <q-item-section class="text-bold">Total Txs </q-item-section>
          <q-item-section> {{ TotalTx }} </q-item-section>
        </q-item>
        <q-item style="max-width: 300px">
          <q-item-section class="text-bold">Pending Txs </q-item-section>
          <q-item-section>{{ PendingTx }} </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      TotalTx: 11953,
      PendingTx: 15,
      BlockHeight: 728999,
    };
  },
};
</script>
