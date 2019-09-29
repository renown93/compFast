<template>
  <div id="app">
    <div class="nav card-2">
      <router-link to="/">
        <div class="logo">
          <Logo />
        </div>
      </router-link>
      <div class="icon">
        <router-link to="/about">
          <InfoIcon :size="48" fillColor="#FFFFFF" />
        </router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
import Logo from "@/assets/Logo";
import InfoIcon from "vue-material-design-icons/Information.vue";
export default {
  name: "App",
  components: { Logo, InfoIcon }
};
</script>

<style lang="scss">
@import "@/scss/main";
@import "@/scss/_variables";
@import "@/scss/_mixins";
#app {
  margin: 0, auto;
}
.logo {
  margin-left: 1rem;
  @include for-phone-only {
    width: 7rem;
  }
}
.nav {
  width: 100%;
  height: 10%;
  background-color: $main-color;
  display: flex;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
}
.icon {
  @include for-phone-only {
    transform: scale(0.7);
  }
  margin-left: auto;
  margin-right: 1rem;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.194));
}
</style>
