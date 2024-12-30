<template>
  <div class="keyboard-wrapper">
    <div class="row">
      <Key v-for="key in row1" :key="key" :value="key" @on-click="(v) => $emit('on-value', v)" />
    </div>
    <div class="row">
      <Key v-for="key in row2" :key="key" :value="key" @on-click="(v) => $emit('on-value', v)" />
    </div>
    <div class="row">
      <Key v-for="key in row3" :key="key" :value="key" @on-click="(v) => $emit('on-value', v)" />
    </div>
    <div class="row-special">
      <Key value="DEL" class="special-key" @on-click="$emit('on-delete')" />
      <Key value="ENT" class="special-key" @on-click="$emit('on-enter')" />
    </div>
  </div>
</template>

<script>
import Key from "./Key";

export default {
  name: "Keyboard",
  components: { Key },
  data() {
    return {
      // Phân chia các hàng phím
      row1: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      row2: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
      row3: ["z", "x", "c", "v", "b", "n", "m"],
    };
  },
};
</script>

<style scoped>
.keyboard-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  align-items: center; 
  gap: 10px; 
  width: 650px;
  height: auto;
  padding: 15px; 
  margin: 20px auto;
  background-color: #f9f9f9; 
  border: 2px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: medium;
}
.row-special {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 10px; /* Thêm khoảng cách trên giữa các dòng */
  flex-wrap: wrap; /* Cho phép các phím xuống dòng nếu cần */
}

.key-wrapper.special-key {
  background-color: #0c5776; /* Màu vàng cho phím đặc biệt */
  color: white;
  font-weight: bold;
  width: 80px; /* Chiều rộng lớn hơn cho phím đặc biệt */
  height: 45px; /* Chiều cao phù hợp */
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.key-wrapper.special-key:hover {
  background-color: #e67e22; /* Màu nền khi hover */
}

.key-wrapper.special-key:active {
  background-color: #d35400; /* Màu nền khi nhấn */
  transform: scale(0.95); /* Hiệu ứng nhấn */
}

.row-normal {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* Khoảng cách giữa các phím chữ */
  margin-bottom: 10px; /* Khoảng cách dưới */
}


</style>