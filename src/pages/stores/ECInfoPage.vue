<template>
  <q-layout>
    <q-page class="column">
      <div class="flex justify-center text-primary text-subtitle1 q-mb-lg">
        {{ name }}
      </div>

      <div class="flex">
        <span
          v-for="(item, index) in items1"
          :key="index"
          class="flex items-center text-h6 q-mr-md"
          :class="{
            isActive: activeIndex === index,
            isNotActive: activeIndex !== index
          }"
          @click="setActive(index)"
        >
          {{ item }}
        </span>
      </div>
      <infor v-if="activeIndex === 0" :info-array="infoList" ></infor>
      <template v-if="activeIndex === 1">
  <PrimaryTable
  @request="onRequest"
  v-model:pagination="pagination"
  :rows="rows"
  :loading="loading"
  :columns="columns"
  :refresh="refresh"
  >
    <template #body-cell-status="props">
      <q-td style="align-items: center;" >
        <q-chip :class="'non-selectable bg-' + translateStatusToColor(props.props.row.status)" size="md" flat>
          {{props.props.row.status}}
        </q-chip>
      </q-td>
    </template>

  </PrimaryTable>
</template>
      <InfoList v-if="activeIndex === 2" :info-array="fundingList"></InfoList>

       <!-- Botão Editar para a aba Funding -->
       <div v-if="activeIndex === 2" class="flex column">
        <q-btn
          flat
          icon="edit"
          @click="onToggle(edit)"
          label="Editar"
          class="bg-primary text-white items-center"
          style="width: 8rem"
        ></q-btn>

        <!-- Edição Habilitada -->
        <div v-if="edit">
          <span>Habilitou para editar valores</span>
          <q-btn
            flat
            @click="onToggle(edit)"
            label="Alterar valor"
            class="bg-primary text-white items-center"
            style="width: 8rem"
          ></q-btn>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import InfoList from 'src/components/list/InfoList.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { User } from 'src/models/user'
import { useUserStore } from 'src/stores/useUserStore'
import { QTableColumn } from 'quasar'
import { NotifyError} from 'src/utils/utils'
import PrimaryTable from 'src/components/list/PrimaryTable.vue'
import { Pagination } from 'src/models/pagination'
import { translateStatusToColor } from 'src/models/enums/activeStatusEnum'
// Recebe o ID da rota como propriedade
defineProps<{ id: string }>();

const infor = InfoList;

// Acessando o nome via query string
const route = useRoute();
const name = route.query.name || 'Nome não disponível';
const idEC = route.params.id;
 console.log(idEC)
const edit = ref(false);
// Dados dos spans
const items1 = ['Credenciais', 'Clientes', 'Funding'];

// Índice do span ativo
const activeIndex = ref<number>(0);

// Função para definir o span ativo
const setActive = (index: number) => {
  activeIndex.value = index;
};

// Função para alternar estado de edição
const onToggle = (value: boolean) => {
  edit.value = !value; // Inverte o valor de edição
};

const fundingList = [
  { icon: 'monetization_on', label: 'Saldo disponível', value: 'R$2.000,00' },
  { icon: 'money_off', label: 'Saldo usado', value: 'R$3.000,00' },
  {
    icon: 'schedule',
    label: 'Última atualização',
    value: '01/10/2024, 16:12:13',
  },
];

const infoList = [
  { icon: 'badge', label: 'Nome fantasia', value: 'PG DISTRIBUIDORA LTDA' },
  { icon: 'description', label: 'CNPJ', value: '14.163.708/0001-78' },
  { icon: 'place', label: 'Endereço', value: 'Belo Horizonte, MG, Centro, Rua Rio de Janeiro, 30160-911' },
  { icon: 'check_circle', label: 'Status', value: 'Ativo' },
  { icon: 'schedule', label: 'Criado em', value: '01/10/2024, 16:12:13' },
];

const columns: QTableColumn[] = [
{ name: 'id', label: 'ID', field: (row:User) => row.id, align: 'center' },
{ name: 'email', required: true, label: 'E-mail', field: (row:User) => row.email, align: 'left' },
{ name: 'userType', label: 'Tipo de usuário', field: (row:User) => row.userType, align: 'left' },
{ name: 'status', label: 'Status', field: (row:User) => row.status, align: 'center' },
{ name: 'actions', label: 'Ações', field: 'actions', align: 'center' }
]

const pagination = ref(new Pagination())
const rows = ref([] as Array<User>)
const loading = ref(false)
const userStore = useUserStore()
const refresh = ref(false)


const onRequest = async (props:any) => {
loading.value = true
const { page, rowsPerPage } = props.pagination

const offset = page - 1
const limit = rowsPerPage

await userStore.fetchBrandsUsers(limit, offset,1, props.filter)
  .then(() => {
    rows.value = userStore.getUsers
    pagination.value.rowsNumber = userStore.totalItemsInDB

    pagination.value.page = page
    pagination.value.rowsPerPage = rowsPerPage
  })
  .catch((error:any) => NotifyError.error(error.message))
  .finally(() => { loading.value = false })
}

</script>
