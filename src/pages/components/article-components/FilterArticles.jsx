import { Form } from 'react-bootstrap';

const SortArticles = ({ articles, setArticles }) => {
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
      setArticles([]);
    } else {
      const sortedArticleArray = sortAllArticles(articles, sort_by);
      setArticles(sortedArticleArray);
    }
  };

  return (
    <Form>
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
  );
};

export default SortArticles;
