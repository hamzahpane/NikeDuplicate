<template>
  <div>
    <div class="border border-gray-300 rounded-lg shadow-md p-2 mb-4">
      <!-- From Address -->
      <h2 class="text-base font-semibold mb-3 mt-2">Alamat Pengiriman :</h2>
      <form class="grid grid-cols-1 md:grid-cols-2 m-3 gap-2">
        <div>
          <label for="kecamatan" class="block text-sm font-medium text-gray-700"
            >Kecamatan</label
          >
          <input
            type="text"
            id="kecamatan"
            class="mt-1 p-1 border border-gray-300 rounded w-3/4"
            placeholder="Masukkan Kecamatan"
          />
        </div>
        <div>
          <label for="kelurahan" class="block text-sm font-medium text-gray-700"
            >Kelurahan</label
          >
          <input
            type="text"
            id="kelurahan"
            class="mt-1 p-1 border border-gray-300 rounded w-3/4"
            placeholder="Masukkan Kelurahan"
          />
        </div>
        <div>
          <label for="kabupaten" class="block text-sm font-medium text-gray-700"
            >Kabupaten</label
          >
          <input
            type="text"
            id="kabupaten"
            class="mt-1 p-1 border border-gray-300 rounded w-3/4"
            placeholder="Masukkan Kabupaten"
          />
        </div>
        <div>
          <label for="kabupaten" class="block text-sm font-medium text-gray-700"
            >Alamat Lengkap</label
          >
          <input
            type="text"
            id="kabupaten"
            class="mt-1 p-1 border border-gray-300 rounded w-3/4"
            placeholder="Masukkan Kabupaten"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "fromAddres",
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
