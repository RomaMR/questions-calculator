import React, {useCallback} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from "@material-ui/core";
import { UpdateOutlined } from '@material-ui/icons';
import { Formik, FormikProps } from 'formik';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Page from "../../components/page/Page";
import Input from "../../components/input/Input";
import styles from './QuestionAsk.module.scss';
import useAnswersContext from "../../hooks/useAnswersContext/useAnswersContext";

const QUESTION_FIELD = 'question';
const PLACEHOLDER = 'What is ';

const useStyles = makeStyles(() =>
  createStyles({
    questionAskInput: {
      width: '100%',
      maxWidth: 320,
    },
    questionAskSubmit: {
      marginTop: 50,
      width: '100%',
      maxWidth: 320,
    }
  })
);

function QuestionAsk() {
  const classes = useStyles();

  const history = useHistory();

  const { submitAnswer } = useAnswersContext();

  const onSubmit = useCallback((data: any) => {
    const [, dataQuestion = ''] = data[QUESTION_FIELD].split(PLACEHOLDER);
    const questionArray = dataQuestion.replace('?', '').split(' ');
    if (!isNaN(questionArray[0]) && !isNaN(questionArray[2]) && ['plus', 'minus'].indexOf(questionArray[1]) >= 0) {
      submitAnswer({
        question: data[QUESTION_FIELD],
        result: questionArray[1] === 'plus' ? (
          parseFloat(questionArray[0]) + parseFloat(questionArray[2])
        ) : (
          parseFloat(questionArray[0]) - parseFloat(questionArray[2])
        )
      });
      history.push('/answer');
    }
  }, [history, submitAnswer]);

  return (
    <Page
      title='Ask your question'
      actions={(
        <Link to='/list'>
          <Button color='primary' size='large' endIcon={(<UpdateOutlined />)}>
            <div className='mobile-hidden'>View your Q&A history</div>
          </Button>
        </Link>
      )}
      isPageHeight
    >
      <Formik
        validateOnMount
        enableReinitialize
        initialValues={{ [QUESTION_FIELD]: PLACEHOLDER }}
        onSubmit={onSubmit}
      >
        {(form: FormikProps<any>) => (
          <fieldset className={styles.questionAsk}>
            <Input
              className={classes.questionAskInput}
              label='Type your mathematics question here'
              form={form}
              name={QUESTION_FIELD}
            />
            <Button
              className={classes.questionAskSubmit}
              onClick={form.submitForm}
              color='primary'
              size='large'
              type='submit'
            >
              Answer
            </Button>
          </fieldset>
        )}
      </Formik>
    </Page>
  );
}

export default QuestionAsk;
