<template>
  <div class="w-screen">
    <div class="container mx-auto pt-10 pb-10">
      <div class="text-main text-4xl mt-auto tracking-wider font-light mb-5 text-center">
        Frequently Asked Questions
      </div>
      <div>
        <div class="relative border-2 border-gray-200 rounded-md w-1/2 mx-auto mb-2">
          <input id="toggle1" type="checkbox" class="toggle hidden">
          <label class="title block font-bold bg-white p-4 cursor-pointer" for="toggle1">
            1
          </label>
          <div class="content bg-white overflow-hidden">
            <p class="p-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
            </p>
          </div>
        </div>
        <div class="relative border-2 border-gray-200 rounded-md w-1/2 mx-auto mb-2">
          <input id="toggle2" type="checkbox" class="toggle hidden">
          <label class="title block font-bold bg-white p-4 cursor-pointer" for="toggle2">
            2
          </label>
          <div class="content bg-white overflow-hidden">
            <p class="p-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
            </p>
          </div>
        </div>
        <div class="relative border-2 border-gray-200 rounded-md w-1/2 mx-auto mb-2">
          <input id="toggle3" type="checkbox" class="toggle hidden">
          <label class="title block font-bold bg-white p-4 cursor-pointer" for="toggle3">
            3
          </label>
          <div class="content bg-white overflow-hidden">
            <p class="p-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FaqPage',
  head () {
    return {
      title: 'Globalindo | FAQ'
    }
  }
}
</script>

<style scoped>
.title::after, .title::before {
  content: '';
  position: absolute;
  right: 1.25em;
  top: 1.25em;
  width: 2px;
  height: 0.75em;
  background-color: #7A7572;
  transition: all 0.2s;
}

.title::after {
  transform: rotate(90deg);
}

.content {
  max-height: 0;
}

.toggle:checked + .title, .toggle:checked + .title + .content {
  box-shadow: 3px 3px 6px #ddd, -3px 3px 6px #ddd;
}
.toggle:checked + .title + .content {
  max-height: 500px;
}
.toggle:checked + .title::before {
  transform: rotate(90deg) !important;
}
</style>
