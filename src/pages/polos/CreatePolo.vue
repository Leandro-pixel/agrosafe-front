<template>
  <q-layout>
  <q-page class="q-pa-md">
    <q-stepper v-model="step" vertical color="primary" animated transition-duration="500" class="default-box-shadow big-border-radius">
      <q-step :name="1" title="Dados" icon="settings" :done="step > 1" caption="Obrigatório" class="column justify-content">
        <p class="text-h6 text-bold">Documentos</p>
        <div>
          <q-input dense outlined v-model.trim="name" label="Nome do polo" lazy-rules class="half-width" :rules="[(val:string) => Validator.hasMultipleWords(val) || 'Campo obrigatório']"  />
          <q-input dense outlined v-model.trim="phone" label="Telefone do polo" mask="(##)#####-####" lazy-rules class="half-width" :rules="[(val:string) => Validator.isValidPhoneNumber(val) || 'Número inválido']"/>
          <q-input dense outlined v-model.trim="email" label="E-mail do polo" lazy-rules class="half-width" :rules="[(val:string) => Validator.isValidEmail(val) || 'E-mail inválido']"/>
        </div>
      </q-step>

      <q-step :name="2" title="Criar Polo" icon="check">
        <p class="text-h6 text-bold q-mb-md">Conclusão</p>
        <div class="q-pa-md">
          <p ><strong>Nome do polo:</strong> {{ name }}</p>
          <p ><strong>E-mail do polo:</strong> {{ email }}</p>
          <p ><strong>Telefone do polo:</strong> {{ phone }}</p>
        </div>
        <div class="text-h6 text-center">Você confirma que todos os dados fornecidos estão corretos?</div>
      </q-step>

      <q-stepper-navigation class="text-center">
        <PrimaryButton v-if="step > 1" flat @click="step--" label="Voltar" />
        <q-btn @click="checkFormValidation()" :color="getButtonColor()"
          :label="step === 3 ? 'Confirmar' : 'Continuar'"/>
      </q-stepper-navigation>
    </q-stepper>
  </q-page>
</q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHubStore } from 'src/stores/useHubStore'
//import { Address } from 'src/models/address'
import { Polo } from 'src/models/hub'
import { NotifyError, ShowDialog } from 'src/utils/utils'
//import { useRouter } from 'vue-router'
import PrimaryButton from 'src/components/button/PrimaryButton.vue'
import { Validator } from 'src/utils/validator'

const step = ref(1)
const name = ref('')
const email = ref('')
const phone = ref('')
const employeeType = ref('polo')
const hubStore = useHubStore()
//const router = useRouter()


const submit = async () => {
	try {
		const polo = new Polo(
			name.value,
			email.value,
			phone.value,
			employeeType.value,

		)

		const response = await hubStore.createPolo(polo)

		await ShowDialog.show('Sucesso', 'Polo criado com sucesso!')
console.log(response)
		//router.push(`/polos/${HashIds.encryptId(response.id as string)}`)
	} catch (error:any) {
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
