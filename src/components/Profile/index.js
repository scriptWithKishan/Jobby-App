import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const profileStatus = {
  sucess: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Profile extends Component {
  state = {
    apiStatus: profileStatus.loading,
    profileDetails: {},
  }

  componentDidMount() {
    this.getUserProfile()
  }

  reloadBtn = () => {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = {
        profileImageUrl: data.profile_details.profile_image_url,
        name: data.profile_details.name,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        profileDetails: updatedData,
        apiStatus: profileStatus.sucess,
      })
    } else {
      this.setState(profileStatus.failure)
    }
  }

  renderSuccess() {
    const {profileDetails} = this.state

    return (
      <div className="profile-card">
        <img
          className="profile-img"
          src={profileDetails.profileImageUrl}
          alt="profile"
        />
        <p className="profile-name">{profileDetails.name}</p>
        <p className="profile-bio">{profileDetails.shortBio}</p>
      </div>
    )
  }

  renderLoading() {
    const {apiStatus} = this.state

    return (
      <div className="job-details-container-profile-loader">
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      </div>
    )
  }

  renderFailure() {
    return (
      <div className="job-details-failure-profile-container">
        <button
          type="button"
          onClick={this.reloadBtn}
          className="job-details-failure-btn"
        >
          Retry
        </button>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case profileStatus.loading:
        return this.renderLoading()
      case profileStatus.sucess:
        return this.renderSuccess()
      case profileStatus.failure:
        return this.renderFailure()
      default:
        return null
    }
  }
}

export default Profile
