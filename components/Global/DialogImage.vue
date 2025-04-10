<script lang="ts" setup>
import notFoundImage from "@/assets/img/404.png";

const globalStore = UseGlobalStore();
</script>

<template>
  <v-dialog
    :model-value="globalStore.request_dialog_image.loading"
    max-width="320"
    persistent
  >
    <v-list class="py-2" color="primary" elevation="12" rounded="lg">
      <v-list-item
        prepend-icon="$vuetify-outline"
        title="Refreshing Application..."
      >
        <template v-slot:prepend>
          <div class="pe-4">
            <v-icon color="primary" size="x-large"></v-icon>
          </div>
        </template>

        <template v-slot:append>
          <v-progress-circular
            color="primary"
            indeterminate="disable-shrink"
            size="16"
            width="2"
          ></v-progress-circular>
        </template>
      </v-list-item>
    </v-list>
  </v-dialog>

  <v-dialog
    :model-value="globalStore.request_dialog_image.dialog"
    scrollable
    fullscreen
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card>
      <v-toolbar color="primary">
        <v-btn
          icon="mdi-close"
          @click="globalStore.request_dialog_image.dialog = false"
        ></v-btn>

        <v-toolbar-title>ຮູບພາບ</v-toolbar-title>

        <v-toolbar-items>
          <v-btn
            text="Save"
            variant="text"
            @click="globalStore.request_dialog_image.dialog = false"
          ></v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <div
        style="width: 100%; height: 95vh"
        class="d-flex flex-wrap justify-center align-center"
      >
        <v-img
          :src="
            globalStore.response_dialog_image.file != null
              ? globalStore.response_dialog_image.file
              : notFoundImage
          "
          max-width="400px"
          height="auto"
        ></v-img>
      </div>
    </v-card>
  </v-dialog>
</template>
