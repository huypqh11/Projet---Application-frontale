<template>
  <div class="header-wrapper">
    <button type="button" class="house-btn" @click="backToMainPage">
      <img src="./img/home.svg" alt="" class="house"/>
    </button>
    <img src="./img/VNG.png" alt="" class="logo"/>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  methods: {
    backToMainPage() {
      if(this.$route.name === "Game") {
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
  z-index: 10;
  height: 70px;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  position: fixed;
  padding: 10px 20px;
  top:0;
}

.house-btn {
  margin-left: 10px;
  border: 0;
  border-radius: 0;
  background: none;
}

.house {
  width: 25px;
}

.logo {
  display: flex; 
  align-items: center; 
  padding: 5px 20px; 
  border-radius: 12px; 
  background-color: #f9f9f9; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  cursor: pointer; 
  transition: all 0.3s ease; 
}

</style>