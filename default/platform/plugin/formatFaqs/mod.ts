export function extractQa(inputString: string): string {
  const answers: string[] = [];
  const questions: string[] = [];

  const pairs = inputString.split(',');

  for (const pair of pairs) {
    const trimmedPair = pair.trim();

    if (trimmedPair.startsWith('answer:')) {
      const answerValue = trimmedPair.substring('answer:'.length).trim();
      if (answerValue) {
          answers.push(answerValue);
      }
    } else if (trimmedPair.startsWith('question:')) {
      const questionValue = trimmedPair.substring('question:'.length).trim();
      if (questionValue) {
          questions.push(questionValue);
      }
    }
  }

  const joinedAnswers = answers.join(',');
  const joinedQuestions = questions.join(',');

  return `${joinedAnswers}' ;$; '${joinedQuestions}`;
} 
