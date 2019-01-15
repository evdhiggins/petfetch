<template lang="pug">
q-card
  q-card-media
    div.image-trim
      img(
        @click="viewMoreImages"
        :class="moreImages ? 'hover' : ''"
        :src="image"
      )

  q-card-title {{ entity.name }}
    div(slot="subtitle") {{ entity.breed }}

  q-card-main
    p.q-body-2 {{ entity.about | trimLength }}

  q-card-actions
    q-btn(@click.native="viewMoreInfo" flat) More
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
    moreImages() {
      return this.entity.imageURLs.length > 0;
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
    viewMoreInfo() {
      this.$root.$emit('moreInfo', this.entity);
    },
    viewMoreImages() {
      if (this.moreImages) {
        this.$root.$emit('moreImages', this.entity);
      }
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

.hover:hover {
  cursor: pointer;
}
</style>
