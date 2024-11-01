<template>
  <div class="q-pa-md">
    <q-stepper v-model="step" vertical color="primary" animated transition-duration="500" class="default-box-shadow big-border-radius">
      <q-step :name="1" title="Dados" icon="settings" :done="step > 1" caption="Obrigatório" class="column justify-content">
        <p class="text-h6 text-bold">Informações da Loja</p>
        <div>
          <q-input dense outlined v-model.trim="fullName" label="Nome completo" lazy-rules class="half-width" :rules="[(val:string) => Validator.hasMultipleWords(val) || 'Campo obrigatório']"  />
          <q-input dense outlined v-model.trim="fantasyName" label="Nome fantasia" lazy-rules class="half-width" :rules="[(val:string) => !!val || 'Campo obrigatório']" />
          <q-input dense outlined v-model.trim="document" label="Documento - CNPJ" mask="##.###.###/####-##" lazy-rules class="half-width" :rules="[(val:string) => Validator.isValidCNPJ(val) || 'CNPJ inválido']"/>
          <q-input dense outlined v-model.trim="phone" label="Telefone" mask="(##) #####-####" lazy-rules class="half-width" :rules="[(val:string) => Validator.isValidPhoneNumber(val) || 'Telefone inválido']" />
        </div>
      </q-step>

      <q-step :name="2" title="Endereço" icon="place" :done="step > 2" caption="Obrigatório" class="column justify-content">
        <p class="text-h6 text-bold">Informações do endereço</p>
        <div>
          <q-input dense outlined v-model.trim="address.zipCode.code" label="Cep" lazy-rules
            :rules="[(val: string) => val.length === 10 ]" mask="##.###-###"
            class="half-width" @blur="AddressUtils.getAddress(address.zipCode, address)" />
          <q-input dense outlined v-model.trim="address.city" label="Cidade"
            class="half-width" :readonly="address.zipCode.code.length === 10" :rules="[ (val: string) => !!val ]" lazy-rules/>
          <q-input dense outlined v-model.trim="address.uf" label="Estado"
            class="half-width" :readonly="!!address.zipCode" :rules="[ (val: string) => !!val ]" lazy-rules/>
          <q-input dense outlined v-model.trim="address.neighborhood" label="Bairro"
            class="half-width" :rules="[ (val: string) => !!val ]" lazy-rules/>
          <q-input dense outlined v-model.trim="address.street" label="Rua"
            class="half-width" :rules="[ (val: string) => !!val ]" lazy-rules/>
          <q-input dense outlined v-model.trim="address.number" label="Número"
            class="half-width" hide-bottom-space :readonly="useNumber"
            :rules="[ (val: string) => useNumber || !isNaN(Number(val)) ]"/>
          <q-checkbox class="q-ml-md" v-model.trim="useNumber" @update:model-value="updateAddressNumber()" label="Casa sem número"/>
        </div>
      </q-step>

      <q-step :name="3" title="Criar Loja" icon="check">
        <p class="text-h6 text-bold q-mb-md">Conclusão</p>
        <div class="q-pa-md">
          <p ><strong>Nome completo:</strong> {{ fullName }}</p>
          <p ><strong>Nome fantasia:</strong> {{ fantasyName }}</p>
          <p ><strong>Documento:</strong> {{ document }}</p>
          <p ><strong>Telefone:</strong> {{ phone }}</p>
          <p ><strong>CEP:</strong> {{ address.zipCode }}</p>
          <p ><strong>Cidade:</strong> {{ address.city }}</p>
          <p ><strong>Estado:</strong> {{ address.uf }}</p>
          <p ><strong>Bairro:</strong> {{ address.neighborhood }}</p>
          <p ><strong>Rua:</strong> {{ address.street }}</p>
          <p ><strong>Número:</strong> {{ address.number }}</p>
        </div>
        <div class="text-h6 text-center">Você confirma que todos os dados fornecidos estão corretos?</div>
      </q-step>

      <q-stepper-navigation class="text-center">
        <PrimaryButton v-if="step > 1" flat @click="step--" label="Voltar" />
        <q-btn @click="checkFormValidation()" :color="getButtonColor()"
          :label="step === 3 ? 'Confirmar' : 'Continuar'"/>
      </q-stepper-navigation>
    </q-stepper>
  </div>
</template>

<script setup lang="ts">
import { Address } from 'src/models/address'
import { Hub } from 'src/models/hub'
import { AddressUtils, HashIds, NotifyError, ShowDialog } from 'src/utils/utils'
import { Validator } from 'src/utils/validator'
import { Store } from 'src/models/store'
import { useStoreStore } from 'src/stores/useStoreStore'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import PrimaryButton from 'src/components/button/PrimaryButton.vue'

const step = ref(1)
const document = ref('')
const fullName = ref('')
const fantasyName = ref('')
const phone = ref('')
const address = ref(new Address())
const useNumber = ref(false)
const storeStore = useStoreStore()
const route = useRoute()
const router = useRouter()

const updateAddressNumber = () => {
	if (useNumber.value) {
		address.value.number = 'S/N'
	} else {
		address.value.number = ''
	}
}

const submit = async () => {
	try {
		const store = new Store(
			'',
			fullName.value,
			fantasyName.value,
			document.value,
			true,
			Date.now(),
			address.value,
			new Hub(
				HashIds.decryptId(route.params.hubId as string)
			),
			phone.value
		)

		const response = await storeStore.createStore(store)

		ShowDialog.show('Sucesso!', 'A loja foi criada com sucesso!')

		router.push(`/lojas/${HashIds.encryptId(response.id as string)}`)
	} catch (error:any) {
		NotifyError.error(error.message)
	}
}
const checkFormValidation = () => {
	if (step.value === 1 && fullName.value && fantasyName.value && Validator.isValidCNPJ(document.value) && Validator.isValidPhoneNumber(phone.value)) {
		step.value = 2
	} else if (step.value === 2 && address.value.zipCode && address.value.city && address.value.uf && address.value.neighborhood && address.value.street && address.value.number) {
		step.value = 3
	} else if (step.value === 3) {
		submit()
	} else {
		NotifyError.error('Preencha todos os campos obrigatórios.')
	}
}
const getButtonColor = () => {
	if (step.value === 1 && fullName.value && fantasyName.value && Validator.isValidCNPJ(document.value) && Validator.isValidPhoneNumber(phone.value)) {
		return 'primary'
	} else if (step.value === 2 && address.value.zipCode && address.value.city && address.value.uf && address.value.neighborhood && address.value.street && address.value.number) {
		return 'primary'
	} else if (step.value === 3) {
		return 'primary'
	} else {
		return 'grey'
	}
}
</script>
