<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" no-route-dismiss>
    <q-card class="q-pa-xl popup-card">
      <q-icon>
        <q-icon name="message" size="50px" />
      </q-icon>
      <q-card-section class="text-h5 q-pa-md">
        {{ props.title }}
      </q-card-section>
      <q-card-section class="text-h6 q-pa-md">
        {{ props.description }}
      </q-card-section>
      <q-card-section class="full-width">
        <q-input
          bg-color="white"
          outlined
          dense
          v-model="phone"
          label="Número de telefone"
          :rules="[(val:string) => Validator.isValidPhoneNumber(val)]"
          mask="(##) #####-####"
          lazy-rules="ondemand"
        />
        <q-input
          bg-color="white"
          label="Insira o ID da loja"
          outlined
          lazy-rules="ondemand"
          v-model="messageText"
        />
      </q-card-section>
      <q-card-actions>
        <PrimaryButton
          :loading="loading"
          rounded
          size="md"
          label="Enviar convite"
          @click="onOKClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import PrimaryButton from '../button/PrimaryButton.vue';
import { ref } from 'vue';
import { useCustomerStore } from 'src/stores/useCustomerStore';
import { Validator } from 'src/utils/validator';
import { Formatter } from 'src/utils/formatter';
import { NotifyError } from 'src/utils/utils';

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  message: { type: String, required: true },
});

const phone = ref('');
const messageText = ref(props.message);
const loading = ref(false);

const { dialogRef, onDialogHide } = useDialogPluginComponent();

const customerStore = useCustomerStore();

async function onOKClick() {
  //aqui convida o user
  loading.value = true;
  Formatter.clearSymbols(phone.value);
  try {
    await customerStore.inviteCustomer(phone.value, messageText.value);
    NotifyError.success('Mensagem enviada com sucesso!');
  } catch (error) {
    if (error instanceof Error) {
      NotifyError.error(error.message);
    } else {
      NotifyError.error('Ocorreu um erro inesperado.');
    }
  } finally {
    loading.value = false;
    if (dialogRef && dialogRef.value) dialogRef.value.hide();
  }
}
</script>
