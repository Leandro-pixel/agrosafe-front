<template>
  <q-layout>
    <q-page class="q-pa-md">
      <!-- HEADER -->
      <div class="row items-center justify-between q-mb-md">
        <div class="text-h6">Usuários</div>
      </div>

      <!-- TABELA -->
      <q-card>
        <q-table
          title="Drivers"
          :rows="drivers"
          :columns="columns"
          row-key="id"
          :loading="loading"
          :pagination="pagination"
          @request="onRequest"
        >
          <!-- AÇÕES -->
          <template v-slot:body-cell-actions="props">
            <q-td align="right">
              <q-btn icon="edit" flat @click="editDriver(props.row)" />
              <q-btn
                icon="delete"
                flat
                color="negative"
                @click="deleteDriver(props.row.id)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card>

      <!-- MODAL -->
      <q-dialog v-model="dialog">
        <q-card style="min-width: 400px">
          <q-card-section>
            <div class="text-h6">Editar Usuário</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="form.name" label="Nome" />
            <q-input v-model="form.email" label="Email" />
            <q-input v-model="form.phone" label="Telefone" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" v-close-popup />
            <q-btn color="primary" label="Salvar" @click="saveDriver" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import api from 'src/lib/api';
import type { QTableProps } from 'quasar';

interface Driver {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  createdAt: string;
}

const drivers = ref<Driver[]>([]);
const loading = ref(false);

const dialog = ref(false);
const editingDriver = ref<Driver | null>(null);

const form = ref<Partial<Driver>>({});

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});

// 🔥 colunas da tabela

const columns: QTableProps['columns'] = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: 'Nome', field: 'name' },
  { name: 'email', label: 'Email', field: 'email' },
  { name: 'phone', label: 'Telefone', field: 'phone' },
  { name: 'createdAt', label: 'Criado em', field: 'createdAt' },
  { name: 'actions', label: 'Ações', field: 'actions', align: 'right' },
];
// 🔥 chamada paginada
async function onRequest(props: any) {
  const { page, rowsPerPage } = props.pagination;

  loading.value = true;

  try {
    const response = await api.requestGet('/driver/list', {
      page,
      limit: rowsPerPage,
    });

    // 🔥 adapta pro teu backend
    drivers.value = response.data;
    pagination.value.rowsNumber = response.totalItems;
    pagination.value.page = page;
    pagination.value.rowsPerPage = rowsPerPage;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

// ===== EDIT =====

function editDriver(driver: Driver) {
  editingDriver.value = driver;
  form.value = { ...driver };
  dialog.value = true;
}

async function saveDriver() {
  await api.requestPut('/driver/update', form.value);

  dialog.value = false;

  // recarrega tabela
  onRequest({ pagination: pagination.value });
}

// ===== DELETE =====

async function deleteDriver(id: number) {
  await api.requestDelete(`/driver/delete?id=${id}`);

  onRequest({ pagination: pagination.value });
}
</script>
