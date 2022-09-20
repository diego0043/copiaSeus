<template>
  <q-item class="item" clickable tag="a" :href="link">
    <q-item-section v-if="icon" avatar>
      <q-icon class="item-icon" :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="item-title text-grey">{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped>
.item {
  margin-bottom: 10px;
}

.item:hover {
  background-color: rgba(105, 155, 247, 0.1);
}

.item-icon {
  font-size: 2.5em;
  color: #699bf7;
}

.item-title {
  margin-top: 5px;
  font-size: 1rem;
  font-weight: bold;
}
</style>
