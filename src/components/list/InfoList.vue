<template>
  <div>
    <!-- Barra de pesquisa opcional -->
    <q-input
      v-model="searchQuery"
      outlined
      rounded
      dense
      placeholder="Pesquisar..."
      class="q-mb-md"
      v-if="enableSearch"
      :clearable="true"
      debounce="300"
      @input="filterList"
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>

    <!-- Lista filtrada -->
    <q-list bordered padding class="rounded-borders">
      <q-item
        v-for="(info, index) in filteredArray"
        :key="index"
        clickable
      >
        <q-item-section avatar>
          <q-icon :name="info.icon" color="primary" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ info.label }}</q-item-label>
          <q-item-label caption>{{ info.value }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'InfoList',
  props: {
    infoArray: {
      type: Array,
      required: true,
    },
    enableSearch: {
      type: Boolean,
      default: false, // Ativa/desativa a barra de pesquisa
    },
  },
  data() {
    return {
      searchQuery: '', // Armazena o termo de pesquisa
      filteredArray: this.infoArray, // Array filtrado
    };
  },
  watch: {
    // Atualiza a lista filtrada quando o array original mudar
    infoArray: {
      handler(newArray) {
        this.filteredArray = newArray;
        this.filterList(); // Reaplica o filtro
      },
      deep: true,
    },
  },
  methods: {
    // Filtra a lista com base no termo de pesquisa
    filterList() {
      const query = this.searchQuery.toLowerCase();
      this.filteredArray = this.infoArray.filter(
        (item) =>
          item.label.toLowerCase().includes(query) ||
          item.value.toLowerCase().includes(query)
      );
    },
  },
};
</script>

<style scoped>
.rounded-borders {
  border-radius: 8px;
}
</style>
