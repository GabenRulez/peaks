export function apolloErrorToMessage(error) {
  if (error && error.graphQLErrors && error.graphQLErrors.length > 0) {
    return error.graphQLErrors
      .map((error) => error.message)
      .map(formatSentence)
      .join(' ');
  } else {
    return 'Something went wrong.';
  }
}

function formatSentence(message) {
  return capitalize(message).replace(/\.?$/, '.');
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
