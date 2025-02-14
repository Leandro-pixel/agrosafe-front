<template>
  <q-layout>
    <q-page class="column">
      <PrimaryTable
    @request="onRequest"
    v-model:pagination="pagination"
    :rows="rows"
    :loading="loading"
    :columns="columns"
    :refresh="refresh"
  >
    <template #top-left> </template>
    <template #body-cell-status="props">
      <q-td >
        <q-chip
          :class="
            'non-selectable bg-' +
            translateStatusToColor(props.props.row.status ? 'Ativo' : 'Inativo')
          "
          size="md"
          flat
        >
          {{ props.props.row.status ? 'Ativo' : 'Inativo' }}
        </q-chip>
      </q-td>
    </template>
    <template v-slot:body-cell-businessName="props">
            <q-td >
              <span
                class="text-primary hoverable"
                @click="onNameClick( props.props.row.id, props.props.row.businessName)"
              >
                {{ props.props.row.businessName }}
              </span>
            </q-td>
          </template>
          <!--aqui são as ações-->
    <template v-slot:body-cell-actions="props">
      <q-btn-dropdown flat color="primary" dropdown-icon="settings">
        <q-list>
      <q-td class=" flex justify-center items-center gap-2">
        <PrimaryButton
                icon="add_business"
                flat
                @click="activateSuplier(props.props.row.id, props.props.row)"
                label="Ativar loja"
            />
            <PrimaryButton
                icon="key_off"
                flat
                @click="disableSuplier(props.props.row.id)"
                label="Desativar loja"
            />
            <PrimaryButton
                icon="key_off"
                flat
                @click="details"
                label="Detalhes"
            />
      </q-td>
      </q-list>
      </q-btn-dropdown>
    </template>
  </PrimaryTable>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Pagination } from 'src/models/pagination';
import { Formatter } from 'src/utils/formatter';
import { NotifyError, ShowDialog} from 'src/utils/utils';
import PrimaryTable from 'src/components/list/PrimaryTable.vue';
import { QTableColumn } from 'quasar';
import { translateStatusToColor } from 'src/models/enums/activeStatusEnum';
import { useRouter } from 'vue-router';
import PrimaryButton from 'src/components/button/PrimaryButton.vue';
import { Supplier } from 'src/models/suplier';
import { useSuplierStore } from 'src/stores/useSuplierStore';

const router = useRouter()
// Recebe o ID da rota como propriedade
const props = defineProps<{
  searchBy?: Array<{
    id?: number;
    cpf?: string;
    status?: boolean;
  }>;
}>();


const pagination = ref(new Pagination());
const loading = ref(false);
const refresh = ref(false);;
const filter = ref('');
const rows = ref([] as Array<Supplier>);
const suplierStore = useSuplierStore();
console.log('propriedades:' + props)
// Índice do span ativo


  const columns: QTableColumn[] = [ //configura oque cada coluna mostra
  { name: 'id', label: 'ID', align: 'center', field: (row: Supplier) => row.id },
  {name: 'businessName',label: 'Nome completo',align: 'left',field: (row: Supplier) => row.businessName,},
  {name: 'document',label: 'Documento',align: 'left',
  field:
  (row: Supplier) =>
  (row.cnpj && row.cnpj.length > 0)
    ? Formatter.strToCnpj(row.cnpj)
    : (row.cpf ? Formatter.strToCpf(row.cpf) : ''),},
  {name: 'status',label: 'Status',field: (row: Supplier) => (row.status ? 'Ativo' : 'Inativo'),align: 'left',},
  { name: 'actions', label: 'Ações', align: 'center', field: 'actions' },
];
const onNameClick = (id: any, name: any) => {
  console.log('name:', id + name);
  router.push({ path: `/representantes/ativacao/${id}`, query: {name}});
};


const details = async (id: any, name: any, status: string) => {
  console.log(id, name, status)
}

const onRequest = async (props: any) => {
  loading.value = true;
  const { page, rowsPerPage } = props.pagination;

  const offset = page - 1;
  const limit = rowsPerPage;
  const filterWithoutSymbols = Formatter.clearSymbols(filter.value);

  await suplierStore
    .fetchSupliers(limit, offset, filterWithoutSymbols)
    .then(() => {
      rows.value = suplierStore.getSuplier;
      pagination.value.rowsNumber = suplierStore.totalItemsInDB;

      pagination.value.page = page;
      pagination.value.rowsPerPage = rowsPerPage;
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};
const activateSuplier = async (id: string, supplier: Supplier) => {
  if (
    !(await ShowDialog.showConfirm(
      'Ativar fornecedor',
      `Deseja realmente ATIVAR o fornecedor ${supplier.businessName}?`,
      'primary'
    ))
  )
    return;
  loading.value = true;
  await suplierStore
    .activateSuplier(id, true)
    .then(() => {
      refresh.value = !refresh.value;
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};
const disableSuplier = async (supplier: Supplier) => {
  if (
    !(await ShowDialog.showConfirm(
      'Desativar loja',
      `Deseja realmente DESATIVAR o fornecedor ${supplier.businessName}?`,
      'negative'
    ))
  )
    return;
  loading.value = true;
  await suplierStore
    .disableSuplier(supplier.cpf)
    .then(() => {
      refresh.value = !refresh.value;
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};

</script>
