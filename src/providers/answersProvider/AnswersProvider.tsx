import React, {createContext, useCallback, useEffect, useState} from 'react';
import {Answer} from "../../types";

export interface IAnswersContext {
  latestAnswer: Answer | null,
  answers: Answer[],
  submitAnswer: (answer: Answer) => void,
}

export const AnswersContext = createContext<IAnswersContext>(null!);

interface NotificationsProviderProps {
  children: JSX.Element | JSX.Element[];
}

export default function AnswersProvider({ children }: NotificationsProviderProps) {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [latestAnswer, setLatestAnswer] = useState<Answer | null>(null);

  useEffect(() => {
    setAnswers(JSON.parse(localStorage.getItem('answers') || '[]'));
  }, []);

  useEffect(() => {
    setLatestAnswer(answers[answers.length - 1]);
  }, [answers]);

  const submitAnswer = useCallback((data: Answer) => {
    const updatedAnswers = [...answers, data];
    localStorage.setItem('answers', JSON.stringify(updatedAnswers));
    setAnswers(updatedAnswers);
  }, [answers]);

  return (
    <AnswersContext.Provider
      value={{
        latestAnswer,
        answers,
        submitAnswer,
      }}
    >
      {children}
    </AnswersContext.Provider>
  );
}
