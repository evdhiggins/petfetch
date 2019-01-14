<template lang="pug">
q-page
  .row.justify-around
    .col-xs-12.col-sm-10.col-md-9
      div.row.gutter-sm
        div.col-xs-10.col-sm-5.col-md-4(
          v-for="(entity,i) in entities"
          :key="`entit${entity.id}${i}`"
        )
          list-card(:entity="entity")
  .row.justify-around
    .col-xs-6.col-sm-2.q-my-lg
      q-btn(
        v-if="moreAvailable"
        @click="loadMore"
        :loading="loading"
        :disabled="loading"
        ) Load more
      p.q-body-2(v-else) No more results available
</template>

<script>
import ListCard from 'components/ListCard.vue';

export default {
  name: 'List',
  components: {
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
