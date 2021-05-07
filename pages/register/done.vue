<template>
  <div class="h-screen flex lg:items-center justify-center">
    <div
      class="flex flex-col border-2 rounded-md p-6 mx-10 lg:mx-0"
      style="width: 100%; max-width: 400px; height: 100%; max-height: 200px"
    >
      <div class="flex flex-col justify-between mt-8">
        <div><span class="text-lg">Your Registration is complete, please check your email to verification</span></div>
        <div class="py-2 ml-auto">
          <span
            class="underline cursor-pointer bg-main text-white py-2 px-3 rounded-md hover:bg-white hover:text-main transition-colors border border-main"
            @click="$router.push({ name: 'login' })"
          >Back to login</span>
        </div>
      </div>
    </div>
  </div>
</template>
