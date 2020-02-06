<template>
  <TableSearch :key="key" :schema="schema" :table="table">
    <template v-slot:colheader>
      <RowButtonAdd :schema="schema" :table="table" @close="refresh" />
    </template>
    <template v-slot:rowheader="slotProps">
      <IconBar>
        <RowButtonEdit
          :schema="schema"
          :table="table"
          :pkey="slotProps.row[slotProps.metadata.pkey]"
          @close="refresh"
        />
        <RowButtonDelete
          :schema="schema"
          :table="table"
          :pkey="slotProps.row[slotProps.metadata.pkey]"
          @close="refresh"
        />
      </IconBar>
    </template>
  </TableSearch>
</template>

<script>
import RowButtonAdd from './RowButtonAdd'
import RowButtonEdit from './RowButtonEdit'
import RowButtonDelete from './RowButtonDelete'
import TableSearch from './TableSearch'
import IconBar from '../elements/IconBar'

export default {
  components: {
    RowButtonAdd,
    RowButtonDelete,
    RowButtonEdit,
    TableSearch,
    IconBar
  },
  props: {
    schema: String,
    table: String
  },
  data: function () {
    return {
      key: 0
    }
  },
  methods: {
    refresh () {
      this.key = this.key + 1
    }
  }
}
</script>

<docs>
Example
```
<TableEdit schema="pet store" table="Pet"/>
```
</docs>
