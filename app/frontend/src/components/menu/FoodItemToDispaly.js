import React from "react";
import { deleteFood } from "../../actions/menu";
import PropTypes from "prop-types";
import { connect } from "react-redux";



const FoodItemToDispaly = ({ deleteFood, id, portion, food }) => {
  const defaultServing = food.serving_weight_grams;

  const handleDeleteClick = (e) => {
    e.preventDefault();
    deleteFood(id);
  };


  return (
    <div className='exercise-grid bg-light'>
      <img src={food.photo.thumb} alt='' className='round-img' />
      <div>
        <h2 className='food-title'>
          {food.food_name.charAt(0).toUpperCase() + food.food_name.slice(1)}
        </h2>

        <p className='food-target-muscle'>
          Serving weight:
          {portion}grams
        </p>
        <p className='food-target-muscle'>
          Calories:{Math.round((portion / defaultServing) * food.nf_calories)}
        </p>
        <p className='food-target-muscle'>
          Cholesterol:
          {Math.round((portion / defaultServing) * food.nf_cholesterol)}
        </p>
        <p className='food-target-muscle'>
          Fiber:{Math.round((portion / defaultServing) * food.nf_dietary_fiber)}
        </p>
        <p className='food-target-muscle'>
          Potassium:{Math.round((portion / defaultServing) * food.nf_potassium)}
        </p>
        <p className='food-target-muscle'>
          Protien:{Math.round(food.nf_protein * (portion / defaultServing))}
        </p>
        <p className='food-target-muscle'>
          Saturated Fat:
          {Math.round(food.nf_saturated_fat * (portion / defaultServing))}
        </p>
        <p className='food-target-muscle'>
          Sodium:{Math.round(food.nf_sodium * (portion / defaultServing))}
        </p>
        <p className='food-target-muscle'>
          Sugars:{Math.round(food.nf_sugars * (portion / defaultServing))}
        </p>
        <p className='food-target-muscle'>
          Carbohydrate:
          {Math.round(food.nf_total_carbohydrate * (portion / defaultServing))}
        </p>
        <p className='food-target-muscle'>
          Fat:{Math.round(food.nf_total_fat * (portion / defaultServing))}
        </p>
      </div>
      <button className='btn btn-primary' onClick={handleDeleteClick}>
        Delete
      </button>
    </div>
  );
};

FoodItemToDispaly.propTypes = {
  deleteFood: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  portion: PropTypes.number.isRequired,
  food: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
  menu: state.menu,
});

export default connect(mapStateToProps, { deleteFood })(FoodItemToDispaly);
