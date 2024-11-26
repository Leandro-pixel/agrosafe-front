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

  </PrimaryTable>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  NotifyError,
} from 'src/utils/utils';
import { Formatter } from 'src/utils/formatter';
import { QTableColumn } from 'quasar';
import { useRouter } from 'vue-router';
import { translateStatusToColor } from 'src/models/enums/activeStatusEnum';
import { Pagination } from 'src/models/pagination'; //usa como propriedade para configurar a paginação
import PrimaryTable from 'src/components/list/PrimaryTable.vue';
import { useNotificationStore } from 'src/notifications/useNotificationStore';
import { Notifications } from 'src/models/notifications';

const columns: QTableColumn[] = [ //configura oque cada coluna mostra
  { name: 'id', label: 'ID', align: 'center', field: (row: Notifications) => row.id },
  {name: 'description',label: 'Descrição',align: 'left',field: (row: Notifications) => row.description,},
  { name: 'createdAt', label: 'data', align: 'center', field: (row: Notifications) => row.createdAt },
  //{name: 'address',label: 'Endereço',align: 'left',field: (row: Store) => row.address.toString(),},
  { name: 'actions', label: 'Ações', align: 'center', field: 'actions' },
];
const pagination = ref(new Pagination());
const filter = ref('');
const rows = ref([] as Array<Notifications>);
const notificationStore = useNotificationStore();
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
  console.log('veio aquiaqui')
  await notificationStore.fetchNotifications(limit, offset, filterWithoutSymbols)
    .then(() => {
      console.log('veio aquiaqui2' + notificationStore.getNotifications.toString() )

      rows.value = notificationStore.getNotifications;
      pagination.value.rowsNumber = notificationStore.totalItemsInDB;

      pagination.value.page = page;
      pagination.value.rowsPerPage = rowsPerPage;
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};
</script>
