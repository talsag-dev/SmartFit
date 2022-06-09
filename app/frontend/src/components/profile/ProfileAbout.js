import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    email,
    height,
    weight,
    age,
    is_premium,
    premium_until,
    daily_active,
    health_problems_physical,
    diet_restrictions,
    fav_split,
    goal,
  },
  user:{full_name},
}) => {

  const Splits = ["Body Part", "Upper Lower", "Push,Pull, Legs", "Full Body"];

  return(
  <Fragment>
    <div className='profile-about bg-light p-2'>
        <Fragment>
            {full_name ? (
              <h2 className='text-primary'>
                {full_name.trim().split(" ")[0]}'s Bio
              </h2>
            ) : (
              <h2 className='text-primary'>
                {email}'s Bio
              </h2>
            )}
        </Fragment>
    </div>
    <div className='profile-email'>
      <h2 className='text-primary'>Email</h2>
      {email}
    </div>

    <div className='profile-weight'>
      <h2 className='text-primary'>Weight</h2>
      {weight}kg
    </div>

    <div className='profile-height'>
      <h2 className='text-primary'>Height</h2>
      {height}cm
    </div>

    <div className='profile-age'>
      <h2 className='text-primary'>Age</h2>
      {age}
    </div>

    <div className='profile-bmi'>
      <h2 className='text-primary'>BMI</h2>
      {(weight / Math.pow(height / 100, 2)).toFixed(1)}
    </div>

    <div className='profile-daily-active'>
      <h2 className='text-primary'>Daily Active</h2>
      
        <>
          <div key='true' className='active-choice-true'>
            <input
              readOnly
              type='radio'
              value='True'
              checked={"Yes" === daily_active}
            />
            <label htmlFor='true'> Yes</label>
          </div>
          <div key='false' className='active-choice-false'>
            <input
              readOnly
              type='radio'
              value='False'
              checked={"No" === daily_active}
            />
            <label htmlFor='false'> No</label>
          </div>
        </>
      
    </div>

    <div className='profile-health_problems'>
      <h2 className='text-primary'>Health Problems</h2>
      {health_problems_physical.map((problem, index) => (
        <div key={index} className='problem'>
          <i className='fas fa-briefcase-medical' />
          {problem}
        </div>
      ))}
    </div>

    <div className='profile-diet'>
      <h2 className='text-primary'>Diet Restrictions</h2>
      {diet_restrictions.map((problem, index) => (
        <div key={index} className='problem'>
          <i className='fas fa-briefcase-medical' /> {problem}
        </div>
      ))}
    </div>

    <div className='profile-fav-split'>
      <h2 className='text-primary'>Favorite Split</h2>
      {Splits.map((split, index) => (
        <div key={index} className={`split-choice-${index}`}>
          <input
            readOnly
            type='radio'
            value={split}
            checked={split === fav_split}
          />
          <label htmlFor={split}> {split}</label>
        </div>
      ))}
    </div>
    <div className='profile-premium'>
      {is_premium === "true" ? (
        <Fragment>
          <h2 className='text-primary'>Premium Until</h2>
          <div className='premium-until'>{Date(Date.parse(premium_until))}</div>
        </Fragment>
      ) : (
        <h2 className='text-primary' >Buy Premium</h2>
      )}
    </div>

    <div className='profile-goal'>
      <h2 className='text-primary'>Main Goal</h2>
      {goal}
    </div>
  </Fragment>
);
}



ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};


export default ProfileAbout;
