<template lang="pug">
span
  q-modal(v-if="entity" v-model="open")
    q-modal-layout(padding style="width: 75vw;")
      q-carousel(
        v-model="imageIndex"
        quick-nav
        height="80vh"
        width="auto"
      )
        q-carousel-slide(
          v-for="(url,i) in entity.imageURLs"
          :key="`emimg-${i}`"
          :img-src="url"
        )

</template>

<script>
export default {
  name: 'EntityMoreImages',
  data() {
    return {
      entity: null,
      imageIndex: 0,
      open: false,
    };
  },
  created() {
    this.$root.$on('moreImages', (entity) => {
      this.entity = entity;
      this.imageIndex = 0;
      this.open = true;
    });
  },
};
</script>
