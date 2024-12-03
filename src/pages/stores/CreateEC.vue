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
              label="Nome do proprietário"
              lazy-rules
              class="half-width"
              :rules="[(val:string) => !!val || 'Campo obrigatório']"
            />
            <q-input
              dense
              outlined
              v-model.trim="cpf"
              label="Documento - CPF"
              mask="###.###.###-##"
              lazy-rules
              class="half-width"
              :rules="[(val:string) => Validator.isValidCPF(val) || 'CPF inválido']"
            />
            <q-input
              dense
              outlined
              v-model.trim="cnpj"
              label="Documento - CNPJ"
              mask="##.###.###/####-##"
              lazy-rules
              class="half-width"
              :rules="[(val:string) => Validator.isValidCNPJ(val) || 'CNPJ inválido']"
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
              label="E-mail do estabelecimento"
              lazy-rules
              class="half-width"
              :rules="[(val:string) => Validator.isValidEmail(val) || 'E-mail inválido']"
            />
            <q-input
              dense
              outlined
              v-model.trim="establishmentPhone"
              label="Telefone do estabelecimento"
              mask="(##)#####-####"
              lazy-rules
              class="half-width"
              :rules="[(val:string) => Validator.isValidPhoneNumber(val) || 'Número inválido']"
            />
            <q-input
              dense
              outlined
              v-model.trim="employeeEmail"
              label="E-mail do proprietário"
              lazy-rules
              class="half-width"
              :rules="[(val:string) => Validator.isValidEmail(val) || 'E-mail inválido']"
            />
            <q-input
              dense
              outlined
              v-model.trim="employeePhone"
              label="Telefone do proprietário"
              mask="(##)#####-####"
              lazy-rules
              class="half-width"
              :rules="[(val:string) => Validator.isValidPhoneNumber(val) || 'Número inválido']"
            />
            <q-input
              dense
              outlined
              v-model.trim="poloId"
              label="ID do polo"
              lazy-rules
              class="half-width"
              :rules="[(val:number) => !!val || 'Campo obrigatório']"
              v-if="implementHierarchy('sysAdmin')"
            />
          </div>
        </q-step>

      <q-step :name="3" title="Endereço" icon="place" :done="step > 2" caption="Obrigatório" class="column justify-content">
        <p class="text-h6 text-bold">Informações do endereço</p>
        <div>
          <q-input dense outlined v-model.trim="address.zipCode.code" label="Cep" lazy-rules
          :rules="[(val: string) => !val || val.length === 10 || 'CEP inválido']"  mask="##.###-###"
            class="half-width" />
          <q-input dense outlined v-model.trim="address.city" label="Cidade"
            class="half-width" :rules="[ (val: string) => !!val ]" lazy-rules/>
          <q-input dense outlined v-model.trim="address.uf" label="Estado"
            class="half-width"  :rules="[ (val: string) => !!val ]" lazy-rules/>
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

        <q-step :name="4" title="Criar Loja" icon="check">
          <p class="text-h6 text-bold q-mb-md">Conclusão</p>
          <div class="q-pa-md">
            <p><strong>Nome da empresa:</strong> {{ businessName }}</p>
            <p><strong>Nome fantasia:</strong> {{ tradeName }}</p>
            <p><strong>Nome do proprietário:</strong> {{ employeeName }}</p>
            <p><strong>CPF:</strong> {{ cpf }}</p>
            <p><strong>CNPJ:</strong> {{ cnpj }}</p>
            <p>
              <strong>E-mail do estabelecimento:</strong>
              {{ establishmentEmail }}
            </p>
            <p>
              <strong>Telefone do estabelecimento:</strong>
              {{ establishmentPhone }}
            </p>
            <p><strong>E-mail do proprietário:</strong> {{ employeeEmail }}</p>
            <p><strong>Telefone do proprietário</strong> {{ employeePhone }}</p>
            <p><strong>CEP:</strong> {{ address.zipCode }}</p>
          <p><strong>Cidade:</strong> {{ address.city }}</p>
          <p><strong>Estado:</strong> {{ address.uf }}</p>
          <p><strong>Bairro:</strong> {{ address.neighborhood }}</p>
          <p><strong>Rua:</strong> {{ address.street }}</p>
          <p><strong>Número:</strong> {{ address.number }}</p>
            <p v-if="implementHierarchy('sysAdmin')" ><strong>ID do polo</strong> {{ poloId }}</p>
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
//import { Address } from 'src/models/address'
//import { Hub } from 'src/models/hub'
import { implementHierarchy, NotifyError, ShowDialog } from 'src/utils/utils';
import { Validator } from 'src/utils/validator';
import { EC } from 'src/models/store';
import { useStoreStore } from 'src/stores/useStoreStore';
//import {  useRouter } from 'vue-router'
import { ref } from 'vue';
import PrimaryButton from 'src/components/button/PrimaryButton.vue';
import { Address } from 'src/models/address';
//import { Formatter } from 'src/utils/formatter';
const address = ref(new Address())
const step = ref(1);
const businessName = ref('');
const tradeName = ref('');
const cpf = ref('');
const cnpj = ref('');
const establishmentEmail = ref('');
const establishmentPhone = ref('');
const employeeEmail = ref('');
const employeePhone = ref('');
const employeeName = ref('');
const poloId = ref(0);
const useNumber = ref(false)
const storeStore = useStoreStore();
//const route = useRoute()
//const router = useRouter()

