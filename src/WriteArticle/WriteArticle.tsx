import React, { useState, useEffect } from 'react';
import Header from '../UI/Header';
import MediaQuery from 'react-responsive';
import Footer from '../UI/Footer';
import CreateArticle from './CreateArticle';
import ArticleList from '../UI/ArticleList';
import { useSelector } from 'react-redux';
import firebase from './../config/firebase';
import { RootState } from '../re-ducks/store';

const WriteArticle = () => {
  const [article, setArticle] = useState([]);
  const user = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    if (user) {
      firebase
        .firestore()
        .collection('articles')
        .onSnapshot((snapshot) => {
          snapshot.docs
            .filter((doc) => doc.id === user.uid)
            .map((doc) => {
              setArticle(doc.data().article);
              return { ...doc.data().article };
            });
        });
    }
  }, []);

  return (
    <>
      <div style={{ marginTop: 100 , paddingBottom: 100 }}>
        <Header activeItem='article' />
        <CreateArticle user={user} article={article} />
        <ArticleList article={article} />
        <MediaQuery query='(max-width: 670px)'>
          <Footer activeItem='article' />
        </MediaQuery>
      </div>
    </>
  );
};

export default WriteArticle;
