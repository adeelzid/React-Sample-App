import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Moment from 'moment';
import {jQuery} from 'jquery';
import SkyLight from 'react-skylight';

export class App extends Component {
   
   constructor(props){
		super(props);
		this.state = {
        	people:[],
			peopleRes:[],
			planetInfo:[]
        };
		
		this.handleClick = this.handleClick.bind(this);		
	}
	
	componentDidMount(){
		const {overlayloader} = this.refs
		var xhrPeople = new XMLHttpRequest();
		xhrPeople.open('get', `https://swapi.co/api/people`, true);
		xhrPeople.onload = function() {
		  overlayloader.style.display = 'none';
		  var dataPeople = JSON.parse(xhrPeople.responseText);
		  this.setState({ people: dataPeople });
		  this.setState({ peopleRes: dataPeople.results });
		  console.log(dataPeople);
		}.bind(this);
		xhrPeople.send();
	}
	
	componentWillMount(){
		
	}
	
	handleClick(event, apiURL) {
		const {overlayloader, getPlanetDetailPop} = this.refs
		overlayloader.style.display = 'block';
		var xhrPlanet = new XMLHttpRequest();
		xhrPlanet.open('get', `${apiURL}`, true);
		xhrPlanet.onload = function() {
		  overlayloader.style.display = 'none';
		  getPlanetDetailPop.show();
		  var dataPlanet = JSON.parse(xhrPlanet.responseText);
		  this.setState({ planetInfo: dataPlanet });
		  //console.log(dataPlanet);
		}.bind(this);
		xhrPlanet.send();
	}
   
   render() {
	   var editProfileDialog = {
		  width: '50%',
		  height: '200px',
		  left: '50%',
		  margin: '-250px 0 0 -25%'
		};
      return (
         <div>
            <div className="overlay-loader" id="overlayloader" ref="overlayloader"></div>
			<div className="container-fluid">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<h1>People List</h1>
							<table className="table table-bordered">
								<thead>
								  <tr>
									<th>Name</th>
									<th>Height</th>
									<th>Mass</th>
									<th>Created</th>
									<th>Edited</th>
									<th>Planet</th>
								  </tr>
								</thead>
								<tbody>
								  {											
									this.state.peopleRes.map((row, i) => 
									  <tr key={i}>
										<td>{row.name}</td>
										<td>{row.height}</td>
										<td>{row.mass}</td>
										<td>{Moment(row.created).format('DD MMM, YYYY')}</td>
										<td>{Moment(row.edited).format('DD MMM, YYYY')}</td>
										<td><button onClick={ (e) => this.handleClick(e, row.homeworld) } className="btn btn-info">View</button></td>
									  </tr>
									)
								   }
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			
			<SkyLight dialogStyles={editProfileDialog} hideOnOverlayClicked ref="getPlanetDetailPop" title="Planet Detail">
			  <div className="vex-dialog-input">
				<div className="dialog-body">
					<table className="table table-bordered">
						<thead>
						  <tr>
							<th>Name</th>
							<th>Diameter</th>
							<th>Climate</th>
							<th>Population</th>
						  </tr>
						</thead>
						<tbody>
						  <tr>
							<td>{this.state.planetInfo.name}</td>
							<td>{this.state.planetInfo.diameter}</td>
							<td>{this.state.planetInfo.climate}</td>
							<td>{this.state.planetInfo.population}</td>
						  </tr>
						</tbody>
					</table>
				</div>
			  </div>
			</SkyLight>
			
         </div>
      );
   }
}

export default App;