<template>
  <q-layout :loading="loading">
    <q-page >
  <div>
          <PrimaryButton flat @click="refreshData" label="Atualizar" :loading="loading" />

        </div>
      <div class="flex row q-gutter-md justify-between full-width">
  <q-list bordered>
          <q-item v-for="(notifications, index) in notifications" :key="index" class="transaction-item">
            <q-item-section>
              <q-item-label>{{
              notifications.createdAt
}}</q-item-label>
              <div class="flex row justify-between">
                <q-item-label class="q-item-label--break-word" caption>{{
                  notifications.description}}</q-item-label>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
        </div>
      </q-page>
      </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { NotifyError } from 'src/utils/utils';
import { Formatter } from 'src/utils/formatter';
//import { useRouter } from 'vue-router';
import { Pagination } from 'src/models/pagination'; //usa como propriedade para configurar a paginação
import { useNotificationStore } from 'src/stores/useNotificationStore';
import { Notifications } from 'src/models/notifications';
import PrimaryButton from 'src/components/button/PrimaryButton.vue';


const pagination = ref(new Pagination());
const filter = ref('');
const notifications = ref([] as Array<Notifications>);
const notificationStore = useNotificationStore();
const loading = ref(false);
//const refresh = ref(false);
//const router = useRouter();

onMounted(() => {
  console.log('foi montado')
  loading.value = true;
  onRequest({ pagination: pagination.value });
});

const refreshData = () => {
  loading.value = true;
  onRequest({ pagination: pagination.value });
};

const onRequest = async (props: any) => {
  loading.value = true;
  const { page, rowsPerPage } = props.pagination;

  const offset = page - 1;
  const limit = rowsPerPage;
  const filterWithoutSymbols = Formatter.clearSymbols(filter.value);
  console.log('veio aquiaqui');
  await notificationStore
    .fetchNotifications(limit, offset, filterWithoutSymbols)
    .then(() => {
      console.log(
        'veio aquiaqui2' + notificationStore.getNotifications
      );

      notifications.value = notificationStore.getNotifications;
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
<style scoped>
.q-btn {
  min-width: 150px;
}
.transaction-item {
  border-bottom: 4px solid #ccc; /* Cor e espessura da linha de separação */
  padding-bottom: 10px; /* Espaço entre a transação e a linha de separação */
}

.transaction-item:last-child {
  border-bottom: none; /* Remove a linha de separação do último item */
}
.row {
  align-items: flex-start; /* Alinha os itens no topo */
}
</style>
