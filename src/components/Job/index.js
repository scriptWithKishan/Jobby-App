import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const Job = props => {
  const {jobDetails} = props
  const {
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    id,
    location,
    rating,
  } = jobDetails

  return (
    <Link className="each-job-link" to={`/jobs/${id}`}>
      <li className="each-job">
        <div className="job-company-container">
          <img
            className="each-job-img"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div className="job-name-container">
            <h3 className="each-job-name">{title}</h3>
            <div className="job-rating-container">
              <FaStar className="job-star-icon" />
              <p className="each-job-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-location-container">
          <div className="job-type-container">
            <MdLocationOn className="job-type-icon" />
            <p className="each-job-type">{location}</p>
            <BsBriefcaseFill className="job-type-icon" />
            <p className="each-job-type">{employmentType}</p>
          </div>
          <p className="each-job-package">{packagePerAnnum}</p>
        </div>
        <hr />
        <div className="job-description-container">
          <p className="job-description">Description</p>
          <p className="each-job-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default Job
