import React, { useContext } from 'react';
import BlogPostForm from '../components/blogPostForm';
import { Context } from '../context/BlogContext'

const EditScreen = ({ navigation }) => {
  const id = navigation.getParam('id');
  const {state, editBlogPost} = useContext(Context);
  const blogPost = state.find(blogPost => blogPost.id === id); 

  return(
     <BlogPostForm initialValues={{title: blogPost.title, content: blogPost.content}}  onSubmit={(title, content) => {
      editBlogPost(id, title, content, () => navigation.pop());
    }}/>
  );
}

export default EditScreen;

 