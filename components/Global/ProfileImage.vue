<script lang="ts" setup>
import notFoundImage from "@/assets/img/404.png";
const notFoundUrl = ref(notFoundImage);
const image_url = ref(null as string | null);
const globalStore = UseGlobalStore();
const props = defineProps({
  image_url: {
    // required: false,
    default: "N/A",
    type: [String, File],
  },

  size: {
    type: String,
    default: "200",
  },
});

const imageLink = computed(() => {
  return props.image_url ?? "N/A";
});

const profile_enable = computed(() => {
  return localStorage.getItem("profile_enable") ?? null;
});

const profile_image_localStorage = computed(() => {
  return localStorage.getItem("profile_image_url") ?? notFoundImage;
});

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => resolve(reader.result as string);
  });
}

async function fetchAndCacheImage(link: string | File) {
  try {
    const imageResponse = await globalStore.GetFileData(link);
    if (imageResponse) {
      // If GetFileData returns a blob URL or raw Blob, convert to Base64
      let cacheableData = imageResponse;
      if (imageResponse.startsWith("blob:")) {
        const blob = await fetch(imageResponse).then((res) => res.blob());
        cacheableData = await blobToBase64(blob);
      }
      // Store in localStorage
      localStorage.setItem("profile_image_url", cacheableData);
      localStorage.setItem("profile_enable", "1");
      image_url.value = cacheableData;
    } else {
      image_url.value = notFoundUrl.value;
    }
  } catch (error) {
    console.error("Failed to fetch image:", error);
    image_url.value = notFoundUrl.value;
  }
}

watch(
  imageLink,
  async (newVal) => {
    if (newVal === "N/A" || !newVal) {
      image_url.value = notFoundUrl.value;
      return;
    }

    if (profile_enable.value === "0") {
      // Fetch and cache if not enabled
      await fetchAndCacheImage(newVal);
    } else {
      // Use cached value
      image_url.value = profile_image_localStorage.value;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <v-avatar
      :size="props.size"
      class="mx-auto d-flex align-center"
      color="grey lighten-2"
    >
      <v-img
        alt="Image profile"
        :src="image_url === null ? notFoundUrl : image_url"
      ></v-img>
    </v-avatar>
  </div>
</template>
