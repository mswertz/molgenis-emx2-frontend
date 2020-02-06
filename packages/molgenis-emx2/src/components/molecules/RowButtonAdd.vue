<template>
  <div>
    <RowEditModal
      v-if="open"
      :schema="schema"
      :table="table"
      @close="closeForm"
    />
    <IconAction v-else icon="plus" @click="openForm" />
  </div>
</template>

<script>
import RowEditModal from './RowEditModal.vue'
import IconAction from '../elements/IconAction'

export default {
  components: {
    RowEditModal,
    IconAction
  },
  props: {
    schema: String,
    table: String
  },
  data: function () {
    return {
      open: false
    }
  },
  computed: {
    title () {
      return 'Add new row to table ' + this.table
    }
  },
  methods: {
    openForm () {
      this.open = true
    },
    closeForm () {
      this.open = false
      this.$emit('close')
    }
  }
}
</script>

<docs>Example

```
<RowButtonAdd schema="pet store" table="Pet" />
```
</docs>
