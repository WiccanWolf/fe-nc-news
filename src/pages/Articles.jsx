import axios from 'axios';
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Form } from 'react-bootstrap';
import ArticleCard from './components/article-components/ArticleCard';
import NotFoundPage from './components/error-handling-components/NotFoundPage';

const Articles = ({ baseURL }) => {
  const [articles, setArticles] = useState([]); // Shouldn't need both states VVV
  const [sortedArticles, setSortedArticles] = useState([]); // Unneeded <--- Can use first Articles
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [sortCriteria, setSortCriteria] = useState('created_at'); // Use sortCriteria to set URL Queries. Do in backend as Frontend sorting isn't best practice.

  useEffect(() => {
    setLoading(true); // May not be needed.
    setError(false); // May not be needed.
    axios
      .get(`${baseURL}/articles`)
      .then(({ data }) => {
        setArticles(data.articles);
      })
      .catch((err) => {
        setError(true);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [baseURL]); // Should also include sortCriteria.

  const sortAllArticles = (articles, sort_by) => {
    return [...articles].sort((a, b) => {
      const valueA = a[sort_by];
      const valueB = b[sort_by];
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      }
      return valueA - valueB;
    });
  };

  const handleSortCriteria = (sort_by) => {
    if (sort_by === '') {
      setSortedArticles([]);
    } else {
      const sortedArticleArray = sortAllArticles(articles, sort_by);
      setSortedArticles(sortedArticleArray);
    }
    setSortCriteria(sort_by);
  };

  if (isError) {
    return <NotFoundPage message="Article not found" />;
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <ThreeDots
          className="loading"
          visible={true}
          height="80"
          width="80"
          color="black"
          radius="9"
          ariaLabel="three-dots-loading"
        />
      </div>
    );
  }

  if (articles.length === 0) {
    return <p>No Articles Available.</p>; // Put this in an error handling Component. Optimistically this never gets hit.
  }

  return (
    <>
      <h1 className="articles">Articles</h1>
      <section>
        <Form>
          {/*Can move into a child component*/}
          <Form.Select
            size="sm"
            onChange={(e) => handleSortCriteria(e.target.value)}
            aria-label="sort-criteria"
          >
            <option>Sort Articles by...</option>
            <option value="title">Title</option>
            <option value="votes">Popularity</option>
            <option value="created_at">Date Created</option>
            <option value="author">Author</option>
          </Form.Select>
        </Form>
        <div className="grid-container">
          {(sortedArticles.length > 0 ? sortedArticles : articles).map(
            (article) => (
              <ArticleCard article={article} key={article.article_id} />
            )
          )}
        </div>
      </section>
    </>
  );
};

export default Articles;
