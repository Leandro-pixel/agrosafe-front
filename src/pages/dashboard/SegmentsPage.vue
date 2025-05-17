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
          <p class="text-h6 text-bold">Informações</p>
          <div>
            <q-input
              dense
              outlined
              v-model.trim="name"
              label="Nome da cidade"
              lazy-rules
              class="half-width"
              :rules="[(val:string) => Validator.isValidName(val) || 'Campo obrigatório']"
            />
            <q-input
              dense
              outlined
              v-model.trim="temperaturaMediaDiaria"
              label="Temperatura Média Diaria"
              suffix="°C"
              lazy-rules
              class="half-width"
              :rules="[(val:string) => Validator.isValidNumber(Formatter.clearSymbolsAndLetters(val)) || 'Número inválido']"
            />
            <q-input
              dense
              outlined
              v-model.trim="umidadeRelativaAr"
              label="Umidade Relativa do Ar"
              suffix="%"
              lazy-rules
              class="half-width"
              :rules="[(val:string) => Validator.isValidNumber(Formatter.clearSymbolsAndLetters(val)) || 'Número inválido']"
            />
            <q-input
              dense
              outlined
              v-model.trim="precipitacao"
              label="Precipitação"
              suffix="mm"
              lazy-rules
              class="half-width"
              :rules="[(val:string) => Validator.isValidNumber(Formatter.clearSymbolsAndLetters(val)) || 'Número inválido']"
            />
            <q-input
              dense
              outlined
              v-model.trim="indiceUmidadeSolo"
              label="Indice Umidade do Solo"
              suffix="%"
              lazy-rules
              class="half-width"
              :rules="[(val:string) => Validator.isValidNumber(Formatter.clearSymbolsAndLetters(val)) || 'Número inválido']"
            />
            <q-input
              dense
              outlined
              v-model.trim="indiceVegetacao"
              label="Indice de vegetação"
              suffix="NDVI"
              lazy-rules
              class="half-width"
              :rules="[(val:string) => Validator.isValidNumber(Formatter.clearSymbolsAndLetters(val)) || 'Número inválido']"
            />
            <q-input
              dense
              outlined
              v-model.trim="areaQueimada"
              label="Area Queimada"
              suffix="ha"
              lazy-rules
              class="half-width"
              :rules="[(val:string) => Validator.isValidNumber(Formatter.clearSymbolsAndLetters(val)) || 'Número inválido']"
            />
          </div>
        </q-step>

        <q-step :name="2" title="Criar Polo" icon="check">
          <p class="text-h6 text-bold q-mb-md">Conclusão</p>
          <div class="q-pa-md">
            <p><strong>Nome da cidade:</strong> {{ name }}</p>
            <p>
              <strong>Temperatura Média Diária:</strong>
              {{ temperaturaMediaDiaria }} °C
            </p>
            <p>
              <strong>Umidade Relativa do Ar:</strong> {{ umidadeRelativaAr }} %
            </p>
            <p><strong>Precipitação:</strong> {{ precipitacao }} mm</p>
            <p>
              <strong>Índice Umidade do Solo:</strong> {{ indiceUmidadeSolo }} %
            </p>
            <p>
              <strong>Índice de Vegetação:</strong> {{ indiceVegetacao }} NDVI
            </p>
            <p><strong>Área Queimada:</strong> {{ areaQueimada }} ha</p>
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
            :label="step === 3 ? 'Confirmar' : 'Continuar'"
            :loading="loading"
          />
        </q-stepper-navigation>
      </q-stepper>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useReportStore } from 'src/stores/useUserStore';
//import { Address } from 'src/models/address'
import { Report } from 'src/models/representative';
import { NotifyError, ShowDialog, ShowLoading } from 'src/utils/utils';
//import { useRouter } from 'vue-router'
import PrimaryButton from 'src/components/button/PrimaryButton.vue';
import { Validator } from 'src/utils/validator';
import { Formatter } from 'src/utils/formatter';

const step = ref(1);
const name = ref('');
const temperaturaMediaDiaria = ref();
const umidadeRelativaAr = ref();
const precipitacao = ref();
const indiceUmidadeSolo = ref();
const indiceVegetacao = ref();
const areaQueimada = ref();
const reportStore = useReportStore();
const loading = ref(false);
//const numberMask = ref('##,##');

//const router = useRouter()

const submit = async () => {
  ShowLoading.show('Criando...');
  const id = localStorage.getItem('accessToken');

  try {
    const report = new Report(
      id,
      temperaturaMediaDiaria.value,
      umidadeRelativaAr.value,
      precipitacao.value,
      indiceUmidadeSolo.value,
      indiceVegetacao.value,
      name.value,
      null,
      areaQueimada.value
    );
    const response = await reportStore.createReport(report);
    await ShowDialog.show('Sucesso', 'Relatório criado com sucesso!');
    await ShowLoading.hide('');
    console.log(response);
    //router.push(`/polos/${HashIds.encryptId(response.id as string)}`)
  } catch (error: any) {
    await ShowLoading.hide('');
    NotifyError.error(error.message);
  }
};
const checkFormValidation = () => {
  console.log(Validator.isValidNumber(areaQueimada.value.toString()));
  if (
    step.value === 1 &&
    name.value &&
    Validator.isValidNumber(areaQueimada.value.toString())
  ) {
    step.value = 2;
  } else if (step.value === 2) {
    submit();
  } else {
    NotifyError.error('Preencha todos os campos obrigatórios.');
  }
};
const getButtonColor = () => {
  if (
    step.value === 1 &&
    name.value &&
    Validator.isValidNumber(areaQueimada.value.toString())
  ) {
    return 'primary';
  } else if (step.value === 2) {
    return 'primary';
  } else {
    return 'grey';
  }
};
</script>
