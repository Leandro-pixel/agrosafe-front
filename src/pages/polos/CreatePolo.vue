<template>
  <q-layout>
    <q-page class="q-pa-md">
      <q-stepper
        v-model="step"
        vertical
        color="primary"
        animated
        transition-duration="500"
        class="default-box-shadow big-border-radius"
      >
        <q-step
          :name="1"
          title="Dados"
          icon="settings"
          :done="step > 1"
          caption="Obrigatório"
          class="column justify-content"
        >
          <p class="text-h6 text-bold">Documentos</p>
          <div>
            <q-input
              dense
              outlined
              v-model.trim="businessName"
              label="Nome da empresa"
              lazy-rules
              class="half-width"
              :rules="[(val:string) => Validator.hasMultipleWords(val) || 'Campo obrigatório']"
            />
            <q-input
              dense
              outlined
              v-model.trim="tradeName"
              label="Nome fantasia"
              lazy-rules
              class="half-width"
              :rules="[(val:string) => !!val || 'Campo obrigatório']"
            />
            <q-input
              dense
              outlined
              v-model.trim="employeeName"
              label="Nome do polo"
              lazy-rules
              class="half-width"
              :rules="[(val:string) => !!val || 'Campo obrigatório']"
            />
            <q-input
              dense
              outlined
              class="half-width"
              v-model.trim="document"
              label="CPF/CNPJ"
              @update:model-value="updateMask"
              :mask="currentMask"
              :rules="[validateDocument]"
            />
          </div>
        </q-step>
        <q-step
          :name="2"
          title="Dados de contato"
          icon="place"
          :done="step > 2"
          caption="Obrigatório"
          class="column justify-content"
        >
          <p class="text-h6 text-bold">Informações de contato</p>
          <div>
            <q-input
              dense
              outlined
              v-model.trim="establishmentEmail"
              label="E-mail da empresa"
              lazy-rules
              class="half-width"
              :rules="[(val:string) => Validator.isValidEmail(val) || 'E-mail inválido']"
            />
            <q-input
              dense
              outlined
              v-model.trim="establishmentPhone"
              label="Telefone da empresa"
              mask="(##)#####-####"
              lazy-rules
              class="half-width"
              :rules="[(val:string) => Validator.isValidPhoneNumber(val) || 'Número inválido']"
            />
            <q-input
              dense
              outlined
              v-model.trim="employeeEmail"
              label="E-mail do polo"
              lazy-rules
              class="half-width"
              :rules="[(val:string) => Validator.isValidEmail(val) || 'E-mail inválido']"
            />
            <q-input
              dense
              outlined
              v-model.trim="employeePhone"
              label="Telefone do polo"
              mask="(##)#####-####"
              lazy-rules
              class="half-width"
              :rules="[(val:string) => Validator.isValidPhoneNumber(val) || 'Número inválido']"
            />
          </div>
        </q-step>

        <q-step
          :name="3"
          title="Endereço"
          icon="place"
          :done="step > 2"
          caption="Obrigatório"
          class="column justify-content"
        >
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
            :rules="[ (val: string) => useNumber || Validator.isValidNumber(val) ]"/>
          <q-checkbox class="q-ml-md" v-model.trim="useNumber" @update:model-value="updateAddressNumber()" label="Casa sem número"/>
          </div>
        </q-step>

        <q-step :name="4" title="Criar Polo" icon="check">
          <p class="text-h6 text-bold q-mb-md">Conclusão</p>
          <div class="q-pa-md">
            <p><strong>Nome da empresa:</strong> {{ businessName }}</p>
            <p><strong>Nome fantasia:</strong> {{ tradeName }}</p>
            <p><strong>Nome do polo:</strong> {{ employeeName }}</p>
            <p>
              <strong>{{ documentType }}:</strong> {{ document }}
            </p>
            <p>
              <strong>E-mail da empresa:</strong>
              {{ establishmentEmail }}
            </p>
            <p>
              <strong>Telefone da empresa:</strong>
              {{ establishmentPhone }}
            </p>

            <p><strong>E-mail do Polo:</strong> {{ employeeEmail }}</p>
            <p><strong>Telefone do Polo</strong> {{ employeePhone }}</p>
            <p><strong>CEP:</strong> {{ address.zipCode.code }}</p>
          <p><strong>Cidade:</strong> {{ address.city }}</p>
          <p><strong>Estado:</strong> {{ address.uf }}</p>
          <p><strong>Bairro:</strong> {{ address.neighborhood }}</p>
          <p><strong>Rua:</strong> {{ address.street }}</p>
          <p><strong>Número:</strong> {{ address.number }}</p>
          </div>
          <div class="text-h6 text-center">
            Você confirma que todos os dados fornecidos estão corretos?
          </div>
        </q-step>

        <q-stepper-navigation class="text-center">
          <PrimaryButton v-if="step > 1" flat @click="step--" label="Voltar" />
          <q-btn
            @click="checkFormValidation()"
            :color="getButtonColor()"
            :label="step === 4 ? 'Confirmar' : 'Continuar'"
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
import { Polo } from 'src/models/hub'
import { AddressUtils,NotifyError, ShowDialog, ShowLoading } from 'src/utils/utils'
//import { useRouter } from 'vue-router'
import PrimaryButton from 'src/components/button/PrimaryButton.vue'
import { Validator } from 'src/utils/validator'
import { Address } from 'src/models/address'

