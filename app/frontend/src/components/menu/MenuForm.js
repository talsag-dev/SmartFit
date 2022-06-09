import React, { Fragment, useState, useEffect } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";

import {
  addFood,
  deleteFood,
  getCurrentMenu,
  searchFood,
} from "../../actions/menu";
import FoodItem from "./FoodItem";



const initialState = {
  foods: [],
  total_calories: 0,
  calories_from_fat:0,
  calories_from_protien:0,
  calories_from_carbs:0,
  time_created:null,
};

const MenuForm = ({
  menu: { menu, loading },
  addFood,
  getCurrentMenu,
  deleteFood,
  searchFood,
}) => {
  const [formData, setFormData] = useState(initialState);
  let navigate = useNavigate();
  const FoodFound = useSelector((state) => state.food.food);
  const [Query, setQuery] = useState(null)



  useEffect(() => {
    // if there is no profile, attempt to fetch one
    if (!menu) getCurrentMenu();

    // if we finished loading and we do have a profile
    // then build our profileData
    if (!loading && menu) {
      const menuData = { ...initialState };
      for (const key in menu) {
        if (key in menuData) menuData[key] = menu[key];
      }
      for (const key in menu.foods) {
        if (key in menuData) menuData[key] = menu.foods[key];
      }
      setFormData(menuData);
    }
  }, [loading, getCurrentMenu, menu]);


  const handleSearchFood = (e) => {
    e.preventDefault();
    searchFood(Query);
  };

  const handleSubmitClick = (e) => {
    e.preventDefault()
    navigate('/menu')
  }

  function addFoodItem(food,user_input_grams) {
    const newFood = {...food,user_input_grams:user_input_grams}
    addFood(newFood);
  }


  return (
    <section className='container'>
      <h1 className='large text-primary'>{"Update Your Menu"}</h1>
      <p className='lead'>
        <i className='fas fa-user' />
        {" Add Food to your menu"}
      </p>
      
      <form className='form' onSubmit={handleSearchFood}>
        <label htmlFor='food_search'>Search Food:</label>
        <input
          type='text'
          name='food_serach'
          onChange={(e) => setQuery(e.target.value)}
        />
        <input type='submit' className='btn btn-light' value='Search' />
      </form>

      <div className='profiles'>
        <p>* g option will always be 100grams</p>
        <Fragment>
          {FoodFound !== null && FoodFound !== undefined
            ? FoodFound.map((food, index) => (
                <>
                  <FoodItem key={index} food={food} addFoodItem={addFoodItem} />
                </>
              ))
            : null}
        </Fragment>
      </div>
      <button className='btn btn-primary my-1' onClick={handleSubmitClick}>
        Submit
      </button>

      <Link className='btn btn-light my-1' to='/dashboard'>
        Go Back
      </Link>
    </section>
  );
};

MenuForm.propTypes = {
  getCurrentMenu: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired,
  addFood: PropTypes.func.isRequired,
  deleteFood: PropTypes.func.isRequired,
  searchFood: PropTypes.func.isRequired,
  food: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  menu: state.menu,
  food: state.food,
});

export default connect(mapStateToProps, {
  addFood,
  deleteFood,
  getCurrentMenu,
  searchFood,
})(MenuForm);
