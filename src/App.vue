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
body /deep/ .el-table th.gutter {
  display: table-cell !important;
}

body /deep/ .el-table colgroup.gutter {
  display: table-cell !important;
}
</style>
