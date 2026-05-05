<template>
  <q-layout>
    <q-page class="q-pa-md">
      <!-- HEADER -->
      <div class="row items-center justify-between q-mb-md">
        <q-btn color="primary" label="Nova Estação" @click="openCreateSpot" />
      </div>

      <!-- LISTA DE SPOTS -->
      <q-card v-for="spot in spots" :key="spot.id" class="q-mb-md">
        <q-card-section>
          <!-- INFO PRINCIPAL -->
          <div class="row justify-between items-center">
            <div>
              <div class="text-h6">{{ spot.name }}</div>
              <div class="text-caption">
                {{ spot.latitude }}, {{ spot.longitude }}
              </div>

              <!-- ⭐ MÉDIA -->
              <div class="row items-center q-mt-xs">
                <q-rating
                  :model-value="spot.avgRating || 0"
                  size="20px"
                  color="amber"
                  readonly
                />
                <span class="q-ml-sm">
                  {{ spot.avgRating?.toFixed(1) || 0 }} ({{
                    spot.reviews?.length || 0
                  }})
                </span>
              </div>
            </div>

            <div class="row q-gutter-sm">
              <q-btn icon="edit" flat @click="editSpot(spot)" />
              <q-btn
                icon="delete"
                flat
                color="negative"
                @click="deleteSpot(spot.id)"
              />
            </div>
          </div>

          <!-- REVIEWS -->
          <q-expansion-item label="Avaliações" icon="star" class="q-mt-md">
            <q-list bordered>
              <q-item v-for="review in spot.reviews" :key="review.id">
                <q-item-section>
                  <q-rating :model-value="review.rating" size="16px" readonly />

                  <!-- 👤 nome do usuário -->
                  <div class="text-caption text-grey-7">
                    {{ review.user?.name || 'Usuário' }}
                  </div>

                  <!-- 💬 comentário -->
                  <div>{{ review.comment }}</div>
                </q-item-section>

                <q-item-section side>
                  <q-btn
                    icon="edit"
                    flat
                    size="sm"
                    @click="editReview(spot, review)"
                  />
                  <q-btn
                    icon="delete"
                    flat
                    size="sm"
                    color="negative"
                    @click="deleteReview(review.id)"
                  />
                </q-item-section>
              </q-item>
            </q-list>

            <q-btn
              label="Nova Avaliação"
              flat
              color="primary"
              class="q-mt-sm"
              @click="openCreateReview(spot)"
            />
          </q-expansion-item>
        </q-card-section>
      </q-card>

      <!-- MODAL SPOT -->
      <q-dialog v-model="spotDialog">
        <q-card style="min-width: 400px">
          <q-card-section>
            <div class="text-h6">
              {{ editingSpot ? 'Editar' : 'Criar' }} Estação
            </div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="formSpot.name" label="Nome" />
            <q-input v-model="formSpot.latitude" label="Latitude" />
            <q-input v-model="formSpot.longitude" label="Longitude" />
            <q-input v-model="formSpot.pricePerKwh" label="Preço kWh" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" v-close-popup />
            <q-btn color="primary" label="Salvar" @click="saveSpot" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- MODAL REVIEW -->
      <q-dialog v-model="reviewDialog">
        <q-card style="min-width: 400px">
          <q-card-section>
            <div class="text-h6">
              {{ editingReview ? 'Editar' : 'Criar' }} Avaliação
            </div>
          </q-card-section>

          <q-card-section>
            <q-rating v-model="formReview.rating" />
            <q-input v-model="formReview.comment" label="Comentário" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" v-close-popup />
            <q-btn color="primary" label="Salvar" @click="saveReview" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue';
import api from 'src/lib/api';

interface SpotForm {
  id?: number;
  name: string;
  latitude: string;
  longitude: string;
  pricePerKwh?: number | null;
}

const formSpot: Ref<SpotForm> = ref({
  name: '',
  latitude: '',
  longitude: '',
  pricePerKwh: null,
});

const spots = ref([]);

const spotDialog = ref(false);
const reviewDialog = ref(false);

const editingSpot = ref(null);
const editingReview = ref(null);
const selectedSpot = ref(null);

const formReview = ref({ rating: 0, comment: '' });

onMounted(loadSpots);

async function loadSpots() {
  const response = await api.requestGet('/host/list-all-spots');
  const data = Array.isArray(response) ? response : response.data;

  // 🔥 calcula média no front (caso backend não mande)
  spots.value = data.map((s: any) => ({
    ...s,
    avgRating: calcAvg(s.reviews),
  }));
}

function calcAvg(reviews: any[]) {
  if (!reviews?.length) return 0;
  return reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
}

function getEmptySpot(): SpotForm {
  return {
    name: '',
    latitude: '',
    longitude: '',
    pricePerKwh: null,
  };
}

// ===== SPOT =====

function openCreateSpot() {
  editingSpot.value = null;
  formSpot.value = getEmptySpot();
  spotDialog.value = true;
}

function editSpot(spot: any) {
  editingSpot.value = spot;
  formSpot.value = { ...spot };
  spotDialog.value = true;
}

async function saveSpot() {
  if (editingSpot.value) {
    await api.requestPut('/support/update-spot', formSpot.value);
  } else {
    await api.requestPost('/spot/create', formSpot.value);
  }
  spotDialog.value = false;
  loadSpots();
}

async function deleteSpot(id: number) {
  await api.requestDelete(`/spot/delete?id=${id}`);
  loadSpots();
}

// ===== REVIEW =====

function openCreateReview(spot: any) {
  selectedSpot.value = spot;
  editingReview.value = null;
  formReview.value = { rating: 0, comment: '' };
  reviewDialog.value = true;
}

function editReview(spot: any, review: any) {
  selectedSpot.value = spot;
  editingReview.value = review;
  formReview.value = { ...review };
  reviewDialog.value = true;
}

async function saveReview() {
  const payload = {
    ...formReview.value,
    spotId: selectedSpot.value.id,
    id: editingReview.value?.id,
  };

  if (editingReview.value) {
    await api.requestPut('support/update-review', payload);
  } else {
    await api.requestPost('/review/create', payload);
  }

  reviewDialog.value = false;
  loadSpots();
}

async function deleteReview(id: number) {
  await api.requestDelete(`/review/delete?id=${id}`);
  loadSpots();
}
</script>
