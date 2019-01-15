<template>
  <section class="row body">
    <div class="col-12" v-if="registred">
    sinscrire
    </div>
  </section>
</template>

<script>
export default {
  name: 'Body',
  props: {
    registred:Boolean
  }
}
</script>


<style scoped>
.body{
  height:80vh;
}
</style>
