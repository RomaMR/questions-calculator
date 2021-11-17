import { useContext } from 'react';
import { AnswersContext } from "../../providers/answersProvider/AnswersProvider";

export default function useAnswersContext() {
  const context = useContext(AnswersContext);
  if (!context) {
    throw new Error('useAnswersContext must be used within AnswersContext');
  }
  return context;
}
