import React, {useCallback} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { Button, Chip } from "@material-ui/core";
import { HelpOutline } from '@material-ui/icons';
import Page from "../../components/page/Page";
import useAnswersContext from "../../hooks/useAnswersContext/useAnswersContext";
import styles from './QuestionList.module.scss';
import {Answer} from "../../types";

function QuestionList() {
  const history = useHistory();

  const { answers } = useAnswersContext();

  const onAnotherQuestion = useCallback(() => {
    history.push('/ask')
  }, [history]);

  return (
    <Page
      title='Q&A history'
      actions={(
        <Link to='/ask'>
          <Button color='primary' size='large' endIcon={(<HelpOutline />)}>
            <div className='mobile-hidden'>Ask your question</div>
          </Button>
        </Link>
      )}
      isPageHeight
    >
      <div className={styles.questionList}>
        <div className={styles.questionListContent}>
          {answers.map((answer: Answer, index: number) => (
            <div key={index}>
              <h3>{answer.question}</h3>
              <Chip label={(<strong>{answer?.result}</strong>)} variant="outlined" />
            </div>
          ))}
        </div>
        <Button
          onClick={onAnotherQuestion}
          color='primary'
          size='large'
          type='button'
          endIcon={(<HelpOutline />)}
        >
          Ask your question
        </Button>
      </div>
    </Page>
  );
}

export default QuestionList;
