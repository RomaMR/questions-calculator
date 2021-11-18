import React, {useCallback} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { Button, Chip } from "@material-ui/core";
import {HelpOutline, UpdateOutlined} from '@material-ui/icons';
import Page from "../../components/page/Page";
import useAnswersContext from "../../hooks/useAnswersContext/useAnswersContext";
import styles from './QuestionAnswer.module.scss';
import ROUTES from "../../constants/routes";

function QuestionAnswer() {
  const history = useHistory();

  const { latestAnswer } = useAnswersContext();

  const onAnotherQuestion = useCallback(() => {
    history.push(ROUTES.ask)
  }, [history]);

  const onViewHistory = useCallback(() => {
    history.push(ROUTES.list)
  }, [history]);

  return (
    <Page
      title='The answer'
      actions={(
        <Link to={ROUTES.list}>
          <Button color='primary' size='large' endIcon={(<UpdateOutlined />)}>
            <div className='mobile-hidden'>View your Q&A history</div>
          </Button>
        </Link>
      )}
      isPageHeight
    >
      <div className={styles.questionAnswer}>
        <div className={styles.questionAnswerContent}>
          <h3>{latestAnswer?.question}</h3>
          <Chip label={(<strong>{latestAnswer?.result}</strong>)} variant="outlined" />
          <Button
            onClick={onAnotherQuestion}
            color='primary'
            size='large'
            type='button'
            endIcon={(<HelpOutline />)}
          >
            Another question
          </Button>
          <Button
            onClick={onViewHistory}
            color='primary'
            size='large'
            type='button'
            endIcon={(<UpdateOutlined />)}
          >
            View your Q&A history
          </Button>
        </div>
      </div>
    </Page>
  );
}

export default QuestionAnswer;
