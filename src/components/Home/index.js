// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {isLoading: true, teamsData: []}

  componentDidMount() {
    this.getTeamsData()
  }

  getTeamsData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const fetchdata = await response.json()
    console.log(fetchdata)
    const updatedData = fetchdata.teams.map(eachItem => ({
      name: eachItem.name,
      imageUrl: eachItem.team_image_url,
      id: eachItem.id,
    }))
    this.setState({teamsData: updatedData, isLoading: false})
  }

  renderTeamList = () => {
    const {teamsData} = this.state

    return (
      <ul className="list-container">
        {teamsData.map(team => (
          <TeamCard key={team.id} teamData={team} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
   <div testid="loader" className="loader-container">
      <Loader type="Rings" color="#00BFFF" height={80} width={80} />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="app-container">
        <div className="heading-section">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png "
            className="logo"
            alt="ipl logo"
          />
          <h1 className="heading">IPL Dashboard</h1>
        </div>
        {isLoading ? this.Loaderrender() : this.renderTeamList()}
      </div>
    )
  }
}
export default Home
