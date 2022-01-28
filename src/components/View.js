import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';

import Article from './Article';
import EditForm from './EditForm';

import axiosWithAuth from '../utils/axiosWithAuth';
import axios from 'axios';

const View = (props) => {
    const [articles, setArticles] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState();

   

    const {id} = useParams();

    const handleDelete = (id) => {
        axiosWithAuth().delete(`/articles/${id}`)   ////concern: I might need to make id dynamic, make a new const or use editId perhaps?
        .then(res => {
            // console.log(res)  deletes movies
            setArticles(articles.filter(item=>(item.id !== id)));   /// this works! deletes movies once the button is clicked. yay
        })
        .catch(err =>{
            console.log(err)
        })
    }

    const handleEdit = (article) => {
        axiosWithAuth().put(`/articles/${editId}`, article)
        .then(res=>{
            //console.log(res); edits articles!
            setArticles(res.data);
            setEditing(false);
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const handleEditSelect = (id)=> {
        setEditing(true);
        setEditId(id);
    }

    const handleEditCancel = ()=>{
        setEditing(false);
    }

    //Concern is about this one below
    useEffect(()=>{
        axiosWithAuth().get('/articles')
        .then(res => {
            //console.log(res.data);    works!!!
            setArticles(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    },[]);

    return(<ComponentContainer>
        <HeaderContainer>View Articles</HeaderContainer>
        <ContentContainer flexDirection="row">
            <ArticleContainer>
                {
                    articles.map(article => {
                        return <ArticleDivider key={article.id}>
                            <Article key={article.id} article={article} handleDelete={handleDelete} handleEditSelect={handleEditSelect}/>
                        </ArticleDivider>
                    })
                }
            </ArticleContainer>
            
            {
                editing && <EditForm editId={editId} handleEdit={handleEdit} handleEditCancel={handleEditCancel}/>
            }
        </ContentContainer>
    </ComponentContainer>);
}

export default View;

//Task List:
//done//1. Build and import axiosWithAuth module in the utils.
//done//2. When the component mounts, make an http request that adds all articles to state.  Concern: did the useEffect I built above accomplish what they asked for?
//done//3. Complete handleDelete method. It should make a request that delete the article with the included id.
//4. Complete handleEdit method. It should make a request that updates the article that matches the included article param.


const Container = styled.div`
    padding: 0.5em;
`
const HeaderContainer = styled.h1`
    border-bottom: solid black 2px;
    padding: 1em;
    margin:0;
    font-size: 1.5em;
    background: black;
    color: white;
`

const ArticleDivider = styled.div`
    border-bottom: 1px solid black;
    padding: 1em;
`

const ComponentContainer = styled.div`
    display:flex;
    width: 80%;
    flex-direction: column;
    justify-content: center;
    
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.flexDirection};
`

const ArticleContainer = styled.div`
    background: grey;
`;