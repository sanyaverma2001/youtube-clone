import React, { useEffect } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import PropTypes from 'prop-types'; // Import PropTypes
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const PlayVideo = () => {
  const { videoId } = useParams();
  const [apiData, setApiData] = React.useState(null);
  const [channelData, setChannelData] = React.useState(null);
  const [commentData, setCommentData] = React.useState(null);

  const fetchVideoData = async () => {
    // Fetching Videos Data
    const videoDetals_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetals_url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items[0]));
  };

  const fetchOtherData = async () => {
    // Fetching channel data
    if (apiData?.snippet?.channelId) {
      const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      await fetch(channelData_url)
        .then((res) => res.json())
        .then((data) => setChannelData(data.items[0]));
    }

    // Fetching comments data
    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
    await fetch(comment_url)
      .then((res) => res.json())
      .then((data) => setCommentData(data.items));
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    if (apiData) {
      fetchOtherData();
    }
  }, [apiData]);

  return (
    <div className="play-video">
      {/* Video player */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoPlay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      
      {/* Video title */}
      <h3>{apiData ? apiData.snippet.title : 'Title here'}</h3>

      {/* Video info */}
      <div className="play-video-info">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : '16k'} views &bull;{' '}
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ''}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apiData ? value_converter(apiData.statistics.likeCount) : 155}
          </span>
          <span>
            <img src={dislike} alt="" />2
          </span>
          <span>
            <img src={share} alt="" />Share
          </span>
          <span>
            <img src={save} alt="" />Save
          </span>
        </div>
      </div>

      <hr />

      {/* Publisher info */}
      <div className="publisher">
        <img src={channelData ? channelData.snippet.thumbnails.default.url : ''} alt="" />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ''}</p>
          <span>
            {channelData ? value_converter(channelData.statistics.subscriberCount) : '1M'} subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>

      {/* Video description */}
      <div className="vid-description">
        <p>{apiData ? apiData.snippet.description.slice(0, 250) : 'Description'}</p>
        <hr />

        {/* Comments */}
        <h4>{apiData ? value_converter(apiData.statistics.commentCount) : '102'} Comments</h4>
        {commentData && commentData.length > 0 ? (
          commentData.map((item, index) => (
            <div key={index} className="comment">
              <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
              <div>
                <h3>
                  {item.snippet.topLevelComment.snippet.authorDisplayName}{' '}
                  <span>1 day ago</span>
                </h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No comments found.</p>
        )}
      </div>
    </div>
  );
};

PlayVideo.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default PlayVideo;
