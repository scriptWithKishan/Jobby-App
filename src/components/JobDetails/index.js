import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const jobDetailStatus = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    eachJobDetails: {},
    apiStatus: jobDetailStatus.loading,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  reloadBtn = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          jobDescription: data.job_details.job_description,
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          skills: data.job_details.skills.map(eachEle => ({
            name: eachEle.name,
            imageUrl: eachEle.image_url,
          })),
          title: data.job_details.title,
        },
        similarJobs: data.similar_jobs.map(eachEle => ({
          companyLogoUrl: eachEle.company_logo_url,
          employmentType: eachEle.employment_type,
          jobDescription: eachEle.job_description,
          location: eachEle.location,
          rating: eachEle.rating,
          title: eachEle.title,
          id: eachEle.id,
        })),
      }

      this.setState({
        eachJobDetails: updatedData,
        apiStatus: jobDetailStatus.success,
      })
    } else {
      this.setState({
        apiStatus: jobDetailStatus.failure,
      })
    }
  }

  renderSuccess() {
    const {eachJobDetails} = this.state
    const {jobDetails, similarJobs} = eachJobDetails

    return (
      <>
        <Header />
        <div className="job-details-container">
          <div className="job-details-card">
            <div className="job-details-name-container">
              <img
                className="job-details-img"
                src={jobDetails.companyLogoUrl}
                alt="job details company logo"
              />
              <div className="job-details-title-card">
                <h3 className="job-details-title">{jobDetails.title}</h3>
                <div className="job-details-rating-card">
                  <FaStar className="job-details-star-icon" />
                  <p className="job-details-rating">{jobDetails.rating}</p>
                </div>
              </div>
            </div>
            <div className="job-details-type-card">
              <div className="job-details-location-card">
                <MdLocationOn className="job-details-icon" />
                <p className="job-details-type">{jobDetails.location}</p>
                <BsBriefcaseFill className="job-details-icon" />
                <p className="job-details-type">{jobDetails.employmentType}</p>
              </div>
              <div>
                <p className="job-details-salary">
                  {jobDetails.packagePerAnnum}
                </p>
              </div>
            </div>
            <hr />
            <div className="job-details-description-container">
              <h3 className="job-details-description">Description</h3>
              <a
                className="job-details-company-link"
                href={jobDetails.companyWebsiteUrl}
              >
                Visit <FaExternalLinkAlt />
              </a>
            </div>
            <p className="job-details-description-content">
              {jobDetails.jobDescription}
            </p>
            <h3 className="job-details-skills">Skills</h3>
            <ul className="job-details-skills-list">
              {jobDetails.skills.map(eachEle => (
                <li className="job-details-skill-item" key={eachEle.name}>
                  <img
                    className="job-deatils-skill-img"
                    src={eachEle.imageUrl}
                    alt={eachEle.name}
                  />
                  <p className="job-details-skill-name">{eachEle.name}</p>
                </li>
              ))}
            </ul>
            <h3 className="job-details-life">Life at Company</h3>
            <div className="job-details-life-container">
              <p className="job-details-life-description">
                {jobDetails.lifeAtCompany.description}
              </p>
              <img
                className="job-details-life-img"
                src={jobDetails.lifeAtCompany.imageUrl}
                alt="life at company"
              />
            </div>
          </div>
          <h2 className="job-details-similar">Similar Jobs</h2>
          <ul className="job-details-similar-list">
            {similarJobs.map(eachEle => (
              <li className="job-details-similar-item" key={eachEle.id}>
                <div className="job-details-name-container">
                  <img
                    className="job-details-img"
                    src={eachEle.companyLogoUrl}
                    alt="similar job company logo"
                  />
                  <div className="job-details-title-card">
                    <h3 className="job-details-title">{eachEle.title}</h3>
                    <div className="job-details-rating-card">
                      <FaStar className="job-details-star-icon" />
                      <p className="job-details-rating">{eachEle.rating}</p>
                    </div>
                  </div>
                </div>
                <h3 className="job-details-description">Description</h3>
                <p className="job-details-description-content">
                  {jobDetails.jobDescription}
                </p>
                <div className="job-details-location-card">
                  <MdLocationOn className="job-details-icon" />
                  <p className="job-details-type">{jobDetails.location}</p>
                  <BsBriefcaseFill className="job-details-icon" />
                  <p className="job-details-type">
                    {jobDetails.employmentType}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoading() {
    const {apiStatus} = this.state

    return (
      <>
        <Header />
        <div className="job-details-container-loader">
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        </div>
      </>
    )
  }

  renderFailure() {
    const {apiStatus} = this.state

    return (
      <>
        <Header />
        <div className="job-details-failure-container">
          <img
            className="job-deatils-failure-img"
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
          />
          <h2 className="job-details-failure">Oops! Something Went Wrong</h2>
          <p className="job-details-failure-description">
            We cannot seem to find the page you are looking for.
          </p>
          <button
            type="button"
            onClick={this.reloadBtn}
            className="job-details-failure-btn"
          >
            Retry
          </button>
        </div>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case jobDetailStatus.success:
        return this.renderSuccess()
      case jobDetailStatus.loading:
        return this.renderLoading()
      case jobDetailStatus.failure:
        return this.renderFailure()
      default:
        return null
    }
  }
}

export default JobDetails
