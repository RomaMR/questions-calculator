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
import ROUTES from "../../constants/routes";

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

const SIGNS = {
  plus: 'plus',
  minus: 'minus',
}

const SIGNS_VALUES = Object.values(SIGNS)

function QuestionAsk() {
  const classes = useStyles();

  const history = useHistory();

  const { submitAnswer } = useAnswersContext();

  const onSubmit = useCallback((data: any) => {
    const question = data[QUESTION_FIELD]
    const [, dataQuestion = ''] = question.split(PLACEHOLDER);
    const questionArray = dataQuestion.replace('?', '').split(' ');
    const [firstQ, sign, secondQ] = questionArray
    if (!isNaN(firstQ) && !isNaN(secondQ) && SIGNS_VALUES.includes(sign)) {
      const result = sign === SIGNS.plus ? (
        parseFloat(firstQ) + parseFloat(secondQ)
      ) : (
        parseFloat(firstQ) - parseFloat(secondQ)
      )
      submitAnswer({
        question,
        result
      });
      history.push(ROUTES.answer);
    }
  }, [history, submitAnswer]);

  return (
    <Page
      title='Ask your question'
      actions={(
        <Link to={ROUTES.list}>
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
