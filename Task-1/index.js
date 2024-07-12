"use strict";
const SquareLeft = "[";
const SquareRight = "]";
const decodeString = (s) => {
  const stackEmptyArray = [];
  let positiveNum = 0;
  let currentEmptyString = "";

  for (let char of s) {
    const equalCharWithSquareLeft = char === SquareLeft;
    if (!isNaN(char)) {
      // If the character is a digit, build the number
      positiveNum = positiveNum * 10 + parseInt(char);
    } else if (equalCharWithSquareLeft) {
      // Push the current number and string to the stack
      stackEmptyArray.push(currentEmptyString);
      stackEmptyArray.push(positiveNum);
      // Reset the current string and number
      currentEmptyString = "";
      positiveNum = 0;
    } else if (char === SquareRight) {
      // Pop the number and previous string from the stack
      const num = stackEmptyArray.pop();
      const prevString = stackEmptyArray.pop();
      // Repeat the current string num times and append to the previous string
      currentEmptyString = prevString + currentEmptyString.repeat(num);
    } else {
      // Build the current string
      currentEmptyString += char;
    }
  }

  return currentEmptyString;
};

// Sample Test cases
console.log(decodeString("3[a]2[bc]")); // Output: "aaabcbc"
console.log(decodeString("3[a2[c]]")); // Output: "accaccacc"
console.log(decodeString("2[abc]3[cd]ef")); // Output: "abcabccdcdcdef"
console.log(decodeString("2[ab3[cc]]")) // Output: "abccccccabcccccc"