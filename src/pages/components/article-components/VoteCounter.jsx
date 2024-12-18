import { useState } from 'react';
import { Button } from 'react-bootstrap';
import upvote from '../../../assets/images/vecteezy_thumbs-up-and-down-icon-eps-10_10737184.png';
import downvote from '../../../assets/images/vecteezy_thumbs-up-and-down-icon-eps-10_10687926.png';
import axios from 'axios';

const VoteCounter = ({
  baseURL,
  article_id,
  initialVotes,
  userVote,
  isLoggedIn,
}) => {
  const [votes, setVotes] = useState(initialVotes);
  const [currentVote, setCurrentVote] = useState(userVote);
  const [isLoading, setLoading] = useState(false);

  const handleVoteChange = async (inc_votes) => {
    if (!isLoggedIn) {
      alert('You must be logged in to vote.');
      return;
    }

    if (currentVote === inc_votes) {
      alert('You cannot vote the same way twice. Change your vote instead.');
      return;
    }

    let newVotes;
    if (currentVote === 'none') {
      newVotes = votes + inc_votes;
    } else {
      newVotes = votes + inc_votes * 2;
    }

    setVotes(newVotes);
    setCurrentVote(inc_votes);

    setLoading(true);

    try {
      await axios.patch(`${baseURL}/articles/${article_id}`, { inc_votes });
    } catch (err) {
      setVotes(votes);
      setCurrentVote('none');
      alert('Failed to update votes, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="voting-buttons">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Button
            variant="outline-dark"
            onClick={() => handleVoteChange(1)}
            disabled={currentVote === 1}
          >
            <img
              alt="A thumbs up icon. Increase Vote count."
              className="icon"
              src={upvote}
            />
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => handleVoteChange(-1)}
            disabled={currentVote === -1}
          >
            <img
              alt="A thumbs down icon. Decrease Vote count."
              className="icon"
              src={downvote}
            />
          </Button>
        </>
      )}
      <h3>Votes: {votes}</h3>
    </section>
  );
};

export default VoteCounter;
