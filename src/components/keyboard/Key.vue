<template>
  <input type="button" class="key-wrapper" @click="$emit('on-click', value)" :value="value.toUpperCase()"/>
</template>

<script>
export default {
  name: "Key.vue",
  props: {
    value: String
  }
}
</script>

<style scoped>
.key-wrapper {
  background-color: white;
  border-radius: 10px;
  margin-left: 10px;
  height: 50px;
  width: 50px;
  padding-top: 4px;
  border: 0;
  transition: all 0.2s ease-out;
  align-items: center;
  justify-content: center; 
  font-weight: bold; 
  color: #0c5776;
  border: 1px solid #ddd; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}

.key-wrapper:hover {
  background-color: rgb(175, 174, 174);
}
</style>