<template>
  <div class="relative w-screen h-screen">
    <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
      <p class="text-gray-500 dark:text-gray-300 text-lg">
        Loading Data<span class="loading-dots"></span>
      </p>
    </div>

    <iframe
  v-else-if="finalBlossomOutput"
  ref="iframeContainer"
  :src="finalBlossomOutput"
  class="absolute inset-0 w-full h-full border-none"
  sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals allow-top-navigation-by-user-activation"
></iframe>


    <div v-else class="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-300">
      No relevant data found.
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import setup from "~/config/project";
import NDK from "@nostr-dev-kit/ndk";
import { bech32 } from "bech32";

const isLoading = ref(true);
const hasSubdomain = ref(false);
const subdomain = ref(null);
const serverUrls = ref([]);
const hashValue = ref(null);
const iframeContainer = ref(null);
const eventTags = ref([]);

const finalBlossomOutput = computed(() => {
  if (serverUrls.value.length && hashValue.value) {
    const cleanServerUrl = serverUrls.value[0].replace(/\/$/, "");
    const cleanHashValue = hashValue.value.replace(/^\//, "");
    return `${cleanServerUrl}/${cleanHashValue}`;
  }
  return null;
});

function extractSubdomain(hostname) {
  if (hostname.includes("localhost")) {
    const parts = hostname.split(".");
    return parts.length > 1 && parts[0] !== "localhost" ? parts[0] : null;
  }
  const parts = hostname.split(".");
  return parts.length > 2 ? parts.slice(0, -2).join(".") : null;
}

const bytesToHex = (bytes) => {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

const npubToHex = (npub) => {
  const decoded = bech32.decode(npub);
  const pubkeyBytes = bech32.fromWords(decoded.words);
  return bytesToHex(Uint8Array.from(pubkeyBytes));
};

const fetchNDKEvent = async (pubkey) => {
  const ndk = new NDK({ explicitRelayUrls: setup.bootstraprelays });
  await ndk.connect();

  try {
    const event = await ndk.fetchEvent({ kinds: [10063], authors: [pubkey] });
    if (event) {
      serverUrls.value = event.tags
        .filter(tag => tag[0] === "server")
        .map(tag => tag[1]);
    }
  } catch (error) {
    console.error("Error fetching Blossom server list:", error);
  }
};

const subscribeToNDKEvents = async (pubkey) => {
  const ndk = new NDK({ explicitRelayUrls: setup.bootstraprelays });
  await ndk.connect();

  try {
    const filter = {
      kinds: [34128],
      authors: [pubkey],
    };

    const subscription = ndk.subscribe(filter);

    subscription.on("event", (event) => {
      console.log("New Event Received:", event);

      const dTag = event.tags.find(tag => tag[0] === "d" && tag[1] === "/index.html");
      const xTag = event.tags.find(tag => tag[0] === "x");

      if (dTag && xTag) {
        hashValue.value = xTag[1];
        eventTags.value = [{ type: "x", value: xTag[1] }];
        console.log("Updated Extracted Tags:", eventTags.value);
        console.log("Updated Hash Value:", hashValue.value);
      }
    });

    subscription.start();
  } catch (error) {
    console.error("Error subscribing to NDK events:", error);
  }
};

watch(finalBlossomOutput, async (newUrl) => {
  console.log("watch triggered - new URL:", newUrl);
  await nextTick();

  if (iframeContainer.value) {
    iframeContainer.value.src = newUrl;
  }
});

onMounted(async () => {
  const hostname = window.location.hostname;
  subdomain.value = extractSubdomain(hostname);
  hasSubdomain.value = !!subdomain.value;

  if (hasSubdomain.value) {
    const pubkey = subdomain.value.startsWith("npub1")
      ? npubToHex(subdomain.value)
      : null;
    if (pubkey) {
      await fetchNDKEvent(pubkey);
      await subscribeToNDKEvents(pubkey);
    }
  }
  isLoading.value = false;
});
</script>

<style scoped>
@keyframes dot-loading {
  0% { content: ''; }
  33% { content: '.'; }
  66% { content: '..'; }
  100% { content: '...'; }
}

.loading-dots::after {
  animation: dot-loading 2.5s steps(3, end) infinite;
  content: '';
}
</style>
