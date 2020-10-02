<template>
  <div>
    <h1 class="text-center text-4xl font-bold mb-5">Hangman</h1>
    <HangmanGallows :state="gallowsState" />
    <HangmanWord :word="guessedWord" />
    <HangmanGuesses :guesses="wrongGuesses" />
  </div>
</template>

<script>
import HangmanGallows from '@/components/HangmanGallows.vue';
import HangmanWord from '@/components/HangmanWord.vue';
import HangmanGuesses from '@/components/HangmanGuesses.vue';

import words from '@/assets/words.json';

import { ref, onMounted, onUnmounted } from 'vue';

function getHangmanWord() {
  return words[Math.floor(Math.random() * words.length)];
}

export default {
  setup() {
    const gallowsState = ref(0);
    const guessedWord = ref('');
    const wrongGuesses = ref([]);

    const hiddenWord = getHangmanWord();

    guessedWord.value = '_'.repeat(hiddenWord.length);

    console.log(hiddenWord);

    const gameWon = () => {
      console.log('WON');
    };

    const gameLost = () => {
      console.log('LOST');
    };

    const guessLetter = (event) => {
      const guess = event.key.toLowerCase();
      // TODO validation on this to make sure it's a letter

      let matchFound = false;

      [...hiddenWord].forEach((letter, index) => {
        console.log(letter, index, letter === guess);
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
    };
  },
  name: 'Hangman',
  components: {
    HangmanGallows,
    HangmanWord,
    HangmanGuesses,
  },
};
</script>
