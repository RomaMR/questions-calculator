import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import AnswersProvider from "./providers/answersProvider/AnswersProvider";
import QuestionAnswer from "./pages/questionAnswer/QuestionAnswer";
import QuestionAsk from "./pages/questionAsk/QuestionAsk";
import QuestionList from "./pages/questionList/QuestionList";
import theme from "./theme";
import './index.css';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <AnswersProvider>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/">
            <QuestionAsk />
          </Route>
          <Route exact path="/ask">
            <QuestionAsk />
          </Route>
          <Route exact path="/answer">
            <QuestionAnswer />
          </Route>
          <Route exact path="/list">
            <QuestionList />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </AnswersProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
