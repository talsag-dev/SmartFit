import React, { Fragment, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import FoodItemToDispaly from "./FoodItemToDispaly";

import {
  getCurrentMenu,
  createMenu,
  deleteMenu,
} from "../../actions/menu";


const Menu = ({
  createMenu,
  getCurrentMenu,
  deleteMenu,
  menu: { menu },
  auth: {
    user: { full_name, email },
  },
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    getCurrentMenu();
  }, [getCurrentMenu]);

  const handleUpdateClick = (e) => {
    e.preventDefault();
    navigate("/create-menu");
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    deleteMenu();
    navigate("/dashboard");
  };

  const handleAddmenuClick = (e) => {
    e.preventDefault();
    createMenu();
    navigate("/create-menu");
  };

  const handleTotalCalories = (menu) => {
    let totalCalories = 0;
    menu.foods.forEach((item) => {
      totalCalories +=
        (item.user_input_grams / item.serving_weight_grams) * item.nf_calories;
    });
    return Math.round(totalCalories);
  }
  const handleTotalProtien = (menu) => {
    let totalProtien = 0;
    menu.foods.forEach((item) => {
      totalProtien +=
      (item.user_input_grams/item.serving_weight_grams) * item.nf_protein;
    });
    return Math.round(totalProtien);
  }

  const handleTotalfat = (menu) => {
      let totalFat = 0;
      menu.foods.forEach((item) => {
        totalFat +=
          (item.user_input_grams / item.serving_weight_grams) *
          item.nf_total_fat;
      });
      return Math.round(totalFat);
      };
  const handleTotalCarb= (menu) => {
    let totalCarb = 0;
    menu.foods.forEach((item) => {
      totalCarb +=
        (item.user_input_grams / item.nf_total_carbohydrate) *
        item.nf_protein;
    });
    return Math.round(totalCarb);
  };






  return (
    <section className='container'>
      <h1 className='large text-primary'>Menu</h1>
      <p className='lead'>
        <i className='fas fa-utensils' /> Welcome{" "}
        {full_name ? full_name : email}
      </p>
      {menu !== null ? (
        <>
          {menu.foods.length !== 0 ? (
            <Fragment>
              <h2 className='text-primary'>
                Total Calories :{handleTotalCalories(menu)}
              </h2>
              <h2 className='text-primary'>
                Calories from Fat:{handleTotalfat(menu)}
              </h2>
              <h2 className='text-primary'>
                Calories from Carbs:{handleTotalCarb(menu)}
              </h2>
              <h2 className='text-primary'>
                Calories from Protein:{handleTotalProtien(menu)}
              </h2>
              <>
                {menu.foods.map((food,index) => (
                  <>
                    <FoodItemToDispaly
                      key={index}
                      id={food._id}
                      food={food}
                      portion={food.user_input_grams}
                    />
                  </>
                ))}
                {" "}
                <button className='btn btn-primary' onClick={handleUpdateClick}>
                  Update Menu
                </button>
                <button className='btn btn-primary' onClick={handleDeleteClick}>
                  Delete Menu
                </button>
              </>
            </Fragment>
          ) : (
            <Navigate to='/create-menu' />
          )}
        </>
      ) : (
        <>
          <p>You have not yet setup a Menu, please add some info</p>
          <button className='btn btn-primary my-1' onClick={handleAddmenuClick}>
            Create Menu
          </button>
        </>
      )}
    </section>
  );
};

Menu.propTypes = {
  createMenu: PropTypes.func.isRequired,
  getCurrentMenu: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteMenu: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  menu: state.menu,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  createMenu,
  getCurrentMenu,
  deleteMenu,
})(Menu);
