<template lang="pug">
q-page
  .row.justify-around.q-mt-md
    .col-xs-11.col-sm-10.col-md-10.col-lg-9
      div.row.justify-center.gutter-sm
        div.col-xs-12.col-sm-8.col-md-6.col-lg-4(
          v-for="(entity,i) in entities"
          :key="`entit${entity.id}${i}`"
        )
          list-card(:entity="entity")
  .row.flex.flex-center.q-my-lg
    q-btn(
      v-if="moreAvailable"
      @click="loadMore"
      :loading="loading"
      :disabled="loading"
      ) Load more
    p.q-body-2(v-else) No more results available
  entity-more-info
</template>

<script>
import EntityMoreInfo from 'components/EntityMoreInfo.vue';
import ListCard from 'components/ListCard.vue';

export default {
  name: 'List',
  components: {
    EntityMoreInfo,
    ListCard,
  },
  data() {
    return {
      lastEntity: null,
      loading: false,
      entities: [],
      results: null,
      moreAvailable: true,
    };
  },
  created() {
    this.loadMore();
  },
  methods: {
    async loadMore() {
      this.loading = true;
      const numberToFetch = 12;

      const ref = this.$db
        .collection('Entities')
        .where('species', '==', 'Dog')
        .orderBy('timestamp')
        .startAfter(this.lastEntity)
        .limit(numberToFetch);
      const results = await ref.get();
      if (results.docs.length !== numberToFetch) {
        this.moreAvailable = false;
      }
      this.lastEntity = results.docs[results.docs.length - 1];
      results.forEach((snapShot) => {
        this.entities.push(snapShot.data());
      });
      this.loading = false;
    },
  },
};
</script>
