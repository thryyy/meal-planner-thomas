//utils.js

/**
 * Check if a result from `Promise.allSettled` succeeded.
 */
const isFulfilled = (result) => result.status === "fulfilled";

/**
 * Check if a result from `Promise.allSettled` failed.
 */
const isRejected = (result) => result.status === "rejected";

/**
 * Shuffling a copy of the array using the Fisher-Yates shuffle
 * https://stackoverflow.com/questions/11935175/sampling-a-random-subset-from-an-array
 */
const shuffleArray = (array) => {
    const shuffled = array.slice(0);
    let i = array.length;
    let temp;
    let index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled;
};

export {
    isFulfilled,
    isRejected,
    shuffleArray,
};