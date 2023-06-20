<script setup></script>

<template>
  <div class="md:w-1/2">
    <h2 class="font-black text-3xl text-center">Patient monitoring</h2>
    <p class="text-lg mt-5 text-center mb-10">
      Add patients
      <span class="text-indigo-600 font-bold">Manage</span>
    </p>
    <form class="bg-white shadow-md rounder-lg py-10 px-5 mb-10">
      <div class="mb-5">
        <label for="pet" class="block text-gray-700 uppercase font-bold">
          Pet name
        </label>
        <input
          type="text"
          id="pet"
          placeholder="Pet name"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounder-md"
        />
      </div>
    </form>
  </div>
</template>
