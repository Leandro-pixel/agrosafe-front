<template>
  <q-layout>
    <div class="flex justify-between q-mb-lg">
        <span
          class="q-pt-sm flex items-center text-h6 text-weight-bold text-primary"
          style="border-top: 0.25rem solid #401a58"
        >
          Cobranças
        </span>
        </div>
    <q-page-container class="row items-center justify-center text-center " style="height: 60vh;">
    <q-card class="q-pa-md big-border-radius default-box-shadow">
      <q-card-section >
        <q-item>
          <q-item-section >
            <q-item-label header class="text-h4">
              Gerar Cobrança
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-h6">
              <q-icon color="primary" name="credit_card" />
              Insira celular do cliente e o valor do serviço.
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section>
        <q-form ref="myForm" @submit="submit">
        <q-input dense class="col-grow" no-error-icon v-model="amount" label="Valor a ser cobrado" @update:model-value="formatCurrency" lazy-rules :rules="[(val:number) => !!val || 'Campo obrigatório']"/>
        <q-input dense class="col-grow" no-error-icon v-model.trim="phone" label="Celular" mask="(##)#####-####" lazy-rules :rules="[(val:string) => Validator.isValidPhoneNumber(val) || 'Número inválido']"/>
        <q-input dense class="col-grow" outlined v-model.trim="description" label="Descrição"  :rules="[ (val: string) => !!val ]" lazy-rules/>
                    <PrimaryButton type="submit" label="Enviar" :loading="loading"/>
                </q-form>
      </q-card-section>
    </q-card>
    </q-page-container>
    </q-layout>
</template>

<script setup lang="ts">
//import { useAuthStore } from 'src/stores/useAuthStore'
import { Validator } from 'src/utils/validator'
import { ref } from 'vue'
import PrimaryButton from 'src/components/button/PrimaryButton.vue'
import { NotifyError } from 'src/utils/utils'
import { Formatter } from 'src/utils/formatter'
import { useCustomerStore } from 'src/stores/useCustomerStore'

const phone = ref('')
const description = ref('')
const loading = ref(false)
const amount = ref('');
const customerStore = useCustomerStore();
const parsedValue = ref(0);

const formatCurrency = () => {
  // Limpar os símbolos não numéricos e verificar se o valor é válido
  const cleanedValue = Formatter.clearSymbolsAndLetters(amount.value);  // O valor é mantido como string aqui
  console.log('Valor limpo:', cleanedValue);  // Para depuração

  parsedValue.value = parseFloat(cleanedValue);  // Convertendo para número decimal
  if (!isNaN(parsedValue.value)) {
    // Aqui você pode formatar o valor como moeda
    amount.value = Formatter.formatNumberToBRCurrency(parsedValue.value);  // Atualizando amount com o valor formatado
  } else {
    console.error('Valor inválido');
    amount.value = '';  // Se o valor for inválido, limpe o campo
  }
};


//const showPassword = ref(false)
//const showPassword2 = ref(false)


const submit = async () => {
	loading.value = true
  const phoneUnformatted = Formatter.clearSymbolsAndLetters(phone.value)
	await customerStore.sendTransaction(phoneUnformatted, description.value, parsedValue.value)
		.then(() => {
			NotifyError.success('Senha alterada com sucesso!')
		})
		.catch((error:any) => NotifyError.error(error.message))
		.finally(() => { loading.value = false })
}
</script>
