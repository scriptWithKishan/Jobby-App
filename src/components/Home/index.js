import Header from '../Header'
import './index.css'

const Home = props => {
  const moveToJobs = () => {
    const {history} = props

    history.push('/jobs')
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-card">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your ability and potential.
          </p>
          <button onClick={moveToJobs} className="find-job-btn" type="button">
            Find Jobs
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
