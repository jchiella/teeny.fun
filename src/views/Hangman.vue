<template>
  <div ref="outerDiv">
    <h1 class="text-center text-4xl font-bold mb-5">Hangman</h1>
    <HangmanGallows :state="gallowsState" />
    <HangmanWord :class="wordColor" :word="guessedWord" />
    <HangmanGuesses :guesses="wrongGuesses" />
    <HangmanStatus :status="gameStatus" />
    <div class="flex flex-col items-center">
      <input
        v-if="onMobile"
        ref="mobileInput"
        @input="propagateKey"
        type="text"
        placeholder="Tap here for your keyboard!"
        style="caret-color: transparent"
        class="bg-black outline-none"
      />
      <button
        id="play-again-btn"
        class="px-2 py-1 mt-2 mx-auto bg-white text-blue-900 font-bold flex-4 text-center text-lg"
        @click.prevent="resetGame"
      >
        {{ gameStatus !== 'normal' ? 'Play Again' : 'New Game' }}
      </button>
    </div>
  </div>
</template>

<script>
import HangmanGallows from '@/components/HangmanGallows.vue';
import HangmanWord from '@/components/HangmanWord.vue';
import HangmanGuesses from '@/components/HangmanGuesses.vue';
import HangmanStatus from '@/components/HangmanStatus.vue';

import words from '@/assets/words.json';

import {
  ref, computed, onMounted, onUnmounted,
} from 'vue';

function getHangmanWord() {
  return words[Math.floor(Math.random() * words.length)];
}

export default {
  setup() {
    const gallowsState = ref(0);
    const guessedWord = ref('');
    const wrongGuesses = ref([]);
    const gameStatus = ref('normal');
    const wordColor = ref('text-white');
    const outerDiv = ref(null);
    const mobileInput = ref(null);
    const onMobile = computed(() => (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1));

    let hiddenWord = getHangmanWord();

    guessedWord.value = '_'.repeat(hiddenWord.length);

    const gameWon = () => {
      gameStatus.value = 'won';
    };

    const gameLost = () => {
      gameStatus.value = 'lost';
      guessedWord.value = hiddenWord;
      wordColor.value = 'text-green-500';
    };

    const resetGame = () => {
      gallowsState.value = 0;
      guessedWord.value = '';
      wrongGuesses.value = [];
      gameStatus.value = 'normal';
      hiddenWord = getHangmanWord();
      guessedWord.value = '_'.repeat(hiddenWord.length);
      wordColor.value = 'text-white';
    };

    const guessLetter = (event) => {
      const guess = event.key.toLowerCase();

      if (gameStatus.value !== 'normal') return;
      if (wrongGuesses.value.includes(guess)) return;
      if (guessedWord.value.includes(guess)) return;

      if (guess === 'enter') {
        resetGame();
        return;
      }

      if (/^[^a-zA-Z]$/.test(guess)) return;

      let matchFound = false;

      [...hiddenWord].forEach((letter, index) => {
        if (letter === guess) {
          guessedWord.value = guessedWord.value.substring(0, index) + guess
            + guessedWord.value.substring(index + 1);
          matchFound = true;
        }
      });

      if (!matchFound) {
        wrongGuesses.value.push(guess);
        gallowsState.value += 1;
      }

      if (guessedWord.value === hiddenWord) {
        gameWon();
      }

      if (gallowsState.value > 5) {
        gameLost();
      }
    };

    const propagateKey = (event) => {
      const newEvent = new KeyboardEvent('keydown', {
        key: event.data,
        bubbles: true,
      });
      mobileInput.value.value = '';
      guessLetter(newEvent);
    };

    onMounted(() => window.addEventListener('keypress', guessLetter));
    onUnmounted(() => window.removeEventListener('keypress', guessLetter));

    const nextState = () => {
      gallowsState.value += 1;
    };

    return {
      gallowsState,
      guessedWord,
      wrongGuesses,
      nextState,
      gameStatus,
      resetGame,
      wordColor,
      propagateKey,
      outerDiv,
      mobileInput,
      onMobile,
    };
  },
  name: 'Hangman',
  components: {
    HangmanGallows,
    HangmanWord,
    HangmanGuesses,
    HangmanStatus,
  },
};
</script>
