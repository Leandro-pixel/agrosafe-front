<template>
  <div class="q-ma-md column justify-center items-center text-center" style="height: 80vh;">
    <q-card class="q-pa-md big-border-radius default-box-shadow">
      <q-card-section>
        <q-item>
          <q-item-section>
            <q-item-label header class="text-h4">
              Alterar senha
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-h6">
              <q-icon color="primary" name="lock" />
              Insira sua senha atual e a nova senha
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section>
        <q-form ref="myForm" @submit="submit">
                  <q-input dense class="col-grow" no-error-icon v-model="currentPassword" label="Senha atual" :rules="[(val) => Validator.isValidPassword(val) || 'Por favor, insira uma senha válida']" lazy-rules :type="showPassword ? 'text' : 'password'" >
                      <template v-slot:append>
                          <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="showPassword = !showPassword" />
                      </template>
                  </q-input>
                  <q-input dense class="col-grow" no-error-icon v-model="newPassword" label="Nova senha" :rules="[(val) => Validator.isValidPassword(val) || 'Por favor, insira uma senha válida']" lazy-rules :type="showPassword2 ? 'text' : 'password'" >
                      <template v-slot:append>
                          <q-icon :name="showPassword2 ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="showPassword2 = !showPassword2" />
                      </template>
                  </q-input>
                    <PrimaryButton type="submit" label="Enviar" :loading="loading"/>
                </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
//import { useAuthStore } from 'src/stores/useAuthStore'
import { Validator } from 'src/utils/validator'
import { ref } from 'vue'
//import { useRouter } from 'vue-router'
import PrimaryButton from 'src/components/button/PrimaryButton.vue'
import { NotifyError } from 'src/utils/utils'
import { useAuthStore } from 'src/stores/useAuthStore';

const currentPassword = ref('')
const newPassword = ref('')
const loading = ref(false)
const store = useAuthStore()
const showPassword = ref(false)
const showPassword2 = ref(false)
//const router = useRouter()

const submit = async () => {
	loading.value = true
	await store.changePassword(currentPassword.value, newPassword.value)
		.then(() => {
			//router.push('/conta')
			NotifyError.success('Senha alterada com sucesso!')
		})
		.catch((error:any) => NotifyError.error(error.message))
		.finally(() => { loading.value = false })
}
</script>
