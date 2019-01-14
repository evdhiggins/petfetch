<template lang="pug">
q-page.flex.flex-center
  .column
    img(alt="Quasar logo" src="~assets/logo.svg" width="200px")
    div.text-center(style="max-width: 200px")
      strong {{ title }}
      p {{ message }}
    q-btn(
      color="primary"
      label="View Dogs"
      @click="$router.push({ name: 'List' })"
    )
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      title: 'PetFetch',
      message:
        'View animals available for adoption from many different Chicago-area shelters',
    };
  },
};
</script>
<style scoped>
.column > * {
  margin-top: 20px;
}
</style>
