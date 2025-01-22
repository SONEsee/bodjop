<template>
  <v-container>
    <v-card class="mx-auto" max-width="800">
      <v-card-title class="text-center"><h3>QR Code ສະແກນ</h3></v-card-title>
      <v-card-text>
        <v-row justify="center" class="mb-4">
          <v-col cols="auto">
            <v-btn-group>
              <v-btn
                :color="isScanning ? 'error' : 'primary'"
                @click="toggleCamera"
                :loading="loading"
                :prepend-icon="isScanning ? 'mdi-camera-off' : 'mdi-camera'"
              >
                {{ isScanning ? 'ປິດກ້ອງ' : 'ເປີດກ້ອງ' }}
              </v-btn>
              <v-btn
                color="secondary"
                prepend-icon="mdi-upload"
                @click="$refs.fileInput.click()"
              >
                ອັບໂຫຼດຮູບ QR
              </v-btn>
            </v-btn-group>
          </v-col>
        </v-row>

        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          @change="handleFileUpload"
          style="display: none"
        />

        <v-row justify="center">
          <v-col cols="12" class="position-relative">
            <div class="scanner-container">
              <video ref="video" class="scanner-video" :class="{ hidden: !isScanning || selectedImage }"></video>
              <img v-if="selectedImage" :src="selectedImage" class="uploaded-image" />
              <div class="scanner-overlay" v-if="isScanning || selectedImage">
                <div class="scanner-line"></div>
              </div>
              <v-progress-circular
                v-if="loading"
                indeterminate
                color="primary"
                size="64"
                class="scanner-loading"
              ></v-progress-circular>
            </div>
          </v-col>
        </v-row>

        <v-slide-y-transition>
          <v-alert v-if="result" color="success" icon="mdi-qrcode-scan" class="mt-4">
            {{ result }}
          </v-alert>
        </v-slide-y-transition>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import QrScanner from 'qr-scanner';

const video = ref<HTMLVideoElement>();
const fileInput = ref<HTMLInputElement>();
const isScanning = ref(false);
const loading = ref(false);
const result = ref('');
const selectedImage = ref<string | null>(null);
let qrScanner: QrScanner | null = null;

onMounted(() => {
  initScanner();
});

onBeforeUnmount(() => {
  stopCamera();
});

function initScanner() {
  if (!video.value) return;
  
  qrScanner = new QrScanner(
    video.value,
    (result) => {
      handleScanResult(result);
    },
    {
      preferredCamera: 'environment',
      highlightScanRegion: true,
      highlightCodeOutline: true,
      returnDetailedScanResult: true
    }
  );
}

function handleScanResult(scanResult: QrScanner.ScanResult) {
  result.value = scanResult.data;
}

async function toggleCamera() {
  if (isScanning.value) {
    stopCamera();
  } else {
    startCamera();
  }
}

async function startCamera() {
  if (!qrScanner) return;
  
  try {
    loading.value = true;
    await qrScanner.start();
    isScanning.value = true;
  } catch (error) {
    console.error('Camera error:', error);
    result.value = 'ບໍ່ສາມາດເປີດກ້ອງໄດ້';
  } finally {
    loading.value = false;
  }
}

function stopCamera() {
  if (qrScanner) {
    qrScanner.stop();
  }
  isScanning.value = false;
  result.value = '';
  selectedImage.value = null; 
}

const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    loading.value = true;
    try {
      // Show selected image
      const reader = new FileReader();
      reader.onload = (e) => {
        selectedImage.value = e.target?.result as string;
      };
      reader.readAsDataURL(file);

      // Scan QR code
      const scanResult = await QrScanner.scanImage(file, {
        returnDetailedScanResult: true
      });
      result.value = scanResult.data;
    } catch (error) {
      console.error('QR Processing error:', error);
      result.value = 'ບໍ່ສາມາດອ່ານ QR Code ໄດ້';
    } finally {
      loading.value = false;
    }
  }
};
</script>

<style scoped>
.scanner-container {
  position: relative;
  width: 100%;
  max-width: 640px;
  height: 480px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  background: #000;
}

.scanner-video,
.scanner-canvas {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.scanner-video.hidden {
  display: none;
}

.uploaded-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.scanner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px solid #42A5F5;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.1);
}

.scanner-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background: #42A5F5;
  box-shadow: 0 0 8px #42A5F5;
  animation: scan 2s linear infinite;
}

.scanner-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes scan {
  0% {
    top: 0;
  }
  50% {
    top: 100%;
  }
  100% {
    top: 0;
  }
}
</style>