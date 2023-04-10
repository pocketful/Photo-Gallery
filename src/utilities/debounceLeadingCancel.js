/**
 * Creates a leading debounced version of the provided function that executes immediately on the first call, then waits for the delay before executing again.
 * @param {Function} func - The function to be debounced.
 * @param {number} delay - The delay time in milliseconds.
 * @returns {Function} - The debounced version of the function.
 */

const debounceLeadingWithDelayCancel = (func, delay) => {
  let lastExecuted = 0

  return (...args) => {
    const now = Date.now()

    if (now - lastExecuted >= delay) {
      lastExecuted = now
      func(...args)
    }
  }
}

export default debounceLeadingWithDelayCancel
