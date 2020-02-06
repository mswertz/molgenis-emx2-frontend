<template >
  <div>
    <InputString v-if="columnType ==='STRING'" v-model="value" v-bind="$props" />
    <InputInt v-else-if="columnType ==='INT'" v-model="value" v-bind="$props" />
    <InputDecimal v-else-if="columnType ==='DECIMAL'" v-model="value" v-bind="$props" />
    <InputBoolean v-else-if="columnType ==='BOOL'" v-model="value" v-bind="$props" />
    <InputRef v-else-if="columnType ==='REF'" v-model="value" v-bind="$props" />
    <InputDate v-else-if="columnType ==='DATE'" v-model="value" v-bind="$props" />
    <InputDateTime v-else-if="columnType ==='DATETIME'" v-model="value" v-bind="$props" />
    <InputRefArray
      v-else-if="columnType ==='REF_ARRAY' || columnType ==='REFBACK'"
      v-model="value"
      v-bind="$props"
    />
    <InputString v-else-if="columnType ==='STRING_ARRAY'" v-model="value" v-bind="$props" />
    <div v-else>UNSUPPORTED TYPE {{columnType}}</div>
  </div>
</template>

<script>
import _baseInput from '../elements/_baseInput'
import InputString from '../elements/InputString'
import InputInt from '../elements/InputInt'
import InputDecimal from '../elements/InputDecimal'
import InputBoolean from '../elements/InputBoolean'
import InputRef from './InputRef'
import InputDate from '../elements/InputDate'
import InputDateTime from '../elements/InputDateTime'
import InputRefArray from './InputRefArray'

export default {
  components: {
    InputString,
    InputInt,
    InputDecimal,
    InputBoolean,
    InputRef,
    InputDate,
    InputDateTime,
    InputRefArray
  },
  extends: _baseInput,
  props: {
    schema: String,
    columnType: String,
    refTable: String,
    refColumn: String,
    defaultValue: String
  }
}
</script>

<docs>
Example:
```
<RowColumnInput columnType="STRING" label="Test String"/>
<RowColumnInput columnType="REF" label="Test ref" schema="pet store" refTable="Pet" refColumn="name"/>
<RowColumnInput columnType="DATE" label="Test Date"/>

```
</docs>
