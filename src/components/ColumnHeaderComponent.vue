<template>
    <th :class="classNames" @click="clickAction">{{column.label}}
        <span v-if="column.isActive" v-html="sortIcon"></span>
    </th>
</template>
<script>
export default {
  props: {
    /**
     * Column object
     * @required true
     * @type {Number}
     */
    column: {
      required: true,
      type: Object
    },
    columnIndex: { type: Number }
  },
  computed: {
    classNames() {
      return (
        this.column.columnHeaderClass +
        (this.column.isActive ? " header-active" : "")
      );
    },
    sortIcon() {
      return this.column.sortOrder == 1 ? "&#9660;" : "&#9650;";
    }
  },
  methods: {
    clickAction() {
      this.$emit("sortUpdate", this.columnIndex);
    }
  }
};
</script>
