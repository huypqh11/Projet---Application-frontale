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
      <Key value="DELETE" class="special-key" @on-click="$emit('on-delete')" />
      <Key value="ENTER" class="special-key enter-btn" @on-click="$emit('on-enter')" />
      <Key id="idButton" value="PASS" class="special-key" @click="endGame" :disabled="gameIsDone" />
    </div>

    <EndGame :isWin="win" :isDone="gameIsDone"></EndGame>

  </div>
</template>

<script>
import axios from "axios";
import Key from "./Key";
import EndGame from "../EndGame.vue";
import { helperMethods } from "../../utils";

export default {
  name: "Keyboard",
  components: { Key },
  data() {
    return {
      // Phân chia các hàng phím
      row1: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      row2: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
      row3: ["z", "x", "c", "v", "b", "n", "m"],
      word: "",
      listWords: [],
      goal: "",
      win: false,
      chrono: 600,
      intervalID: null,
      nbTryLeft: 6,
      incorrectWord: false,
      alreadyTyped: false,
      gameIsDone: false,
    };
  },
  watch: {
    stopGame() {
      this.endGame()
    },
    chrono() {
      if (this.chrono === 0) {
        this.endGame()
      }
    }
  },
  unmounted() {
    this.stopChrono()
  },
  beforeCreate() {
    this.$store.commit('setGameState')
  },

  created() {
    this.$store.commit('newGame', {});

    document.addEventListener('keydown', this.getKeyPressed);
  },
  mounted() {
    axios.get("https://vue-project-backend-eta.vercel.app/api/new-game").then(response => this.goal = response.data.word); // get word to guess
    this.intervalID = setInterval(this.updateChrono, 1000); // init chrono
  },
  computed: {
    stopGame() {
      return this.$store.getters.getStopGame
    },

    displayChrono: function () {
      return helperMethods.convertChrono(this.chrono)
    },
    updateWord: function () {
      let wordToDisplay = [];
      let goodLetters = this.$store.getters.getGoodLetters;
      for (let i = 0; i < 5; i++) {
        if (this.word.length <= i) {
          if (goodLetters[i] === ' ') {
            wordToDisplay[i] = ['.', "gray"];
          } else {
            wordToDisplay[i] = [goodLetters[i], "green"];
          }
        } else {
          wordToDisplay[i] = [this.word[i], "gray"];
        }
      }
      return wordToDisplay
    }
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.getKeyPressed);
  },
  methods: {
    getKeyPressed: function (event) {
      if (event.key === "Backspace") {
        this.deleteInput()
      } else if (event.key === "Enter") {
        this.addWord()
      } else if (this.acceptedKeys.includes(event.key)) {
        this.addInput(event.key);
      }
    },
    addInput: function (v) {
      if (this.word.length < 5) {
        this.word += v
      }
    },
    deleteInput: function () {
      this.word = this.word.slice(0, this.word.length - 1)
    },
    addWord: async function () {
      if (this.word.length !== 5) {
        return
      }

      let correct = (await axios.post("https://vue-project-backend-eta.vercel.app/api/check-word",
        {
          word: this.word
        }
      )).data.isWord; // check if the word exist

      if (correct) { // if the word exist and his length == 5
        if (this.listWords.indexOf(this.word) !== -1) {
          this.alreadyTyped = true
          setTimeout(() => this.alreadyTyped = false, 2000)
        }
        else {
          this.listWords.push(this.word);
          this.word = "";
          this.nbTryLeft--;

          if (this.listWords[this.listWords.length - 1] === this.goal) {
            this.win = true;
          }

          if (this.win || this.nbTryLeft === 0) {
            this.endGame();
          }
        }
      }
      else {
        this.incorrectWord = true
        setTimeout(() => this.incorrectWord = false, 2000)
      }

    },
    updateChrono: function () {
      this.chrono -= 1; // add 1 second in chrono
    },
    stopChrono: function () {
      clearInterval(this.intervalID);
    },
    endGame: function () {
      this.stopChrono();
      this.gameIsDone = true

      this.$store.commit('addGame', {
        "date": new Date(), "nbTry": this.listWords.length, "time": 600 - this.chrono, "win": this.win, "word": this.goal
      });
    },
  }
};
</script>

<style scoped>
.keyboard-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 680px;
  height: auto;
  padding: 14px;
  margin: 20px auto;
  background-color: #f9f9f9;
  border: 2px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: medium;
}

.keyboard-wrapper input:first-child {
  margin-left: 0;
  padding-left: 0;
}

.row-special {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  flex-wrap: wrap;
}

.key-wrapper.special-key {
  background-color: #0c5776;
  color: white;
  font-weight: bold;
  width: 92px;
  height: 45px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.special-key.enter-btn {
  width: 180px;
}

#idButton {
  background-color: #e4643a;
}

#idButton:hover {
  background-color: #f38762;
}

#idButton:active {
  background-color: #fc4f00;
}

.key-wrapper.special-key:hover {
  background-color: #2d99ae;
}

.key-wrapper.special-key:active {
  background-color: #001c44;
  transform: scale(0.95);
}

.row-normal {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
</style>