<template>
  <FormGroup v-bind="$props">
    <select :id="id" class="custom-select" @click="openSelect">
      <option v-if="value && !showSelect" :value="value" selected>{{value}}</option>
    </select>
    <LayoutModal :title="title" :show="showSelect" @close="closeSelect">
      <template v-slot:body>
        <MessageError v-if="error">{{error}}</MessageError>
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
  </FormGroup>
</template>

<script>
import _baseInput from '../elements/_baseInput'
import TableSearch from './TableSearch'
import LayoutModal from '../elements/LayoutModal'
import MessageError from '../elements/MessageError'
import FormGroup from '../elements/_formGroup'
import ButtonAlt from '../elements/ButtonAlt'

export default {
  components: {
    TableSearch,
    MessageError,
    LayoutModal,
    FormGroup,
    ButtonAlt
  },
  extends: _baseInput,
  props: {
    schema: String,
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
      return 'Select ' + this.refTable
    }
  },
  methods: {
    select (value) {
      this.showSelect = false
      this.value = value
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
<InputRef schema="pet store" refTable="Pet" refColumn="name"  />
```
Example with default value
```
<template>
  <div>
    <InputRef
      v-model="check"
      schema="pet store"
      refTable="Pet"
      refColumn="name"
      defaultValue="spike"
    />
    {{check}}
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      check: null
    };
  },
  methods: {
    clear() {
      this.check = null;
    }
  }
};
```
</docs>
