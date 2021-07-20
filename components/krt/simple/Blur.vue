<template>
  <client-only>
    <transition name="fade">
      <div
        class="h-screen w-screen z-40 top-0 left-0 fixed overflow-auto"
        style="background-color: rgba(0, 0, 0, 0.2)"
      >
        <div class="z-50 flex items-center max-w-lg h-full lg:mx-auto">
          <slot />
        </div>
      </div>
    </transition>
  </client-only>
</template>

<script>
export default {
  name: 'KrtBlur'
}
</script>
