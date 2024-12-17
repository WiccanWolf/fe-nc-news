// import { createContext, useContext, useState } from 'react';

// const ArticlesContext = createContext();

// export const useArticlesContext = () => {
//   const value = useContext(ArticlesContext);
//   if (!value) {
//     throw new Error('useArticlesContext has no value!');
//   }
//   return value;
// };

// const ArticlesProvider = ({ children }) => {
//   const [articles, setArticles] = useState([]);
//   const [selectedArticle, setSelectedArticle] = useState(null);
//   const selectArticleById = (article_id) => {
//     const article = articles.find(
//       (article) => article.article_id === article_id
//     );
//     setSelectedArticle(article);
//     return (
//       <ArticlesContext.Provider
//         value={{ articles, setArticles, selectedArticle, selectArticleById }}
//       >
//         {children}
//       </ArticlesContext.Provider>
//     );
//   };
// };

// export default ArticlesProvider;
