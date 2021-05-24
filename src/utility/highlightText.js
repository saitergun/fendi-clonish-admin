/* eslint-disable no-constant-condition */
/* eslint-disable no-useless-escape */
import React from 'react';

const escapeRegExpChars = (text) => {
  return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

// https://github.com/palantir/blueprint/blob/develop/packages/docs-app/src/examples/select-examples/films.tsx#L177
const highlightText = (text, query) => {
  let lastIndex = 0;

  const words = query
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .map(escapeRegExpChars);

  if (words.length === 0) {
    return [text];
  }

  const regexp = new RegExp(words.join('|'), 'gi');
  const tokens = [];

  while (true) {
    const match = regexp.exec(text);

    if (!match) {
      break;
    }

    const { length } = match[0];
    const before = text.slice(lastIndex, regexp.lastIndex - length);

    if (before.length > 0) {
      tokens.push(before);
    }

    lastIndex = regexp.lastIndex;

    tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
  }

  const rest = text.slice(lastIndex);

  if (rest.length > 0) {
    tokens.push(rest);
  }

  return tokens;
}

export default highlightText;
