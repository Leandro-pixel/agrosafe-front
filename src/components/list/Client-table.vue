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
              { label: 'celular', value: 'phone' },
              { label: 'E-mail', value: 'email' },
              { label: 'Nome', value: 'name' },
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
          <PrimaryButton @click="onRequest(pagination)" label="Pesquisar" />
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
          <q-td v-if="implementHierarchy('sysAdmin')">
            <q-chip
              :class="
                'non-selectable bg-' +
                translateStatusToColor(
                  props.props.row.CCBStatus ? 'Ativo' : 'Inativo'
                )
              "
              size="md"
              flat
            >
              {{ props.props.row.CCBStatus ? 'Ativo' : 'Inativo' }}
            </q-chip>
          </q-td>
        </template>
        <template v-slot:body-cell-userName="props">
          <q-td>
            <span
              class="text-primary hoverable"
              @click="
                implementHierarchy('sysAdmin')
                  ? onNameClick(props.props.row.id, props.props.row.name)
                  : {}
              "
            >
              {{ props.props.row.name }}
            </span>
          </q-td>
        </template>
        <template
          #body-cell-actions="props"
          v-if="implementHierarchy('sysAdmin')"
        >
          <q-btn-dropdown flat color="primary" dropdown-icon="settings">
            <q-list>
              <q-td class="flex flex-row justify-center items-center gap-2">
                <PrimaryButton
                  icon="add_business"
                  flat
                  @click="
                    activateUser(
                      props.props.row.id,
                      props.props.row.name,
                      'true'
                    )
                  "
                  label="Ativar"
                />
                <PrimaryButton
                  icon="key_off"
                  flat
                  @click="
                    disableUser(
                      props.props.row.id,
                      props.props.row.name,
                      'false'
                    )
                  "
                  label="Desativar"
                />
                <PrimaryButton
                  icon="notifications"
                  flat
                  @click="openMessageSender(props.props.row.phone, 'BrandsCard: Sua avaliação avançou para a próxima etapa, agora basta acessar seu e-mail e assinar os termos que enviamos para você e seus créditos estarão liberados!','Quase lá!')"
                  label="Aceito"
                />
                <PrimaryButton
                  icon="notifications"
                  flat
                  @click="openMessageSender(props.props.row.phone,'Infelizmente neste momento não conseguimos aprova-lo como cliente ou estabelecimento na Brandscard. Dica: faca seu cadastro novamente em 06 meses para tentarmos aprova-lo. Agradecemos seu interesse e esperamos em breve estarmos juntos. Brandscard – muito além do limite.','Não aceito')"
                  label="Recusado"
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
import { implementHierarchy, NotifyError, ShowDialog } from 'src/utils/utils';
import PrimaryTable from 'src/components/list/PrimaryTable.vue';
import { QTableColumn } from 'quasar';
import { translateStatusToColor } from 'src/models/enums/activeStatusEnum';
import { useRouter } from 'vue-router';
import PrimaryButton from 'src/components/button/PrimaryButton.vue';
import { useCustomerStore } from 'src/stores/useCustomerStore';
import { CustomerBrands } from 'src/models/customer';
import { Formatter } from 'src/utils/formatter';

const router = useRouter();
const selectedSearchType = ref('');
// Recebe o ID da rota como propriedade
const properties = defineProps<{
  searchBy?: Array<{
    id?: number;
    cpf?: string;
    status?: boolean;
  }>;
}>();
const searchValueBy = ref('');
const pagination = ref(new Pagination());
const rows = ref([] as Array<CustomerBrands>);
const loading = ref(false);
const userStore = useCustomerStore();
const refresh = ref(false);
console.log('propriedades:' + properties);
// Índice do span ativo

