<template>
  <div class="header-wrapper">
    <button type="button" class="house-btn" @click="backToMainPage">
      <img src="./img/home.svg" alt="" class="house" />
    </button>
    <img src="./img/VNG.png" alt="" class="logo" />
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  methods: {
    backToMainPage() {
      if (this.$route.name === "Game") {
        this.$store.commit('stopGame')
      } else {
        this.$router.push("/")
      }
    }
  }
}
</script>

<style scoped>
.header-wrapper {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  position: fixed;
  padding: 10px 0px;
  z-index: 10;
}

.house-btn {
  border: 0;
  border-radius: 0;
  background: none;
  position: absolute;
  left: 10px;
  top: 10px;
}

.house {
  width: 25px;
}

.logo {
  width: 120px;
  padding: 5px 20px; 
  border-radius: 12px; 
  background-color: #f9f9f9; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  cursor: pointer; 
  transition: all 0.3s ease; 
}

</style>