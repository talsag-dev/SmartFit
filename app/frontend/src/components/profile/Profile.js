import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import { getProfileById } from "../../actions/profile";

const Profile = ({ getProfileById, profile:{profile},auth:{user}}) => {
  const { id } = useParams();
  useEffect(() => {
    getProfileById(id);

  }, [getProfileById, id]);

  return (
    <section className='container'>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='profile-grid my-1'>
            <ProfileTop user={user} profile={profile}/>
            <ProfileAbout user={user} profile={profile}/>
          </div>
        </Fragment>
      )}
    </section>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);