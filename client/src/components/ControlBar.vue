<template>
  <div>
    <Button
      icon="pi pi-trash"
      class="flex-item p-button-raised p-button-rounded p-button-lg"
      @click="clear()"
      :loading="false"
    />
    <Button
      icon="pi pi-download"
      class="flex-item p-button-raised p-button-rounded p-button-lg"
    />

    <Button
      icon="pi pi-pencil"
      class="flex-item p-button-raised p-button-rounded p-button-lg"
      ><ColorPicker v-model="color" format="hex" />
    </Button>
    <Button
      icon="pi pi-share-alt"
      class="flex-item p-button-raised p-button-rounded p-button-lg"
    />
    <Button
      icon="pi pi-github"
      class="flex-item p-button-raised p-button-rounded p-button-lg"
      @click="openGit()"
    />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>