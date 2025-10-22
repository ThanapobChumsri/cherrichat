<template>
  <div class="w-full">
    <UCollapsible v-model:open="open" :disabled="disabled">
      <!-- Header Button -->
      <UButton
        class="group text-gray-900 text-lg font-medium w-full rounded-t-xl px-4 py-3 cursor-pointer transition-all duration-100"
        :class="[
          open
            ? `rounded-b-none bg-${color} text-gray-900`
            : `rounded-b-xl bg-${color} text-gray-300`,
        ]"
        :label="props.label"
        color="yellow"
        variant="solid"
        trailing-icon="i-lucide-chevron-up"
        :ui="{
          trailingIcon:
            'group-data-[state=closed]:rotate-180 transition-transform duration-200',
          base: 'bg-[#FDE824] focus:ring-[#FDE824] justify-between',
        }"
        block
      />

      <!-- Content -->
      <template #content>
        <div
          class="bg-[#FDE8240F] glass-border px-4 py-4 text-white"
          :class="test ? 'bg-test' : ''"
        >
          <slot />
        </div>
      </template>
    </UCollapsible>
  </div>
</template>

<script setup>
const open = ref(true);
const props = defineProps({
  label: {
    type: String,
    default: "Label",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "red",
  },
  test: {
    type: Boolean,
    default: false,
  },
});
</script>

<style>
.bg-red {
  background: linear-gradient(
    271.93deg,
    #691a20 -18.01%,
    #d00000 96.17%
  ) !important;
  color: white !important;
  opacity: 1 !important;
}
.bg-yellow {
  background: linear-gradient(
    268.09deg,
    #ae5211 -50.36%,
    #ffba08 112.95%
  ) !important;
  color: white !important;
  opacity: 1 !important;
}
.glass-border {
  position: relative;
  border-radius: 0 0 0.75rem 0.75rem;
}
.glass-border::before {
  margin-top: -2.5px;
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.5px; /* border thickness */
  background: linear-gradient(
    249.16deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0) 49.51%,
    rgba(255, 255, 255, 0.4) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  /* clip off top border */
  /* clip-path: inset(2.5px 0 0 0 round 0 0 1.5rem 1.5rem); */
  mask-composite: exclude;
  pointer-events: none;
}
.bg-test {
  background: linear-gradient(
    346.49deg,
    rgba(255, 186, 8, 0.66) -29.25%,
    rgba(0, 0, 0, 0.0132) 55.13%,
    rgba(255, 255, 255, 0.66) 500%
  ) !important;
}
</style>
