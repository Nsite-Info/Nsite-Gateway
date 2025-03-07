<template>
  <div class="mx-auto p-4 relative" v-if="hasSubdomain">
    <div v-if="isLoading" class="text-center">
      <p class="mt-2 text-gray-500 dark:text-gray-300 min-h-24">
        Loading Data<span class="loading-dots"></span>
      </p>
    </div>

    <div v-else-if="finalBlossomOutput" class="relative z-10 text-center my-2">
     <!-- <h2 class="text-xl font-semibold tracking-tight text-white dark:text-white uppercase">
        NSITE URL:
      </h2>
      <p class="text-white">{{ finalBlossomOutput }}</p> -->
      <div v-if="finalBlossomOutput" ref="shadowHost"></div>
    </div>

    <div v-else class="text-center text-gray-500">
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
const shadowHost = ref(null);
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
      kinds: [34128], // Listen for Kind 34128 events
      authors: [pubkey],
    };

    const subscription = ndk.subscribe(filter);

    subscription.on("event", (event) => {
      console.log("New Event Received:", event);

      // Extract relevant tags
      const dTag = event.tags.find(tag => tag[0] === "d" && tag[1] === "/index.html");
      const xTag = event.tags.find(tag => tag[0] === "x");

      // Only update if a matching 'd' tag exists
      if (dTag && xTag) {
        hashValue.value = xTag[1]; // Set the correct hash value for finalBlossomOutput
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

async function fetchAndRenderPage(url) {
  try {
    console.log("Fetching page content from:", url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch content: ${response.statusText}`);
    }
    const content = await response.text();
    
    await nextTick();

    if (shadowHost.value) {
      let shadowRoot = shadowHost.value.shadowRoot;
      if (!shadowRoot) {
        shadowRoot = shadowHost.value.attachShadow({ mode: "open" });
      }
      
      shadowRoot.innerHTML = content;
      console.log("Shadow DOM updated successfully.");
    } else {
      console.error("shadowHost is not available.");
    }
  } catch (err) {
    console.error("Error fetching content:", err);
  }
}

watch(finalBlossomOutput, async (newUrl) => {
  console.log("watch triggered - new URL:", newUrl);
  if (newUrl) {
    await fetchAndRenderPage(newUrl);
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
