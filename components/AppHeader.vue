<script lang="ts" setup></script>

<template>
  <v-app-bar :elevation="2" color="primary">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Application Bar</v-app-bar-title>
    <v-menu
        min-width="200px"
        rounded
      >
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            v-bind="props"
          >
            <v-avatar
            class="pa-3,mr-3 "
              color="#BDBDBD"
              size="large"
            >
              <span class="text-h5" v-if="user.initials">
                <!-- {{ user.initials }} -->
                <v-icon icon="mdi-account-circle-outline" color="#FFFFFF"></v-icon>

              </span>
              <span class="text-h5" v-else>
                  <v-icon icon="mdi-account-circle-outline" color="#FFFFFF"></v-icon>
                </span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar
                color="brown"
              >
                <span class="text-h5" v-if="user.initials">{{ user.initials }}</span>
                <span class="text-h5" v-else>
                  <v-icon icon="mdi-account-circle-outline"></v-icon>
                </span>
              </v-avatar>
              <h3 >{{ user.fullName }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                variant="text"
                rounded
              >
                Edit Account
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn
                variant="text"
                rounded
              >
                Disconnect
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      user: {
        initials: 'S',
        fullName: 'Sone SEEDAVANH',
        email: 'sone@gmail.com',
      },
    };
  },
});
</script>
