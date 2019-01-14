<template lang="pug">
span
  q-modal(v-if="entity" v-model="open")
    q-modal-layout(padding style="width: 600px;")
      q-toolbar(slot="header")
        q-toolbar-title {{ entity.name | capitalizeFirstLetter }}
        q-btn(
          dense round flat
          icon="close"
          @click="open = false"
        )
      .q-pa-md
        .row.gutter-sm
          q-item.col-xs-12.col-sm-6(
            v-for="(value, key) in columns"
            :key="`emi${key}`"
          )
            q-item-main
              q-item-tile(label) {{ key | capitalizeFirstLetter }}
              q-item-tile(sublabel) {{ value }}
          .col-xs-12
            q-item
              q-item-main
                q-item-tile(label) About
                q-item-tile(sublabel) {{ entity.about }}

</template>

<script>
export default {
  name: 'EntityMoreInfo',
  data() {
    return {
      entity: null,
      open: false,
    };
  },
  computed: {
    columns() {
      const keys = [
        'name',
        'breed',
        'gender',
        'size',
        'age',
        'adoptionFee',
        'weight',
        'comment',
      ];
      const columns = keys.reduce((acc, key) => {
        if (this.entity[key]) {
          acc[key] = this.entity[key];
        }
        return acc;
      }, {});
      const { name, city, state } = this.entity.shelter;
      columns.shelter = `${name} (${city}, ${state})`;
      return columns;
    },
  },
  filters: {
    capitalizeFirstLetter(str) {
      return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
    },
  },
  created() {
    this.$root.$on('moreInfo', (entity) => {
      this.entity = entity;
      this.open = true;
    });
  },
};
</script>
