<template>
  <div class="h-screen flex lg:items-center justify-center">
    <div
      class="flex flex-col border-2 rounded-md p-6 mx-10 lg:mx-0"
      style="width: 100%; max-width: 400px; height: 100%; max-height: 200px"
    >
      <div class="flex flex-col justify-between">
        <div><span>Your Registration is complete, please check your email to verification</span></div>
        <div>
          <span
            class="hover:underline cursor-pointer"
            @click="$router.push({ name: 'login' })"
          >Back to login</span>
        </div>
      </div>
    </div>
  </div>
</template>
