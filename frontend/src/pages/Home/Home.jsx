import React, { useState } from 'react'
import ExploreCategory from '../../components/ExploreCategory/ExploreCategory'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <>
    <ExploreCategory category={category} setCategory={setCategory} />
    <FoodDisplay category={category}/>
    </>
  )
}

export default Home