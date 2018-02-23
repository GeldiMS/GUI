// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		//this.setState({ display: true });
		var city = this.fetchCity();
		var country = this.fetchCountry();
		//this.fetchWeatherData(city, country);
		this.fetchLocation();
	}

	fetchCountry = () => {
			return "UK";
	}

	fetchCity = () => {
		return "London";
	}

	fetchLocation = () => {
		var url = "http://freegeoip.net/json/";

		$.ajax({
			url: url,
			success : this.parseLocation,
		})
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = (city, country) => {
		// API URL with a structure of : http://api.wunderground.com/api/key/feature/q/country-code/city.json
		//var url = "http://api.wunderground.com/api/ec674d6a9dd3d105/conditions/q/"+country+"/"+city+".json";
		var url = "http://api.wunderground.com/api/ec674d6a9dd3d105/conditions/q/"+country+"/"+city+".json";
		//var url = "http://api.wunderground.com/api/752cc967dcecd4b7/forecast10day/q/CA/San_Francisco.json";
		$.ajax({
			url: url,
			//dataType: "jsonp",
			success : this.parseResponse,
		//	error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	fetchForecast = (city, country) => {
		//var url = "http://api.wunderground.com/api/1aa740d4a691f98e/hourly/q/"+country+"/"+city+".json";
		var url = "http://api.wunderground.com/api/1aa740d4a691f98e/hourly/q/UK/London.json"

		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		const city = this.state.city ? `${style.city}` : style.city;
		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
				  <span class = { style.city } > { this.state.city} </span>
				  <span class = { style.image } > { this.state.image} </span>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
					<div class={ style.hour} >{ this.state.hour} picture { this.state.temp}°C </div>
					<div class={ style.hour} >{ this.state.hour1} picture { this.state.temp1}°C </div>
					<div class={ style.hour} >{ this.state.hour2} picture { this.state.temp2}°C </div>
					<div class={ style.hour} >{ this.state.hour3} picture { this.state.temp3}°C </div>
					<div class={ style.hour} >{ this.state.hour4} picture { this.state.temp4}°C </div>
					<div class={ style.hour} >{ this.state.hour5} picture { this.state.temp5}°C </div>
					<div class={ style.hour} >{ this.state.hour6} picture { this.state.temp6}°C </div>
					<div class={ style.hour} >{ this.state.hour7} picture { this.state.temp7}°C </div>
					<div class={ style.hour} >{ this.state.hour8} picture { this.state.temp8}°C </div>
				</div>
				<div class={ style.details }></div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {

		 var temp_c = parsed_json['current_observation']['temp_c'];
		 var conditions = parsed_json['current_observation']['weather'];

		// set states for fields so they could be rendered later on
		this.setState({
			// locate: location,
		//	date: date,
			temp: temp_c,
		 cond : conditions
		});
	}

	parseResponse = (parsed_json) => {

		var hour = parsed_json['hourly_forecast'][0]['FCTTIME']['civil'];
		var temp = parsed_json['hourly_forecast'][0]['temp']['metric'];
		var hour1 = parsed_json['hourly_forecast'][1]['FCTTIME']['civil'];
		var temp1 = parsed_json['hourly_forecast'][1]['temp']['metric'];
		var hour2 = parsed_json['hourly_forecast'][2]['FCTTIME']['civil'];
		var temp2 = parsed_json['hourly_forecast'][2]['temp']['metric'];
		var hour3 = parsed_json['hourly_forecast'][3]['FCTTIME']['civil'];
		var temp3 = parsed_json['hourly_forecast'][3]['temp']['metric'];
		var hour4 = parsed_json['hourly_forecast'][4]['FCTTIME']['civil'];
		var temp4 = parsed_json['hourly_forecast'][4]['temp']['metric'];
		var hour5 = parsed_json['hourly_forecast'][5]['FCTTIME']['civil'];
		var temp5 = parsed_json['hourly_forecast'][5]['temp']['metric'];
		var hour6 = parsed_json['hourly_forecast'][6]['FCTTIME']['civil'];
		var temp6 = parsed_json['hourly_forecast'][6]['temp']['metric'];
		var hour7 = parsed_json['hourly_forecast'][7]['FCTTIME']['civil'];
		var temp7 = parsed_json['hourly_forecast'][7]['temp']['metric'];
		var hour8 = parsed_json['hourly_forecast'][8]['FCTTIME']['civil'];
		var temp8 = parsed_json['hourly_forecast'][8]['temp']['metric'];

		this.setState({
			hour: hour,
			temp: temp,
			hour1: hour1,
			temp1: temp1,
			hour2: hour2,
			temp2: temp2,
			hour3: hour3,
			temp3: temp3,
			hour4: hour4,
			temp4: temp4,
			hour5: hour5,
			temp5: temp5,
			hour6: hour6,
			temp6: temp6,
			hour7: hour7,
			temp7: temp7,
			hour8: hour8,
			temp8: temp8,

		});
	}

	parseLocation = (parsed_json) => {
		 var country = parsed_json['country_name'];
		 var city = parsed_json['city'];

		 this.fetchWeatherData(city, country);
		 this.fetchForecast(city, country);

		// set states for fields so they could be rendered later on
		this.setState({
			city: city
		});
	}
}
