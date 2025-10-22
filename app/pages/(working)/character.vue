<template>
  <div class="w-full bg-cover bg-center px-4 sm:px-16 mb-2 sm:mb-8 space-y-2 sm:space-y-6">
    <UInput 
      :ui="{
        base: 'sm:px-4'
      }"
      v-model="search" 
      trailing-icon="i-lucide-search" 
      class="w-full rounded-sm"
      color="info"
      placeholder="ชื่อตัวละคร"
      @keyup.enter="onSearch"
    />
    <div class="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-4">
      <CharacterCard 
        v-for="(character, index) in characterList"
        :key="index"
        :data="character"
      />
    </div>
  </div>
</template>

<script setup>
const { getAllCharacter } = useCharacter()
const route = useRoute()

const search = ref("")
const characterList = ref([])

const getCharacterList = async (name) => {
  return await getAllCharacter({
    page: 1,
    per_page: 100,
    search: name,
    is_active: true,
  })
}

const response = await getCharacterList(route.query.search || search.value);

characterList.value = response.data

const onSearch = async () => {
  const response = await getCharacterList(search.value);
  characterList.value = response.data
}

</script>

<style scoped></style>