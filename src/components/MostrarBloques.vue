<template>
  <div>
    <div :class="{ 'truncate-chip-labels': truncate }">
      <h4 style="margin-left: 15px">
        Bloques
        <q-chip dense icon="info" color="primary" v-model="infoBlock">
          <q-tooltip>{{ infoBlockLabel }}</q-tooltip>
        </q-chip>
      </h4>
    </div>

    <div class="q-pa-md">
      <q-markup-table>
        <thead class="bg-grey-3 text-h4">
          <tr>
            <th class="text-left">Altura</th>
            <th class="text-left">Hash</th>
            <th class="text-left">Tamaño</th>
            <th class="text-left">Total de votos</th>
            <th class="text-left">Fecha y hora</th>
          </tr>
        </thead>
        <tbody class="bg-grey-1 text-h4">
          <tr>
            <td class="text-left">
              <a href="#/blockchain/block" style="text-decoration: none">111</a>
            </td>
            <td class="text-left">
              <a
                href="#/blockchain/block"
                style="text-decoration: none"
              >000000000000000000058e0b6d07b22fa46bd3bc194eb27272548ae0b19b9f4c</a>
            </td>
            <td class="text-left">463.571 bytes</td>

            <td class="text-left">10</td>
            <td class="text-left">2022-03-19 15:50</td>
          </tr>

          <tr>
            <td class="text-left">
              <a href="#/blockchain/block" style="text-decoration: none">110</a>
            </td>
            <td class="text-left">
              <a
                href="#/blockchain/block"
                style="text-decoration: none"
              >000000000000000000060a0f51ca96cabf9aab7c08f554d9d87c9626ca58f59e</a>
            </td>
            <td class="text-left">574.009 bytes</td>

            <td class="text-left">10</td>
            <td class="text-left">2022-03-19 15:50</td>
          </tr>

          <tr>
            <td class="text-left">
              <a href="#/blockchain/block" style="text-decoration: none">109</a>
            </td>
            <td class="text-left">
              <a
                href="#/blockchain/block"
                style="text-decoration: none"
              >00000000000000000005c37b748f029de26f74eaeff9e7e0c7b1adc4120e6c04</a>
            </td>
            <td class="text-left">256.020 bytes</td>

            <td class="text-left">10</td>
            <td class="text-left">2022-03-19 15:50</td>
          </tr>

          <tr>
            <td class="text-left">
              <a href="#/blockchain/block" style="text-decoration: none">108</a>
            </td>
            <td class="text-left">
              <a
                href="#/blockchain/block"
                style="text-decoration: none"
              >000000000000000000021d806e8ae89b2656b8b6c4cea694e4e5812b1ab2fec2</a>
            </td>
            <td class="text-left">260.020 bytes</td>

            <td class="text-left">10</td>
            <td class="text-left">2022-03-19 15:50</td>
          </tr>
          <tr>
            <td class="text-left">
              <a href="#/blockchain/block" style="text-decoration: none">107</a>
            </td>
            <td class="text-left">
              <a
                href="#/blockchain/block"
                style="text-decoration: none"
              >000000000000000000035edbc39edc3b78f7f839b90b248fdd167dcb221f9fce</a>
            </td>
            <td class="text-left">225.229 bytes</td>

            <td class="text-left">10</td>
            <td class="text-left">2022-03-19 15:50</td>
          </tr>
          <tr>
            <td class="text-left">
              <a href="#/blockchain/block" style="text-decoration: none">106</a>
            </td>
            <td class="text-left">
              <a
                href="#/blockchain/block"
                style="text-decoration: none"
              >000000000000000000019180645299cce07b81a8e32e3d5aef8c653f97bddef0</a>
            </td>
            <td class="text-left">75.400 bytes</td>

            <td class="text-left">10</td>
            <td class="text-left">2022-03-19 15:50</td>
          </tr>
          <tr>
            <td class="text-left">
              <a href="#/blockchain/block" style="text-decoration: none">105</a>
            </td>
            <td class="text-left">
              <a
                href="#/blockchain/block"
                style="text-decoration: none"
              >00000000000000000008bdfbf766b2b3bb67efe917ba31ba4024b9cea1afff9f</a>
            </td>
            <td class="text-left">428.215 bytes</td>

            <td class="text-left">10</td>
            <td class="text-left">2022-03-19 15:50</td>
          </tr>
          <tr>
            <td class="text-left">
              <a href="#/blockchain/block" style="text-decoration: none">104</a>
            </td>
            <td class="text-left">
              <a
                href="#/blockchain/block"
                style="text-decoration: none"
              >0000000000000000000519a36f6e27f78bbbbaf94a17dad87828ec5c14239c57</a>
            </td>
            <td class="text-left">553.436 bytes</td>

            <td class="text-left">10</td>
            <td class="text-left">2022-03-19 15:50</td>
          </tr>
          <tr>
            <td class="text-left">
              <a href="#/blockchain/block" style="text-decoration: none">103</a>
            </td>
            <td class="text-left">
              <a
                href="#/blockchain/block"
                style="text-decoration: none"
              >0000000000000000000398865e9fb10bc635d66573469635fe13bebd6153183b</a>
            </td>
            <td class="text-left">476.138 bytes</td>

            <td class="text-left">10</td>
            <td class="text-left">2022-03-19 15:50</td>
          </tr>
          <tr>
            <td class="text-left">
              <a href="#/blockchain/block" style="text-decoration: none">102</a>
            </td>
            <td class="text-left">
              <a
                href="#/blockchain/block"
                style="text-decoration: none"
              >00000000000000000005ce0c50063b894a70e2d26d6e37c8ea3ad9a5d3488156</a>
            </td>
            <td class="text-left">313.467 bytes</td>

            <td class="text-left">10</td>
            <td class="text-left">2022-03-19 15:50</td>
          </tr>
          <tr>
            <td class="text-left">
              <a href="#/blockchain/block" style="text-decoration: none">101</a>
            </td>
            <td class="text-left">
              <a
                href="#/blockchain/block"
                style="text-decoration: none"
              >0000000000000000000492e143a14a6b8bd6b956a1a2f1a0642701ff8b21f49c</a>
            </td>
            <td class="text-left">353.435 bytes</td>

            <td class="text-left">10</td>
            <td class="text-left">2022-03-19 15:50</td>
          </tr>
          <tr>
            <td class="text-left">
              <a href="#/blockchain/block" style="text-decoration: none">100</a>
            </td>
            <td class="text-left">
              <a
                href="#/blockchain/block"
                style="text-decoration: none"
              >0000000000000000000a21f2f2ccae0b7f11045e8a63632978b590df806a8e55</a>
            </td>
            <td class="text-left">457.288 bytes</td>

            <td class="text-left">10</td>
            <td class="text-left">2022-03-19 15:50</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="q-pa-lg flex flex-center">
      <q-pagination v-model="current" :max="5" input />
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    const infoBlock = ref(true);
    const infoT = ref(true);

    return {
      current: ref(3),
      truncate: ref(true),

      infoBlock,
      infoT,

      infoBlockLabel:
        "Los bloques contienen la información de los votos realizados.",
      infoTLabel: "",
    };
  },
};
</script>
