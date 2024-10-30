<template>
  <q-layout>
    <q-page class="column">
      <!-- Campo de Busca -->
      <div class="flex justify-between">
        <span
          class="q-pt-sm flex items-center text-h6 text-weight-bold text-primary"
          style="border-top: 0.25rem solid #401a58;"
        >
          Clientes
        </span>
        <PrimaryButton flat @click="openMessageSender" class=" gt-sm">
            <div class="column flex-center q-gutter-y-sm">
              <q-icon name="message" color="primary" />
              <span>+Convidar Cliente</span>
            </div>
          </PrimaryButton>

      </div>
      <q-page-container>
      <router-view class="q-pa-md" />
      </q-page-container>

    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import PrimaryButton from 'src/components/button/PrimaryButton.vue';
import { useConfigStore } from 'src/stores/useConfigStore';
import { ShowDialog } from 'src/utils/utils';
import { ref } from 'vue';

const config = useConfigStore()

const messageText = ref(config.getConfig.SmsMessage)

const openMessageSender = async () => {
	await ShowDialog.showSendMessagePopUp('Convide!', 'Insira um número de celular e o link de convite do seu estabelecimento!', messageText.value)
}
</script>
