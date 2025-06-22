<template>
  <div>
    <div class="bg-[#B09D9D] w-screen h-screen flex justify-center items-center">
      <div class="space-y-10 min-w-md">
        <div class="text-3xl text-center">Sign Up</div>
        <form action="" class="space-y-3">
          <div class="space-y-0.5">
            <label for="" class="block text-lg">Name</label>
            <input
              type="text"
              placeholder="Name"
              class="bg-[#D8D8D8] rounded-md py-2 px-1 w-full"
            />
          </div>
          <div class="space-y-0.5">
            <label for="" class="block text-lg">Email</label>
            <input
              type="text"
              placeholder="Email"
              class="bg-[#D8D8D8] rounded-md py-2 px-1 w-full"
            />
          </div>
          <div class="space-y-0.5">
            <label for="" class="block text-lg">Password</label>
            <input
              type="text"
              placeholder="Password"
              class="bg-[#D8D8D8] rounded-md py-2 px-1 w-full"
            />
          </div>
          <div class="space-y-0.5">
            <label for="" class="block text-lg">Confirm Password</label>
            <input
              type="text"
              placeholder="Confirm Password"
              class="bg-[#D8D8D8] rounded-md py-2 px-1 w-full"
            />
          </div>
          <div class="space-y-0.5">
            <label for="" class="block text-lg">Plate Number</label>
            <input
              type="text"
              placeholder="Confirm Password"
              class="bg-[#D8D8D8] rounded-md py-2 px-1 w-full"
            />
          </div>
          <div>
            <button class="text-white bg-[#ffa62f] w-full rounded-md py-3.5">Sign Up</button>
          </div>
          <div class="text-center">
            Already have an account?
            <router-link to="/auth/login" class="text-white hover:text-zinc-100">Login</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
