<template>
  <q-layout>
  <q-page class="q-pa-md">
    <q-stepper v-model="step" vertical color="primary" animated transition-duration="500" class="default-box-shadow big-border-radius">
      <q-step :name="1" title="Dados" icon="settings" :done="step > 1" caption="Obrigatório" class="column justify-content">
        <p class="text-h6 text-bold">Documentos</p>
        <div>
          <q-input dense outlined v-model.trim="name" label="Nome do representante" lazy-rules class="half-width" :rules="[(val:string) => Validator.hasMultipleWords(val) || 'Campo obrigatório']"  />
          <q-input dense outlined v-model.trim="phone" label="Telefone do representante" mask="(##)#####-####" lazy-rules class="half-width" :rules="[(val:string) => Validator.isValidPhoneNumber(val) || 'Número inválido']"/>
          <q-input dense outlined v-model.trim="email" label="E-mail do representante" lazy-rules class="half-width" :rules="[(val:string) => Validator.isValidEmail(val) || 'E-mail inválido']"/>
        </div>
      </q-step>

      <q-step :name="2" title="Criar Polo" icon="check">
        <p class="text-h6 text-bold q-mb-md">Conclusão</p>
        <div class="q-pa-md">
          <p ><strong>Nome do representante:</strong> {{ name }}</p>
          <p ><strong>E-mail do representante:</strong> {{ email }}</p>
          <p ><strong>Telefone do representante:</strong> {{ phone }}</p>
        </div>
        <div class="text-h6 text-center">Você confirma que todos os dados fornecidos estão corretos?</div>
      </q-step>

      <q-stepper-navigation class="text-center">
        <PrimaryButton v-if="step > 1" flat @click="step--" label="Voltar" />
        <q-btn
        @click="checkFormValidation()" :color="getButtonColor()"
          :label="step === 3 ? 'Confirmar' : 'Continuar'"
          :loading="loading"
          />
      </q-stepper-navigation>
    </q-stepper>
  </q-page>
</q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHubStore } from 'src/stores/useHubStore'
//import { Address } from 'src/models/address'
import { Representative } from 'src/models/representative'
import { NotifyError, ShowDialog, ShowLoading } from 'src/utils/utils'
//import { useRouter } from 'vue-router'
import PrimaryButton from 'src/components/button/PrimaryButton.vue'
import { Validator } from 'src/utils/validator'

const step = ref(1)
const name = ref('')
const email = ref('')
const phone = ref('')
const employeeType = ref('representative')
const hubStore = useHubStore()
const loading = ref(false)

//const router = useRouter()


const submit = async () => {
  ShowLoading.show('Criando...');
	try {
		const representative = new Representative(
			name.value,
			email.value,
			phone.value,
			employeeType.value,
		)
		const response = await hubStore.createRepresentative(representative)
    await ShowDialog.show('Sucesso', 'Representante criado com sucesso!')
    await ShowLoading.hide('');
console.log(response)
		//router.push(`/polos/${HashIds.encryptId(response.id as string)}`)
	} catch (error:any) {
    await ShowLoading.hide('');
		NotifyError.error(error.message)
	}
}
const checkFormValidation = () => {
	if (step.value === 1 && name.value && Validator.isValidEmail(email.value) && employeeType.value && Validator.isValidPhoneNumber(phone.value)) {
		step.value = 2
	} else if (step.value === 2) {
		submit()
	} else {
		NotifyError.error('Preencha todos os campos obrigatórios.')
	}
}
const getButtonColor = () => {
	if (step.value === 1 && name.value && Validator.isValidEmail(email.value) && employeeType.value && Validator.isValidPhoneNumber(phone.value)) {
		return 'primary'
	} else if (step.value === 2) {
		return 'primary'
	} else {
		return 'grey'
	}
}
</script>
