<template>
  <q-layout>
    <q-page class="column">
      <div class="q-gutter-md items-start">
        <span>Selecione um tipo de busca</span>

        <div class="row q-gutter-md items-center">
          <q-select
            v-model="selectedSearchType"
            filled
            dense
            :options="[
              { label: 'CPF', value: 'cpf' },
              { label: 'CNPJ', value: 'cnpj' },
              { label: 'celular', value: 'phone' },
              { label: 'E-mail', value: 'email' },
              { label: 'Nome', value: 'tradeName' },
              { label: 'RG', value: 'rg' },
            ]"
            label="Buscar por..."
            outlined
            map-options
            emit-value
          />
          <q-input
            v-if="selectedSearchType != ''"
            v-model="searchValueBy"
            placeholder="Digite aqui..."
            outlined
            dense
            filled
          />
          <PrimaryButton @click="onRequest" label="Pesquisar" />
        </div>
      </div>
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
          <q-td>
            <q-chip
              :class="
                'non-selectable bg-' +
                translateStatusToColor(
                  props.props.row.status ? 'Ativo' : 'Inativo'
                )
              "
              size="md"
              flat
            >
              {{ props.props.row.status ? 'Ativo' : 'Inativo' }}
            </q-chip>
          </q-td>
        </template>
        <template v-slot:body-cell-businessName="props">
          <q-td>
            <span
              class="text-primary hoverable"
              @click="
                onNameClick(props.props.row.id, props.props.row.businessName)
              "
            >
              {{ props.props.row.businessName }}
            </span>
          </q-td>
        </template>
        <!--aqui são as ações-->
        <template
          v-slot:body-cell-actions="props"
          v-if="implementHierarchy('sysAdmin')"
        >
          <q-btn-dropdown flat color="primary" dropdown-icon="settings">
            <q-list>
              <q-td class="flex justify-center items-center gap-2">
                <PrimaryButton
                  icon="add_business"
                  flat
                  @click="activateStore(props.props.row, props.props.row.id)"
                  label="Ativar EC"
                />
                <PrimaryButton
                  icon="key_off"
                  flat
                  @click="disableStore(props.props.row, props.props.row.id)"
                  label="Desativar EC"
                />
                <PrimaryButton
                  icon="key_off"
                  flat
                  @click="
                    details(
                      props.props.row.id,
                      props.props.name,
                      props.props.status
                    )
                  "
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
import { implementHierarchy, NotifyError, ShowDialog } from 'src/utils/utils';
import PrimaryTable from 'src/components/list/PrimaryTable.vue';
import { QTableColumn } from 'quasar';
import { translateStatusToColor } from 'src/models/enums/activeStatusEnum';
import { useRouter } from 'vue-router';
import PrimaryButton from 'src/components/button/PrimaryButton.vue';
import { useStoreStore } from 'src/stores/useStoreStore';
import { EC, Store } from 'src/models/store';

const router = useRouter();

// Recebe o ID da rota como propriedade
const props1 = defineProps<{
  searchBy?: Array<{
    id?: number;
    cpf?: string;
    status?: boolean;
  }>;
  id1?: number;
}>();

const selectedSearchType = ref('');
const searchValueBy = ref('');
const pagination = ref(new Pagination());
const loading = ref(false);
const refresh = ref(false);
//const filter = ref('');

console.log('propriedades:' + props1);
const rows = ref([] as Array<Store>);
const storeStore = useStoreStore();

const columns: QTableColumn[] = [
  //configura oque cada coluna mostra
  { name: 'id', label: 'ID', align: 'center', field: (row: Store) => row.id },
  {
    name: 'businessName',
    label: 'Nome completo',
    align: 'left',
    field: (row: EC) => row.businessName,
  },
  {
    name: 'document',
    label: 'Documento',
    align: 'left',
    field: (row: EC) =>
      row.cnpj && row.cnpj.length > 0
        ? Formatter.strToCnpj(row.cnpj)
        : row.cpf
        ? Formatter.strToCpf(row.cpf)
        : '',
  },
  {
    name: 'status',
    label: 'Status',
    field: (row: Store) => (row.active ? 'Ativo' : 'Inativo'),
    align: 'left',
  },
  { name: 'actions', label: 'Ações', align: 'center', field: 'actions' },
];

const details = async (id: any, name: any, status: string) => {
  console.log(id, name, status);
};

const onNameClick = (id: any, name: any) => {
  console.log('name:', id + name);
  router.push({ path: `/lojas/estabelecimentos/${id}`, query: { name } });
};

const onRequest = async () => {
  loading.value = true;

  await storeStore
    .fetchStores(null, null, selectedSearchType.value, searchValueBy.value, props1.id1)
    .then(() => {
      rows.value = storeStore.getStores;
      pagination.value.rowsNumber = storeStore.totalItemsInDB;


    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};
const activateStore = async (ec: EC, id: string) => {
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
    .activateEC(id, true)
    .then(() => {
      refresh.value = !refresh.value;
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};
const disableStore = async (ec: EC, id: string) => {
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
    .activateEC(id, false)
    .then(() => {
      refresh.value = !refresh.value;
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};
</script>
