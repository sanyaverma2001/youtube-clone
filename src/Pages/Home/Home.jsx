import React from 'react'
import './Home.css'
import Sidebar from '../../Cmponents/Sidebar/Sidebar'
import PropTypes from 'prop-types'; // Import PropTypes
import Feed from '../../Cmponents/Feed/Feed'


const Home = ({sidebar}) => {
  const [category, setCategory] = React.useState(0);
  return (
    <>
    <Sidebar sidebar={sidebar} category = {category} setCategory={setCategory}/>
    <div className = {`container ${sidebar?"":"large-container"}`}>
      <Feed category = {category}/>
      </div>
    </>
  
  )
}
Home.propTypes = {
  sidebar: PropTypes.bool.isRequired // Add prop type validation for 'sidebar' prop
};
export default Home