<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body .el-table th.gutter {
  display: table-cell !important;
}

body .el-table colgroup.gutter {
  display: table-cell !important;
}

body .el-select .el-input__inner,
body .el-cascader .el-input__inner {
  /* width: 278px; */
  width: 100%;
}
</style>
