<template lang="pug">
q-card
  q-card-media
    div.image-trim
      img(:src="image")

  q-card-title {{ entity.name }}
    div(slot="subtitle") {{ entity.breed }}

  q-card-main
    p.q-body-2 {{ entity.about | trimLength }}

  q-card-actions
    q-btn(@click.native="viewMore" flat) More
    q-btn(@click.native="openUrl" flat) View
</template>

<script>
export default {
  name: 'ListCard',
  props: {
    entity: {
      type: Object,
    },
  },
  computed: {
    placeholderImage() {
      // eslint-disable-next-line
      return require('./../assets/logo.svg');
    },
    image() {
      return this.entity.imageURLs[0]
        ? this.entity.imageURLs[0]
        : this.placeholderImage;
    },
  },
  filters: {
    trimLength(str) {
      const shortStr = str.substr(0, 150);
      return shortStr === str ? shortStr : `${shortStr}...`;
    },
  },
  methods: {
    openUrl() {
      window.open(this.entity.link);
    },
    viewMore() {
      this.$root.$emit('moreInfo', this.entity);
    },
  },
};
</script>
<style scoped>
.image-trim {
  width: 100%;
  height: 30vh;
  max-height: 400px;
  overflow: hidden;
  text-align: center;
}
.image-trim > img {
  width: auto;
  height: 100%;
}
</style>
