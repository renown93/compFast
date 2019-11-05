<template lang='pug'>
div
  .container
    h1 CompFast is a file and pdf size reducer web application.
    .paragraph
      p You can make various sizing operations on files and download it.This is the alpha version of the application.New features will be added in the future.  I hope you find it useful.   
      p.signiture Sincerly, M.Yagiz Yazicilar
      
  footer
    a(href='https://github.com/renown93/compFast')
      p github.com/renown93/compFast
    p Version: 1.0.0-alpha

    
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables";
@import "@/scss/_mixins";
div {
  height: 80%;
}
.container {
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
}
h1 {
  @include for-tablet-landscape-up {
    font-size: 2rem;
    margin: 5% auto;
  }
  margin: 15% auto;
  font-family: $main-font;
  font-size: 1.5rem;
  color: $main-text-color;
}
h2 {
  font-size: 1rem;
}
footer {
  // margin-top: auto;
  text-align: center;
  color: $info-text-color;
}
.paragraph {
  @include for-tablet-landscape-up {
    // font-size: 2rem;
    width: 50%;
  }
  margin: 10% auto;
  width: 80%;
  margin: 0 auto;
  text-align: center;
}
.signiture {
  margin-top: 1rem;
  text-align: right;
}
.links {
}
</style>
