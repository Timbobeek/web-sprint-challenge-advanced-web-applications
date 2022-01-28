import React from 'react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';

import {render, screen, waitFor} from '@testing-library/react';

const testArticle = {
  id: 1,
  headline: 'Timmy is the best',
  createdOn: '',
  summary: '',
  body: '',
  author: 'Jim Jackson'
}

const testArticleTwo = {
  id: '',
  headline: 'Timmy is the best',
  createdOn: '',
  summary: '',
  body: '',
  author: ''
}


//// test 1----------------------------------------

test('renders component without errors', ()=> {
  render(<Article article={testArticle}/>);
});



////test 2-------------------------------------------

test('renders headline, author from the article when passed in through props', ()=> {
  render(<Article article={testArticle}/>);

  const headlineText = screen.queryByText(/timmy is the best/i)
  const authorText = screen.queryByText(/jim jackson/i)

  expect(headlineText).toBeInTheDocument();
  expect(authorText).toBeInTheDocument();

});

////test 3 ---------------------------------------------------

test('renders "Associated Press" when no author is given', ()=> {
  render(<Article article={testArticleTwo}/>);

  const defaultAuthor = screen.queryByText(/associated press/i)

  expect(defaultAuthor).toBeVisible();
});


///// test 4 --------------------------------------------------------

test('executes handleDelete when the delete button is pressed', async ()=> {
  const handleDelete = jest.fn();
  
  render(<Article article={testArticle} handleDelete={handleDelete}/>);

  const button = screen.getByTestId('deleteButton');
  userEvent.click(button);

  await waitFor(()=>{
    expect(handleDelete).toHaveBeenCalled();
  })
});

//Task List: 
//1. Complete all above tests. Create test article data when needed.