const step = ref(1);
const businessName = ref('');
const tradeName = ref('');
const cpf = ref('');
const cnpj = ref('');
const document = ref('');
const establishmentEmail = ref('');
const establishmentPhone = ref('');
const employeeEmail = ref('');
const employeePhone = ref('');
const employeeName = ref('');
const city = ref('');
const state = ref('');
const neighborhood = ref('');
const street = ref('');
const number = ref('');
const postalCode = ref('');
const complement = ref('');
const employeeId = ref(0);
const address = ref(new Address());
const useNumber = ref(false);
const currentMask = ref('###.###.###-##');
const documentType = ref('cpf');

const updateAddressNumber = () => {
  if (useNumber.value) {
    address.value.number = '';
  } else {
    address.value.number = '';
  }
};

const validateDocument = () => {
  const cleanedVal = document.value.replace(/\D/g, '');
  if (cleanedVal.length <= 11) {
    return Validator.isValidCPF(cleanedVal) || 'CPF inválido';
  } else if (cleanedVal.length === 14) {
    return Validator.isValidCNPJ(cleanedVal) || 'CNPJ inválido';
  } else {
    return 'Documento inválido';
  }
};

const updateMask = () => {
  const cleanedValue = document.value.replace(/\D/g, ''); // Remove caracteres não numéricos
  if (cleanedValue.length >= 12) {
    currentMask.value = '##.###.###/####-##'; // Máscara de CNPJ
    cnpj.value = document.value;
    cpf.value = '';
    documentType.value = 'cnpj';
  } else {
    currentMask.value = '###.###.###-###'; // Máscara de CPF
    cpf.value = document.value;
    cnpj.value = '';
    documentType.value = 'cpf';
  }
};
const hubStore = useHubStore()
//const router = useRouter()


const submit = async () => {
  await ShowLoading.hide('Criando...');
	try {
		const polo = new Polo(
			businessName.value,
      tradeName.value,
      cpf.value,
      cnpj.value,
      establishmentEmail.value,
      establishmentPhone.value,
      employeeEmail.value,
      employeePhone.value,
      employeeName.value,
      address.value,
      city.value,
      state.value,
      neighborhood.value,
      street.value,
      number.value,
      postalCode.value,
      complement.value,
      employeeId.value.toString(),
      'true'
		)
		await hubStore.createPolo(polo)
    await ShowLoading.hide('');
		await ShowDialog.show('Sucesso', 'Polo criado com sucesso!')
	} catch (error:any) {
    await ShowLoading.hide('');
		NotifyError.error(error.message)
	}
}
const checkFormValidation = () => {
  if (
    step.value === 1 &&
    businessName.value &&
    tradeName.value &&
    employeeName.value &&
    (Validator.isValidCNPJ(cnpj.value) || Validator.isValidCPF(cpf.value))
  ) {
    step.value = 2;
  } else if (
    step.value === 2 &&
    Validator.isValidPhoneNumber(establishmentPhone.value) &&
    Validator.isValidPhoneNumber(employeePhone.value) &&
    Validator.isValidEmail(establishmentEmail.value) &&
    Validator.isValidEmail(employeeEmail.value)
  ) {
    step.value = 3;
  } else if (
    step.value === 3  &&
    address.value.zipCode &&
    address.value.city &&
    address.value.uf &&
    address.value.neighborhood &&
    address.value.street &&
    address.value.number
  ) {
    step.value = 4;
  } else if (step.value === 4) {
    submit();
  } else {
    NotifyError.error('Preencha todos os campos obrigatórios.');
  }
};
const getButtonColor = () => {
  if (
    step.value === 1 &&
    businessName.value &&
    tradeName.value &&
    employeeName.value &&
    (Validator.isValidCNPJ(cnpj.value) || Validator.isValidCPF(cpf.value))
  ) {
    return 'primary';
  } else if (
    step.value === 2 &&
    Validator.isValidPhoneNumber(establishmentPhone.value) &&
    Validator.isValidPhoneNumber(employeePhone.value) &&
    Validator.isValidEmail(establishmentEmail.value) &&
    Validator.isValidEmail(employeeEmail.value)
  ) {
    return 'primary';
  } else if (step.value === 3) {
    return 'primary';
  } else if (step.value === 4) {
    return 'primary';
  } else {
    return 'grey';
  }
};
</script>
