<template>
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
            translateStatusToColor(props.props.row.active ? 'Ativo' : 'Inativo')
          "
          size="md"
          flat
        >
          {{ props.props.row.active ? 'Ativo' : 'Inativo' }}
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
      <q-td class=" flex justify-center items-center">
        <PrimaryButton
                icon="add_business"
                flat
                @click="activateStore(props.props.row)"
                label="Ativar loja"
            />
            <PrimaryButton
                icon="key_off"
                flat
                @click="disableStore(props.props.row)"
                label="Desativar loja"
            />
      </q-td>
    </template>
  </PrimaryTable>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { EC, Store } from '../../models/store';
import { useStoreStore } from '../../stores/useStoreStore';
import {
  NotifyError,
  ShowDialog,
} from 'src/utils/utils';
import { Formatter } from 'src/utils/formatter';
import { QTableColumn } from 'quasar';
import { useRouter } from 'vue-router';
import PrimaryButton from 'src/components/button/PrimaryButton.vue';
import { translateStatusToColor } from 'src/models/enums/activeStatusEnum';
import { Pagination } from 'src/models/pagination'; //usa como propriedade para configurar a paginação
import PrimaryTable from 'src/components/list/PrimaryTable.vue';

const columns: QTableColumn[] = [ //configura oque cada coluna mostra
  { name: 'id', label: 'ID', align: 'center', field: (row: Store) => row.id },
  {name: 'businessName',label: 'Nome completo',align: 'left',field: (row: EC) => row.businessName,},
  //{name: 'fantasyName',label: 'Nome Fantasia',align: 'left',field: 'fantasyName',},
  {name: 'document',label: 'Documento',align: 'left',
  field:
  (row: EC) =>
  (row.cnpj && row.cnpj.length > 0)
    ? Formatter.strToCnpj(row.cnpj)
    : (row.cpf ? Formatter.strToCpf(row.cpf) : ''),},
  //{name: 'address',label: 'Endereço',align: 'left',field: (row: Store) => row.address.toString(),},
  {name: 'status',label: 'Status',field: (row: Store) => (row.active ? 'Ativo' : 'Inativo'),align: 'left',},
  { name: 'actions', label: 'Ações', align: 'center', field: 'actions' },
];
const pagination = ref(new Pagination());
const filter = ref('');
const rows = ref([] as Array<Store>);
const storeStore = useStoreStore();
const loading = ref(false);
const refresh = ref(false);
const router = useRouter();

const onNameClick = (id: any, name: any) => {
  console.log('name:', id + name);
  router.push({ path: `/lojas/estabelecimentos/${id}`, query: {name}});

};

const onRequest = async (props: any) => {
  loading.value = true;
  const { page, rowsPerPage } = props.pagination;

  const offset = page - 1;
  const limit = rowsPerPage;
  const filterWithoutSymbols = Formatter.clearSymbols(filter.value);

  await storeStore
    .fetchStores(limit, offset, filterWithoutSymbols)
    .then(() => {
      rows.value = storeStore.getStores;
      pagination.value.rowsNumber = storeStore.totalItemsInDB;

      pagination.value.page = page;
      pagination.value.rowsPerPage = rowsPerPage;
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};
const activateStore = async (ec: EC) => {
  if (
    !(await ShowDialog.showConfirm(
      'Ativar loja',
      `Deseja realmente ATIVAR a loja ${ec.businessName}?`,
      'primary'
    ))
  )
    return;
  loading.value = true;
  await storeStore
    .activateStore(ec.cpf)
    .then(() => {
      refresh.value = !refresh.value;
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};
const disableStore = async (ec: EC) => {
  if (
    !(await ShowDialog.showConfirm(
      'Desativar loja',
      `Deseja realmente DESATIVAR a loja ${ec.businessName}?`,
      'negative'
    ))
  )
    return;
  loading.value = true;
  await storeStore
    .disableStore(ec.cpf)
    .then(() => {
      refresh.value = !refresh.value;
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};
</script>
