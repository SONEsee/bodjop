<template>
  <v-container>
    <v-card class="mx-auto" max-width="800">
      <v-card-title class="text-center text-h5 py-4">QR Code ສະແກນ</v-card-title>

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
              <video ref="video" class="scanner-video" :class="{ hidden: !isScanning }"></video>
              <canvas ref="canvas" class="scanner-canvas"></canvas>
              <div class="scanner-overlay">
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
import { ref, onMounted, onUnmounted } from 'vue';


const video = ref<HTMLVideoElement>();
const canvas = ref<HTMLCanvasElement>();
const fileInput = ref<HTMLInputElement>();
const context = ref<CanvasRenderingContext2D | null>(null);
const stream = ref<MediaStream>();
const result = ref('');
const isScanning = ref(false);
const loading = ref(false);

onMounted(() => {
  initializeCanvas();
});

onUnmounted(() => {
  stopCamera();
});

const initializeCanvas = () => {
  if (!canvas.value) return;
  context.value = canvas.value.getContext('2d', { willReadFrequently: true });
  if (!context.value) return;
  canvas.value.width = 640;
  canvas.value.height = 480;
};

const toggleCamera = async () => {
  if (isScanning.value) {
    stopCamera();
  } else {
    await startCamera();
  }
};

const startCamera = async () => {
  try {
    loading.value = true;
    stream.value = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
    });
    if (video.value && stream.value) {
      video.value.srcObject = stream.value;
      await video.value.play();
      isScanning.value = true;
      processVideoFrame();
    }
  } catch (error) {
    console.error('Camera error:', error);
    result.value = 'ບໍ່ສາມາດເປີດກ້ອງໄດ້';
  } finally {
    loading.value = false;
  }
};

const stopCamera = () => {
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop());
  }
  isScanning.value = false;
  result.value = '';
};

const processVideoFrame = () => {
  if (!isScanning.value || !video.value || !canvas.value || !context.value) return;
  context.value.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
  const imageData = context.value.getImageData(0, 0, canvas.value.width, canvas.value.height);
  try {
    processQRCode(imageData);
  } catch (error) {
    console.error('QR Processing error:', error);
  }
  requestAnimationFrame(processVideoFrame);
};

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        if (!canvas.value || !context.value) return;
        canvas.value.width = img.width;
        canvas.value.height = img.height;
        context.value.drawImage(img, 0, 0);
        const imageData = context.value.getImageData(0, 0, canvas.value.width, canvas.value.height);
        processQRCode(imageData);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const processQRCode = (imageData: ImageData) => {
  try {
    const qrProcessor = new QRProcessor(); // Add this line
    const qrData = qrProcessor.extractQRData(imageData); // Change to use QRProcessor
    result.value = qrData || 'ບໍ່ສາມາດອ່ານ QR Code ໄດ້';
  } catch (error) {
    console.error('Decoding failed:', error);
    result.value = 'ບໍ່ສາມາດອ່ານ QR Code ໄດ້';
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

.scanner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px solid #42A5F5;
  pointer-events: none;
}

.scanner-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background: #42A5F5;
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