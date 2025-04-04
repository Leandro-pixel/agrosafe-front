<template>
  <q-layout>
    <q-page class="q-pa-md">
      <div class="flex justify-between q-mb-lg">
        <span
          class="q-pt-sm flex items-center text-h6 text-weight-bold text-primary"
          style="border-top: 0.25rem solid #401a58"
        >
          Gerenciar senhas
        </span>
      </div>
      <div class="q-ma-md column justify-center items-center text-center" style="height: 80vh;">
      <q-card class="q-pa-md big-border-radius default-box-shadow">
      <q-card-section>
        <q-item>
          <q-item-section>
            <q-item-label header class="text-h4">
              Alterar senha de um usuário
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-h6">
              <q-icon color="primary" name="lock" />
              Insira o ID o usuário e o tipo de usuário
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section>
        <q-form ref="myForm" @submit="onRequest">
                  <q-input dense class="col-grow" no-error-icon v-model="userId" label="ID do usuário" :rules="[(val) => Validator.isValidNumber(val) || 'Por favor, insira um ID válido']" lazy-rules :type=" 'number'" >
                  </q-input>
                  <q-select
            v-model="userType"
            filled
            dense
            :options="[
              { label: 'Cliente final', value: 'user' },
              { label: 'EC', value: 'EC' },
              { label: 'Fornecedor', value: 'for' },
              { label: 'Representante', value: 'rep' },
              { label: 'Polo', value: 'polo' },
            ]"
            label="Tipo de usuário"
            outlined
            map-options
            emit-value
          />
                    <PrimaryButton class="q-mt-md" type="submit" label="Enviar" :loading="loading"/>
                </q-form>
      </q-card-section>
    </q-card>
    </div>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import { Validator } from 'src/utils/validator'
import { ref } from 'vue'
//import { useRouter } from 'vue-router'
import PrimaryButton from 'src/components/button/PrimaryButton.vue'
import { NotifyError, ShowDialog, ShowLoading } from 'src/utils/utils'

//import { useAuthStore } from 'src/stores/useAuthStore';
import { useHubStore } from 'src/stores/useHubStore';
import { useStoreStore } from 'src/stores/useStoreStore';
import { useSuplierStore } from 'src/stores/useSuplierStore';
import { useAuthStore } from 'src/stores/useAuthStore';

const userId = ref()
const userType = ref('')
const loading = ref(false)
const hubStore = useHubStore();
const storeStore = useStoreStore();
const suplierStore = useSuplierStore();
const store = useAuthStore()

const onRequest = async () => {
  console.log('chegou aqui1');
  if (userType.value == 'polo') {
    searchPolo(userId.value)
  } else if (userType.value == 'rep') {
    searchRepresentative(userId.value)
  }else if (userType.value == 'for') {
    searchFor(userId.value)
  }else if (userType.value == 'EC') {
    searchEC(userId.value)
  }else if (userType.value == 'user') {
    searchUser(userId.value)
  }
}

const searchPolo = async (userId: number) => {

  try {
    loading.value = true;
    const response = await hubStore.fetchOnePolo(userId);
    console.log('Dados retornados:', response); // Debugging
    if (
    !(await ShowDialog.showConfirm(
      'Gerar nova senha',
      `Deseja realmente gerar uma nova senha para ${response.name}?`,
      'primary'
    ))
  )
    return;
    generate(userId,false)
  } catch (error: any) {
    NotifyError.error(error.message);
  } finally {
    loading.value = false;
  }
};

const searchRepresentative = async (userId: number) => {

  try {
    loading.value = true;
    const response = await hubStore.fetchOneRep(userId);
    console.log('Dados retornados:', response); // Debugging
    if (
    !(await ShowDialog.showConfirm(
      'Gerar nova senha',
      `Deseja realmente gerar uma nova senha para ${response.name}?`,
      'primary'
    ))
  )
    return;
    generate(userId,false)
  } catch (error: any) {
    NotifyError.error(error.message);
  } finally {
    loading.value = false;
  }
};

const searchEC = async (userId: number) => {

  try {
    loading.value = true;
    const response = await storeStore.fetchOneStore(userId, false);
    console.log('Dados retornados:', response); // Debugging
    if (
    !(await ShowDialog.showConfirm(
      'Gerar nova senha',
      `Deseja realmente gerar uma nova senha para ${response.businessName}?`,
      'primary'
    ))
  )
    return;
    generate(userId,false)
  } catch (error: any) {
    NotifyError.error(error.message);
  } finally {
    loading.value = false;
  }
};

const searchFor = async (userId: number) => {

  try {
    loading.value = true;
    const response = await suplierStore.fetchOneStore(userId, true);
    console.log('Dados retornados:', response); // Debugging
    if (
    !(await ShowDialog.showConfirm(
      'Gerar nova senha',
      `Deseja realmente gerar uma nova senha para ${response.businessName}?`,
      'primary'
    ))
  )
    return;
    generate(userId,false)
  } catch (error: any) {
    NotifyError.error(error.message);
  } finally {
    loading.value = false;
  }
};

const searchUser = async (userId: number) => {
  try {
    loading.value = true;
    const response = await hubStore.fetchOneUser(userId);
    console.log('Dados retornados:', response); // Debugging
    if (
    !(await ShowDialog.showConfirm(
      'Gerar nova senha',
      `Deseja realmente gerar uma nova senha para ${response.name}?`,
      'primary'
    ))
  )
    return;
    generate(userId,true)
  } catch (error: any) {
    NotifyError.error(error.message);
  } finally {
    loading.value = false;
  }
};

const generate = async (userId: number, userType: boolean) => {
  await ShowLoading.show('Alterando...');
	loading.value = true
	await store.changePasswordBySupport(userId, userType)
		.then( async () => {
			//router.push('/conta')
      await ShowLoading.hide('');
			NotifyError.success('Senha alterada com sucesso!')
		})
		.catch((error:any) => NotifyError.error(error.message))
		.finally(async () => {
      await ShowLoading.hide('');
      loading.value = false })
}

</script>

