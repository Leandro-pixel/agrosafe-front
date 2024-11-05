<template>
  <q-layout>
  <q-page-container class="row items-center justify-center text-center bg-accent" style="height: 100vh;">
    <q-card class="login__cards default-box-shadow big-border-radius">
      <!-- Card background -->
      <q-card-section class="login__card-back bg-primary text-white">
        <div class="text-h4">
          Seja bem-vindo à <div class="text-accent">{{ configStore.getConfig.tenantName }}!</div>
        </div>
      </q-card-section>
      <q-card-actions class="login__card flex-grow justify-center">
        <!--<q-img fit="fill" :src="configStore.getConfig.logoUrl" class="login__logo q-mb-md" />-->
        <q-form ref="myForm" @submit="submit" style="width: 60%">
          <div class="login__form">
            <q-input
              :error="invalidCredentials"
              outlined
              no-error-icon
              class="login__form__input q-mb-md"
              v-model="email"
              label="E-mail"
              autocomplete="username"
              :rules="[(val:any) => Validator.isValidEmail(val) || 'Por favor, insira um e-mail válido']"
              lazy-rules />
            <q-input
              :error="invalidCredentials"
              outlined
              no-error-icon
              class="login__form__input q-mb-md"
              v-model="password"
              label="Senha"
              :type="isPwd ? 'password' : 'text'"
              autocomplete="current-password"
              :rules="[(val:any) => Validator.isValidPassword(val) || 'Por favor, insira uma senha válida']"
              lazy-rules>
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" color="primary"/>
              </template>
            </q-input>
            <div class="row q-mb-md justify-between">
              <span class="text-blue cursor-pointer" @click="goToForgotPassword()">Esqueci minha senha</span>
              <q-checkbox dense v-model="rememberMe" label="Lembrar e-mail" color="primary" size="xs" />
            </div>
          </div>
          <PrimaryButton :loading="loading" label="Entrar" :btn-type="'submit'" rounded class="full-width" />
      <!--
          <div class="q-mt-xl">Foi convidado?</div>
          <PrimaryButton @click="router.push('/cadastrar')" label="Cadastre-se" :btn-type="'button'" outlined size="sm"/>
        -->
        </q-form>
      </q-card-actions>
    </q-card>
  </q-page-container>
</q-layout>
</template>

<script setup lang="ts">
import api from 'src/lib/api'
import { onMounted, ref } from 'vue'
import { NotifyError, ShowDialog } from 'src/utils/utils'
import { useConfigStore } from 'src/stores/useConfigStore'
import { useRouter } from 'vue-router'
import PrimaryButton from 'src/components/button/PrimaryButton.vue'
import { UnauthorizedError } from 'src/lib/errors/unauthorizedError'
import { Validator } from 'src/utils/validator'

const email = ref('')
const password = ref('')
const isPwd = ref(true)
const loading = ref(false)
const rememberMe = ref(false)
const configStore = useConfigStore()
const router = useRouter()
const invalidCredentials = ref(false)

const goToForgotPassword = () => router.push('/recuperar-senha') //tela de recuperação de senha
onMounted(() => { //quando a tela for montada ele vai avaliar se é pra trazer o email lembrado
	email.value = atob(localStorage.getItem('email') || '')
	email.value ? rememberMe.value = true : rememberMe.value = false
})

const submit = async () => { //função do login
	loading.value = true
	await api.login(email.value, password.value)
		.then(() => {
			rememberMe.value
				? localStorage.setItem('email', btoa(email.value))
				: localStorage.removeItem('email')
        router.push('/dashboard/segmentos')
		})
		.catch((error: any) => {
      console.log(error.message)
			if (error instanceof UnauthorizedError) {
				invalidCredentials.value = true
				NotifyError.error(error.message)
			} else {
        //router.push('/dashboard/segmentos')// autorizando entrar para testes

				ShowDialog.show('Erro', error.message)
			}
		})
		.finally(() => {
			loading.value = false
			setTimeout(() => {
				invalidCredentials.value = false
			}, 6000)
		})
}

</script>
