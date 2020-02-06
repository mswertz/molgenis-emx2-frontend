<template>
  <div v-if="loading" class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  <form-group v-else v-bind="$props">
    <select :id="id" class="custom-select" multiple @click="openSelect">
      <option v-for="item in value" :key="item" :value="item" selected>{{
        item
      }}</option>
    </select>
    <LayoutModal :title="title" :show="showSelect" @close="closeSelect">
      <template v-slot:body>
        <MessageError v-if="error">{{ error }}</MessageError>
        <TableSearch
          :schema="schema"
          :table="refTable"
          :select-column="refColumn"
          :default-value="value"
          @select="select"
          @deselect="deselect"
        />
      </template>
      <template v-slot:footer>
        <ButtonAlt @click="closeSelect">Close</ButtonAlt>
      </template>
    </LayoutModal>
  </form-group>
</template>

<script>
import _baseInput from '../elements/_baseInput'
import _graphqlTableMixin from './_graphqlTableMixin'
import ButtonAlt from '../elements/ButtonAlt'
import FormGroup from '../elements/_formGroup'
import LayoutModal from '../elements/LayoutModal'
import TableSearch from './TableSearch'
import MessageError from '../elements/MessageError'

export default {
  components: {
    ButtonAlt,
    FormGroup,
    TableSearch,
    LayoutModal,
    MessageError
  },
  extends: _baseInput,
  mixins: [_graphqlTableMixin],
  props: {
    refTable: String,
    refColumn: String
  },
  data: function () {
    return {
      showSelect: false
    }
  },
  computed: {
    title () {
      return 'Select ' + this.table
    },
    table () {
      return this.refTable
    }
  },
  watch: {
    refTable () {
      this.table = this.refTable
    }
  },
  methods: {
    select (value) {
      if (this.value == null) this.value = []
      this.value.push(value)
    },
    deselect (value) {
      this.value = this.value.filter(item => item !== value)
    },
    closeSelect () {
      this.showSelect = false
    },
    openSelect () {
      this.showSelect = true
    }
  }
}
</script>

<docs>
Example
```
<InputRefArray schema="pet store" refTable="Pet" refColumn="name"/>
```
Example with default value
```
<template>
  <div>
    <InputRefArray schema="pet store" refTable="Pet" refColumn="name" :defaultValue="initValue" />
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      initValue: ["spike"]
    };
  }
};
</script>
```
</docs>
