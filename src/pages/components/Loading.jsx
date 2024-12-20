import { ThreeDots } from 'react-loader-spinner';

const Loading = () => {
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
};

export default Loading;