const columns: QTableColumn[] = [
  {
    name: 'id',
    label: 'ID',
    field: (row: CustomerBrands) => row.id,
    align: 'center',
  },
  {
    name: 'userName',
    required: true,
    label: 'Name',
    field: (row: CustomerBrands) => row.name,
    align: 'left',
  },
  ...(implementHierarchy('sysAdmin')
    ? [
        {
          name: 'criado',
          required: true,
          label: 'data criação',
          field: (row: CustomerBrands) =>
            Formatter.formatDateToBR(row.createdAt),
          align: 'left' as const,
        },
      ]
    : []),
  {
    name: 'cpf',
    required: true,
    label: 'CPF',
    field: (row: CustomerBrands) => row.cpf,
    align: 'left',
  },
  {
    name: 'email',
    required: true,
    label: 'E-mail',
    field: (row: CustomerBrands) => row.email,
    align: 'left',
  },
  {
    name: 'celular',
    required: true,
    label: 'Celular',
    field: (row: CustomerBrands) => row.phone,
    align: 'left',
  },
  ...(implementHierarchy('sysAdmin')
    ? [
        {
          name: 'status',
          label: 'Status',
          field: (row: CustomerBrands) => (row.CCBStatus ? 'Ativo' : 'Inativo'),
          align: 'center' as const,
        },
      ]
    : []),
  ...(implementHierarchy('sysAdmin')
    ? [
        {
          name: 'actions',
          label: 'Ações',
          field: 'actions',
          align: 'center' as const,
        },
      ]
    : []),
];

const onNameClick = (id: any, name: any) => {
  console.log('name:', id + name);
  router.push({ path: `/clientes/${id}`, query: { name } });
};

const onRequest = async (props: any) => {
  console.log('chegou aqui1');
  if (!props.pagination) {
    await userStore
    .fetchBrandsUsers(
      null,
      null,
      selectedSearchType.value,
      searchValueBy.value
    )
    .then(() => {
      rows.value = userStore.getUsers;
      pagination.value.rowsNumber = userStore.totalItemsInDB;

    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
  } else{
  loading.value = true;
  const { page, rowsPerPage } = props.pagination;
  console.log('Página atual:', page);
  console.log('Linhas por página:', rowsPerPage);
  const offset = (page - 1) * rowsPerPage;
  const limit = rowsPerPage;
  console.log('offset', offset);
  await userStore
    .fetchBrandsUsers(
      limit,
      offset,
      selectedSearchType.value,
      searchValueBy.value
    )
    .then(() => {
      console.log('chegou aqui1');
      console.log('Usuários recebidos:', userStore.getUsers.length);
      console.log('Total de usuários no banco:', userStore.totalItemsInDB);
      rows.value = userStore.getUsers;
      pagination.value.rowsNumber = userStore.totalItemsInDB;
      pagination.value.page = page;
      pagination.value.rowsPerPage = rowsPerPage;
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
  }
};

const openMessageSender = async (phone: string,message: string, title: string) => {
  loading.value = true;
  await userStore
    .sendBureauMessage(phone, message, title)
    .then(() => {
      console.log('chegou aqui1');
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};

const activateUser = async (id: any, name: any, status: string) => {
  if (
    !(await ShowDialog.showConfirm(
      'Ativar usuário',
      `Deseja realmente ATIVAR o usuário "${name}"?`,
      'primary'
    ))
  )
    return;
  loading.value = true;
  console.log(id);
  await userStore
    .activateCustomer(id, status)
    .then(() => {
      refresh.value = !refresh.value;
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};

const disableUser = async (id: any, name: any, status: string) => {
  if (
    !(await ShowDialog.showConfirm(
      'Desativar usuário',
      `Deseja realmente DESATIVAR o usuário "${name}"?`,
      'negative'
    ))
  )
    return;
  loading.value = true;
  await userStore
    .activateCustomer(id, status)
    .then(() => {
      refresh.value = !refresh.value;
    })
    .catch((error: any) => NotifyError.error(error.message))
    .finally(() => {
      loading.value = false;
    });
};
</script>
