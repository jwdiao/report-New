<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import url(./assets/css/reset.css);
@import url(./assets/css/font.css);
#app {
  height:100%;
}
.home_title{
  padding-left: 24px;font-weight:bold;
  // font-size:24px;
  font-size:22px;height:32px;
  &-yellow{
    background:url('./assets/images/index_title-yellow.png') no-repeat left center;
  }
  &-blue{
    background:url('./assets/images/index_title-blue.png') no-repeat left center;
  }
  &-purple{
    background:url('./assets/images/index_title-purple.png') no-repeat left center;
  }
  &-T1{
    background:url('./assets/images/T1.png') no-repeat left center;
  }
  &-E10{
    background:url('./assets/images/E10.png') no-repeat left center;
  }
  &-icon1{
    background:url('./assets/images/icon1.png') no-repeat left center;
  }
  &-icon2{
    background:url('./assets/images/icon2.png') no-repeat left center;
  }
  &-icon3{
    background:url('./assets/images/icon3.png') no-repeat left center;
  }
  img{margin-left:5px;}
}

 @media (min-width: 1024px){
  html{font-size: 53.33px}
}
@media (min-width: 1280px) {
  html{font-size: 66.66px;}
}
@media (min-width: 1366px) {
  html{font-size: 71.14px;}
}
@media (min-width: 1440px) {
  html{font-size: 75px}
}
@media (min-width: 1680px) {
  html{font-size: 87.5px;}
}
@media (min-width: 1920px) {
  html{font-size: 100px;}
}

</style>