const updateAddressNumber = () => {
	if (useNumber.value) {
		address.value.number = 'S/N'
	} else {
		address.value.number = ''
	}
}
/*
const amount = ref('');
const initialLimit = ref('');
const maximumLimit = ref('');
const poloId = ref(0);
const intAmount = ref(0);
const intInitialLimit = ref(0);
const intMaximumLimit = ref(0);

const formatCurrency = (witchField: string): void => {

  if (witchField == 'amount'){
    const cleanedValue = Formatter.clearSymbolsAndLetters(amount.value);
    intAmount.value = parseFloat(cleanedValue);
    if (!isNaN(intAmount.value)) {
      amount.value = Formatter.formatNumberToBRCurrency(intAmount.value);
  } else {
    console.error('Valor inválido');
    amount.value = '';
  }

  } else if(witchField == 'initialLimit'){
    const cleanedValue = Formatter.clearSymbolsAndLetters(initialLimit.value);
    intInitialLimit.value = parseFloat(cleanedValue);
    if (!isNaN(intInitialLimit.value)) {
      initialLimit.value = Formatter.formatNumberToBRCurrency(intInitialLimit.value);
  } else {
    console.error('Valor inválido');
    initialLimit.value = '';
  }
  } else {
    const cleanedValue = Formatter.clearSymbolsAndLetters(maximumLimit.value);
    intMaximumLimit.value = parseFloat(cleanedValue);
    if (!isNaN(intMaximumLimit.value)) {
      maximumLimit.value = Formatter.formatNumberToBRCurrency(intMaximumLimit.value);
  } else {
    console.error('Valor inválido');
    maximumLimit.value = '';
  }
  }
};
*/

const submit = async () => {
  try {
    const store = new EC(
      businessName.value,
      tradeName.value,
      cpf.value,
      cnpj.value,
      establishmentEmail.value,
      establishmentPhone.value,
      employeeEmail.value,
      employeePhone.value,
      employeeName.value,
      poloId.value,
      address.value
    );
    console.log(store)
    const response = await storeStore.createEC(store);

    ShowDialog.show('Sucesso!', 'A loja foi criada com sucesso!');
    console.log(response);
    //router.push(`/lojas/${HashIds.encryptId(response.id as string)}`)
  } catch (error: any) {
    NotifyError.error(error.message);
  }
};
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
  } else if (step.value === 3) {
    step.value = 4;
  }
    else if(step.value === 4){
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
  } else if(step.value === 4) {
    return 'primary';
  } else{
    return 'grey';
  }
};
</script>
