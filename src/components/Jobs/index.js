import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoIosSearch} from 'react-icons/io'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobsFilter from '../JobsFilter'
import Profile from '../Profile'
import Job from '../Job'

import './index.css'

const jobsStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    apiStatus: jobsStatus.loading,
    selectedEmploymentType: '',
    minimumPackage: '',
    searchField: '',
    searchContent: '',
    jobsList: [],
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  reloadBtn = () => {
    this.getJobsDetails()
  }

  onSuccess = jobs => {
    const updatedJobs = jobs.map(eachEle => ({
      companyLogoUrl: eachEle.company_logo_url,
      employmentType: eachEle.employment_type,
      jobDescription: eachEle.job_description,
      packagePerAnnum: eachEle.package_per_annum,
      id: eachEle.id,
      location: eachEle.location,
      rating: eachEle.rating,
      title: eachEle.title,
    }))

    this.setState({
      jobsList: updatedJobs,
      apiStatus: jobsStatus.success,
    })
  }

  onFailure = () => {
    this.setState({
      apiStatus: jobsStatus.failure,
    })
  }

  getJobsDetails = async () => {
    const {selectedEmploymentType, minimumPackage, searchField} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs?employment_type=${selectedEmploymentType}&minimum_package=${minimumPackage}&search=${searchField}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSuccess(data.jobs)
    } else {
      this.onFailure()
    }
  }

  onFilterEmployment = value => {
    const {selectedEmploymentType} = this.state
    const typesArray = selectedEmploymentType
      ? selectedEmploymentType.split(',')
      : []
    if (typesArray.includes(value)) {
      const updatedArray = typesArray.filter(type => type !== value)
      this.setState(
        {selectedEmploymentType: updatedArray.join(',')},
        this.getJobsDetails,
      )
    } else {
      typesArray.push(value)
      this.setState(
        {selectedEmploymentType: typesArray.join(',')},
        this.getJobsDetails,
      )
    }
  }

  onFilterSalary = value => {
    this.setState(
      {
        minimumPackage: value,
      },
      this.getJobsDetails,
    )
  }

  selectEmployment = event => {
    this.onFilterEmployment(event.target.value)
  }

  selectSalary = event => {
    this.onFilterSalary(event.target.value)
  }

  searchEntry = event => {
    this.setState({
      searchContent: event.target.value,
    })
  }

  searchJobs = () => {
    const {searchContent} = this.state

    this.setState(
      {
        searchField: searchContent,
      },
      this.getJobsDetails,
    )
  }

  renderSuccess() {
    const {jobsList} = this.state

    if (jobsList.length === 0) {
      return (
        <div className="jobs-empty-container">
          <img
            className="jobs-empty-img"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h2 className="jobs-empty">No Jobs Found</h2>
          <p className="jobs-empty-description">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }
    return (
      <ul className="jobs-list">
        {jobsList.map(eachEle => (
          <Job key={eachEle.id} jobDetails={eachEle} />
        ))}
      </ul>
    )
  }

  renderLoading() {
    const {searchContent} = this.state

    return (
      <div className="job-details-container-loader">
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      </div>
    )
  }

  renderFailure() {
    return (
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
    )
  }

  renderSwitch() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case jobsStatus.loading:
        return this.renderLoading()
      case jobsStatus.success:
        return this.renderSuccess()
      case jobsStatus.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {searchContent} = this.state

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="profile-filter-container">
            <div className="search-field-sm">
              <input
                className="search-input-sm"
                type="search"
                value={searchContent}
                placeholder="Search"
                onChange={this.searchEntry}
              />
              <button
                aria-label="Logout"
                className="seach-btn-sm"
                type="button"
                onClick={this.searchJobs}
                data-testid="searchButton"
              >
                <IoIosSearch className="search-logo" />
              </button>
            </div>
            <Profile />
            <div className="filter-card">
              <h1 className="filter-type">Type of Employment</h1>
              <ul className="filter-list">
                {employmentTypesList.map(eachEle => (
                  <li key={eachEle.employmentTypeId}>
                    <input
                      onChange={this.selectEmployment}
                      type="checkbox"
                      value={eachEle.employmentTypeId}
                    />
                    <label className="filter-label">{eachEle.label}</label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="filter-card">
              <h1 className="filter-type">Salary Range</h1>
              <ul className="filter-list">
                {salaryRangesList.map(eachEle => (
                  <li key={eachEle.salaryRangeId}>
                    <input
                      onChange={this.selectSalary}
                      type="radio"
                      name="salary"
                      value={eachEle.salaryRangeId}
                    />
                    <label className="filter-label">{eachEle.label}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="job-list-container">
            <div className="search-field-lg">
              <input
                className="search-input-lg"
                type="search"
                value={searchContent}
                onChange={this.searchEntry}
                placeholder="Search"
              />
              <button
                aria-label="Logout"
                className="search-btn-lg"
                type="button"
                onClick={this.searchJobs}
                data-testid="searchButton"
              >
                <IoIosSearch className="search-logo" />
              </button>
            </div>
            {this.renderSwitch()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
