<template>
  <div id="app">
    <div class="nav card-2">
      <router-link to="/">
        <Logo />
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

.nav {
  width: 100%;
  height: 10%;
  background-color: $main-color;
  display: flex;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
}
.icon {
  margin-left: auto;
  margin-right: 1rem;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.194));
}
</style>
