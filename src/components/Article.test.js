import React from 'react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';
// import { render } from 'express/lib/response';
import {render, screen} from '@testing-library/react';

const testArticle = {
  id: '',
  headline: 'Timmy is the best',
  createdOn: '',
  summary: '',
  body: '',
  author: 'Jim Jackson'
}

test('renders component without errors', ()=> {
  render(<Article article={testArticle}/>);
});

test('renders headline, author from the article when passed in through props', ()=> {
  render(<Article article={testArticle}/>);

  const headlineText = screen.queryByText(/timmy is the best/i)
  const authorText = screen.queryByText(/jim jackson/i)

  expect(headlineText).toBeInTheDocument();
  expect(authorText).toBeInTheDocument();

});

test('renders "Associated Press" when no author is given', ()=> {
  render(<Article article={testArticle}/>);
});

test('executes handleDelete when the delete button is pressed', ()=> {
  const handleDelete = jest.fn();
  
  render(<Article article={testArticle} handleDelete={handleDelete}/>);

  const button = screen.getByTestId('deleteButton');
  userEvent.click(button);

  const article = screen.findByTestId('article')
  expect(article).not.toBeInTheDocument();
  
});

//Task List: 
//1. Complete all above tests. Create test article data when needed.