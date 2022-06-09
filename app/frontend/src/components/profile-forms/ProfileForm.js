import React, { Fragment, useState, useEffect } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import Select from "react-select";
/*
  NOTE: declare initialState outside of component
  so that it doesn't trigger a useEffect
  we can then safely use this to construct our profileData
 */
const initialState = {
  email:"",
  avatar:"",
  height:0,
  weight:0,
  age:0,
  BMI:0,
  is_premium:"",
  premium_until:"",
  daily_active:"",
  health_problems_physical:[],
  diet_restrictions:[],
  fav_split:"",
  goal:"",
  social:{
    facebook:"",
    twitter:"",
    instagram:"",
    linkedin:"",
    youtube:""
  },
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
}) => {
  const [formData, setFormData] = useState(initialState);

  const creatingProfile = useMatch("/create-profile");

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // if there is no profile, attempt to fetch one
    if (!profile) getCurrentProfile();

    // if we finished loading and we do have a profile
    // then build our profileData
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }

      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  
  const onChange = (e) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onChangeSocial = (e) => {
    setFormData({ ...formData, 
      social:{
        ...formData.social,
        [e.target.name]: e.target.value 
      }});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, navigate, profile ? true : false);
  };

  return (
    <section className='container'>
      <h1 className='large text-primary'>
        {creatingProfile ? "Create Your Profile" : "Edit Your Profile"}
      </h1>
      <p className='lead'>
        <i className='fas fa-user' />
        {creatingProfile
          ? ` Let's get some information to make your profile`
          : " Add some changes to your profile"}
      </p>
      <form className='form' onSubmit={onSubmit}>
        <small>* = required field</small>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Email'
            name='email'
            onChange={onChange}
            required
          />
          <small className='form-text'>* Email</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Avatar Link'
            name='avatar'
            onChange={onChange}
          />
          <small className='form-text'>Avatar Picture Link</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Age'
            name='age'
            maxLength='3'
            onChange={onChange}
            required
          />
          <small className='form-text'>* Age</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Height'
            name='height'
            maxLength='3'
            onChange={onChange}
            required
          />
          <small className='form-text'>* Height</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Weight'
            name='weight'
            maxLength='3'
            onChange={onChange}
            required
          />
          <small className='form-text'>* Weight</small>
        </div>
        <div className='form-group'>
          <Select
            onChange={(e) =>
              setFormData({
                ...formData,
                daily_active: e.value,
              })
            }
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: "#e0c6c1",
                text: "#3599B8",
                font: "#3599B8",
              },
            })}
            options={[
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ]}
            required
          />
          <small className='form-text'>* Are you daily active?</small>
        </div>

        <div className='form-group'>
          <Select
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: "#e0c6c1",
                text: "#3599B8",
                font: "#3599B8",
                primary: "black",
                neutral80: "black",
                color: "black",
              },
            })}
            onChange={(e) => {
              setFormData({
                ...formData,
                health_problems_physical: e.map((element) => element.value),
              });
            }}
            isMulti={true}
            options={[
              { value: "Low Back Pain", label: "Low Back Pain" },
              { value: "Shoulder Pain", label: "Shoulder Pain" },
              { value: "Sprained ankle", label: "Sprained ankle" },
              { value: "Shin splint", label: "Shin splint" },
            ]}
          />
          <small className='form-text'>Any physical issues?</small>
        </div>

        <div className='form-group'>
          <Select
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: "#e0c6c1",
                text: "#3599B8",
                font: "#3599B8",
                primary: "black",
                neutral80: "black",
                color: "black",
              },
            })}
            onChange={(e) => {
              setFormData({
                ...formData,
                diet_restrictions: e.map((element) => element.value),
              });
            }}
            isMulti={true}
            options={[
              { value: "Gluten Free", label: "Gluten Free" },
              { value: "Lactose Free", label: "Lactose Free" },
              { value: "Vegan", label: "Vegan" },
              { value: "Paleo diet", label: "Paleo Diet" },
            ]}
          />
          <small className='form-text'>Any Diet Restrictions?</small>
        </div>
        <div className='form-group'>
          <Select
            onChange={(e) =>
              setFormData({
                ...formData,
                fav_split: e.value,
              })
            }
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: "#e0c6c1",
                text: "#3599B8",
                font: "#3599B8",
              },
            })}
            options={[
              { value: "Body Part", label: "Body Part" },
              { value: "Upper Lower", label: "Upper Lower" },
              { value: "Push,Pull, Legs", label: "Push,Pull, Legs" },
              { value: "Full Body", label: "Full Body" },
            ]}

          />
          <small className='form-text'>Favorite GYM Split</small>
        </div>

        <div className='form-group'>
          <Select
            onChange={(e) =>
              setFormData({
                ...formData,
                goal: e.label,
              })
            }
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: "#e0c6c1",
                text: "#3599B8",
                font: "#3599B8",
              },
            })}
            options={[
              { value: "get_healthy", label: "Get Healthy" },
              { value: "lose_fat", label: "Lose Fat" },
              { value: "gain_weight", label: "Gain Weight" },
              { value: "gain_muscle", label: "Gain Muscle" },
            ]}
          />
          <small className='form-text'>What Is Your Goal?</small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x' />
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                onChange={onChangeSocial}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x' />
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                onChange={onChangeSocial}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x' />
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                onChange={onChangeSocial}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x' />
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                onChange={onChangeSocial}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x' />
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                onChange={onChangeSocial}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </section>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);