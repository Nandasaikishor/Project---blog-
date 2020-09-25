import createDataContext from './createDataContext';
import jsonserver from '../api/json-server';
 const blogReducer = (state, action) => {
          switch (action.type) { 
                case 'delete_blogpost':
                           return state.filter((blogPost) => blogPost.id !== action.payload);
                case 'edit_blogPost': 
                           return state.map (blogPost =>  {return blogPost.id === action.payload.id  ? action.payload : blogPost});
                case 'get_blogposts':
                          return action.payload;
                default: 
                           return state;
          }
 } 
 
 const getBlogPosts = dispatch => {
   return async () => {
       const responce = await jsonserver.get('/blogPosts');

   dispatch({type: 'get_blogposts', payload: responce.data})
   }
 };

 const addBlogPost = dispatch => {
   return async (title, content, callback) => {

      await jsonserver.post('/blogPosts',{title,content});

       if(callback){
         callback();
       } 
   };
};  

const deleteBlogPost = dispatch => {
  return async (id) => {
       await jsonserver(`/blogPosts/${id}`) // remove  post from  backend

       dispatch({type : 'delete_blogpost', payload : id})   // remove post from front-end(locally)  
  };
}; 
 
const editBlogPost = dispatch => {
  return async (id, title, content , callback) => {
    await jsonserver.put(`/blogPosts/${id}`, {title, content})
  dispatch({ type: 'edit_blogPost', payload: {id, title, content} });
  callback();
  };
};

export const { Context, Provider}  = createDataContext(
  blogReducer,
  {addBlogPost,deleteBlogPost,editBlogPost,getBlogPosts},
  []
)