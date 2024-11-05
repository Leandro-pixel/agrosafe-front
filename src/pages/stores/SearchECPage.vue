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
      <q-td style="align-items: center">
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
    <template v-slot:body-cell-name="props">
            <q-td :props="props">
              <span
                class="text-primary hoverable"
                @click="onNameClick( props.props.row.id, props.props.row.name)"
              >
                {{ props.props.row.name }}
              </span>
            </q-td>
          </template>
          <!--aqui são as ações-->
    <template v-slot:body-cell-actions="props">
      <q-td>
        <PrimaryButton
          icon="visibility"
          flat
          @click="viewFunction(props.props.row.id)"
        >
          <q-tooltip class="bg-primary text-subtitle2">Visualizar</q-tooltip>
        </PrimaryButton>
        <PrimaryButton icon="man" flat @click="viewUsers(props.props.row.id)">
          <q-tooltip class="bg-primary text-subtitle2">Ver usuários</q-tooltip>
        </PrimaryButton>
        <q-btn-dropdown flat color="primary" dropdown-icon="settings">
          <q-list>
            <q-item
              ><PrimaryButton
                icon="person_add"
                flat
                @click="addFunction(props.props.row.id)"
                label="Adicionar usuário"
            /></q-item>
            <q-item
              ><PrimaryButton
                icon="support_agent"
                flat
                @click="inviteSeller(props.props.row.id)"
                label="Adicionar vendedor"
            /></q-item>
            <q-item
              v-if="!props.props.row.active && implementHierarchy('sysAdmin')"
              ><PrimaryButton
                icon="add_business"
                flat
                @click="activateStore(props.props.row)"
                label="Ativar loja"
            /></q-item>
            <q-item
              v-if="props.props.row.active && implementHierarchy('sysAdmin')"
              ><PrimaryButton
                icon="key_off"
                flat
                @click="disableStore(props.props.row)"
                label="Desativar loja"
            /></q-item>
          </q-list>
        </q-btn-dropdown>
      </q-td>
    </template>
  </PrimaryTable>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { EC, Store } from '../../models/store';
import { useStoreStore } from '../../stores/useStoreStore';
import {
  HashIds,
  NotifyError,
  ShowDialog,
  implementHierarchy,
} from 'src/utils/utils';
import { Formatter } from 'src/utils/formatter';
import { QTableColumn } from 'quasar';
import { useRouter } from 'vue-router';
import PrimaryButton from 'src/components/button/PrimaryButton.vue';
import { translateStatusToColor } from 'src/models/enums/activeStatusEnum';
import { Pagination } from 'src/models/pagination'; //usa como propriedade para configurar a paginação
import PrimaryTable from 'src/components/list/PrimaryTable.vue';

const columns: QTableColumn[] = [ //configura oque cada coluna mostra
  //{ name: 'id', label: 'ID', align: 'center', field: (row: Store) => row.id },
  {name: 'fullName',label: 'Nome completo',align: 'left',field: (row: EC) => row.businessName,},
  //{name: 'fantasyName',label: 'Nome Fantasia',align: 'left',field: 'fantasyName',},
  {name: 'document',label: 'Documento',align: 'left',
  field:
  (row: EC) =>
  (row.cnpj && row.cnpj.length > 0)
    ? Formatter.strToCnpj(row.cnpj)
    : (row.cpf ? Formatter.strToCpf(row.cpf) : ''),},
  //{name: 'address',label: 'Endereço',align: 'left',field: (row: Store) => row.address.toString(),},
  {name: 'status',label: 'Status',field: (row: Store) => (row.active ? 'Ativo' : 'Inativo'),align: 'left',},
  //{ name: 'actions', label: 'Ações', align: 'center', field: 'actions' },
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

const viewFunction = (id: string) => //funções executadas de acordo com o id dos botões
  router.push(`/lojas/${HashIds.encryptId(id)}`);
const viewUsers = (id: string) =>
  router.push(`usuarios/store/${HashIds.encryptId(id)}`);
const addFunction = (id: string) =>
  router.push(`usuarios/criar/store/${HashIds.encryptId(id)}`);
const inviteSeller = (id: string) =>
  router.push(`usuarios/criar/seller/${HashIds.encryptId(id)}`);
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
const activateStore = async (store: Store) => {
  if (
    !(await ShowDialog.showConfirm(
      'Ativar loja',
      `Deseja realmente ATIVAR a loja ${store.fantasyName}?`,
      'warning'
    ))
  )
    return;
  loading.value = true;
  await storeStore
    .activateStore(store.id)
    .then(() => {
      refresh.value = !refresh.value;
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};
const disableStore = async (store: Store) => {
  if (
    !(await ShowDialog.showConfirm(
      'Desativar loja',
      `Deseja realmente DESATIVAR a loja ${store.fantasyName}?`,
      'negative'
    ))
  )
    return;
  loading.value = true;
  await storeStore
    .disableStore(store.id)
    .then(() => {
      refresh.value = !refresh.value;
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};
</script>
