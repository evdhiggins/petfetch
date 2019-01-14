<template lang="pug">
q-card
  q-card-title {{ entity.name }}
  q-card-media
    div.image-trim.flex.flex-center
      img(:src="image")

  q-card-main
    p.q-body-2 {{ entity.about | trimLength }}

  q-card-actions
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
  },
};
</script>
<style scoped>
.image-trim {
  width: 100%;
  height: 300px;
  overflow: hidden;
}
.image-trim > img {
  max-height: 300px;
  width: auto;
  max-width: 100%;
  text-align: center;
}
</style>
