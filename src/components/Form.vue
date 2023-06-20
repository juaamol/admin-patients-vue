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
          id="pet"
          type="text"
          placeholder="Pet name"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounder-md"
        />
      </div>
      <div class="mb-5">
        <label for="owner" class="block text-gray-700 uppercase font-bold">
          Owner
        </label>
        <input
          id="owner"
          type="text"
          placeholder="Owner's name"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounder-md"
        />
      </div>
      <div class="mb-5">
        <label for="email" class="block text-gray-700 uppercase font-bold">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounder-md"
        />
      </div>
      <div class="mb-5">
        <label for="release" class="block text-gray-700 uppercase font-bold">
          Release date
        </label>
        <input
          id="release"
          type="date"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounder-md"
        />
      </div>
      <div class="mb-5">
        <label for="symptoms" class="block text-gray-700 uppercase font-bold">
          Symptoms
        </label>
        <textarea
          id="symptoms"
          placeholder="Describe the symptoms of the patient"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounder-md"
        ></textarea>
      </div>
      <input
        type="submit"
        class="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
      />
    </form>
  </div>
</template>
