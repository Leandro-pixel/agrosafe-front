<template>
  <q-layout>
    <q-page-container class="page_padding custom_center flex bg-page window-height relative-position">
      <div class="flex column  justify-center items-center z-max "> <!-- div do box para logar-->
        <q-img
          src="icons/logo_brands.png"
          fit="contain"
          class="custom_logo"
        />
    <q-card class="login__cards default-box-shadow big-border-radius">
      <q-card-section >
        <q-item >
          <q-item-section class="justify-center items-center" >
            <q-item-label header class="text-h4">
              Recuperar senha
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section class="justify-center items-center">
            <q-item-label class="text-h6">
              <q-icon color="primary" name="lock" />
              Insira seu E-mail, CPF/CNPJ e celular.
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class="q-pr-xl q-pl-xl">
        <q-form ref="myForm" @submit="submit" >
                  <q-input dense class="col-grow" no-error-icon v-model="email" label="E-mail" :rules="[(val:string) => Validator.isValidEmail(val) || 'E-mail inválido']"/>
                  <q-input dense class="col-grow" no-error-icon v-model="document" label="CPF/CNPJ" @update:model-value="updateMask" :mask="currentMask" :rules="[validateDocument]" /> <!-- @input é um watcher-->
                  <q-input dense class="col-grow" no-error-icon v-model.trim="phone" label="Celular" mask="(##)#####-####" lazy-rules :rules="[(val:string) => Validator.isValidPhoneNumber(val) || 'Número inválido']"/>
                </q-form>
                <q-item-section class="justify-center items-center">
                  <PrimaryButton type="submit" label="Enviar" :loading="loading" rounded />
                </q-item-section>
      </q-card-section>
    </q-card>
      </div>
      <q-img
          src="images/login_background.jpg"
          fit="cover"
          class="corner-image  absolute-bottom-right"
        />
    </q-page-container>
    </q-layout>
</template>

<script setup lang="ts">
//import { useAuthStore } from 'src/stores/useAuthStore'
import { Validator } from 'src/utils/validator'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PrimaryButton from 'src/components/button/PrimaryButton.vue'
import { NotifyError } from 'src/utils/utils'
import { useAuthStore } from 'src/stores/useAuthStore';

const email = ref('')
const document = ref('')
const phone = ref('')
const loading = ref(false)
const store = useAuthStore()
const currentMask = ref('###.###.###-##');
//const showPassword = ref(false)
//const showPassword2 = ref(false)
const router = useRouter()

const updateMask = () => {
  const cleanedValue = document.value.replace(/\D/g, ''); // Remove caracteres não numéricos
  if (cleanedValue.length >= 12) {
    currentMask.value = '##.###.###/####-##'; // Máscara de CNPJ
  } else {
    currentMask.value = '###.###.###-###'; // Máscara de CPF
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


const submit = async () => {
	loading.value = true
	await store.sendForgotPassword(email.value, document.value, phone.value)
		.then(() => {
			router.push('/')
			NotifyError.success('Senha alterada com sucesso!')
		})
		.catch((error:any) => NotifyError.error(error.message))
		.finally(() => { loading.value = false })
}
</script>
