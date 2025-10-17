<!-- develope -->
<template>
  <div class="card flex gap-4" draggable="true">
    <filter id="displacementFilter">

      <Icon name="logos:facebook" class="w-12 h-12" />
      <Icon name="flat-color-icons:google" class="w-12 h-12" />
      <Icon name="logos:youtube-icon" class="w-12 h-12" />
    </filter>
  </div>

  <!-- <div class="card" draggable="true">
        <slot></slot>
    </div>

    <svg style="display:none;">
        <filter id="displacementFilter">
            <feTurbulence type="turbulence" 
                baseFrequency="0.01" 
                numOctaves="2" 
                result="turbulence" />
    
            <feDisplacementMap in="SourceGraphic"
                in2="turbulence"    
                            scale="200" xChannelSelector="R" yChannelSelector="G" />
        </filter>
    </svg> -->
</template>

<script setup>


</script>

<style scoped>
.card {
  width: fit-content;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  overflow: hidden;
  border-radius: inherit;
  transition: opacity 0.26s ease-out;
  border-radius: 28px;
  filter: drop-shadow(-8px -10px 46px #0000005f);
  backdrop-filter: brightness(1.1) blur(2px) url(#displacementFilter);
}

.card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  border-radius: 28px;
  -webkit-box-shadow: inset 2px 2px 0px -2px rgba(255, 255, 255, 0.7),
    inset 0 0 3px 1px rgba(255, 255, 255, 0.7);
  box-shadow: inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7),
    inset 0 0 8px 1px rgba(255, 255, 255, 0.7);
}

.liquid-glass-button {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: url(#liquid-glass-filter) blur(10px);
  /* Apply SVG filter and then blur */
  -webkit-backdrop-filter: url(#liquid-glass-filter) blur(10px);
  /* For Safari */
  /* Other styling as in the basic glassmorphism example */
}
</style>