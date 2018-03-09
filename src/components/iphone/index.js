// import preact
import { h, render, Component } from 'preact';
import {API_KEY} from '../../key.js';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

export default class Iphone extends Component {

	// displays the dafault information
	constructor(props){
		super(props);

		this.state.temp = "";
		this.setState({ display: true }); // diplay the general weather information
		this.setState({ display1: true }); // display the hourly forecast
	}

	
	// call the method to get the location
	componentDidMount(){
		this.fetchLocation();
	}
	

	//get the appropriate location of the user using their IP address location
	fetchLocation = () => {
		var url = "http://freegeoip.net/json/";
		setInterval(5000);
		$.ajax({
			url: url,
			success : this.parseLocation,
		})
	}

	
	// a call to fetch weather data via wunderground
	fetchWeatherData = (city, country) => {
		// API URL with a structure of : http://api.wunderground.com/api/key/feature/q/country-code/city.json
		// var url = "http://api.wunderground.com/api/2467e559d13099e5/conditions/q/"+country+"/"+city+".json";
		var url = "http://api.wunderground.com/api/"+API_KEY+"/conditions/q/"+country+"/"+city+".json";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
		})

	}

	// function to fetsh the forcast for the next day or 10 days
	fetchForecast = (city, country, tenDays) => { 
		
		if (tenDays == true) { // if 10 day forecast has been selected
			var url = "http://api.wunderground.com/api/"+API_KEY+"/forecast10day/q/UK/London.json"; // API address of the 10 day forecast
			$.ajax({ // assign values
				url: url,
				dataType: "jsonp",
				success : this.parseForecast10days, // call the 10 day forecast fucntion
			})
			
		} else { // only the day forecast is selected
			
		var url = "http://api.wunderground.com/api/"+API_KEY+"/hourly/q/UK/London.json";
			$.ajax({
				url: url,
				dataType: "jsonp",
				success : this.parseForecast, // call the function for the day forecast
			})
		}
	}

	// when the snow conditions button is pushed
	snowCondButton = () => { 
			if (this.state.display) {  // if the genral weathher conditions are shown
				this.setState({ display: false }); // stop displaying the general weather conditions
			}
			else {
				this.setState({ display: true }); // if not shown then show them
			}

		}

	// when the weekly report button is pushed
	weeklyButton = () => { 
			if (this.state.display1) { // if the hourly weater is shown
				this.setState({ display1: false }); // stop showing the hourly weater conditions
			}
			else { // if not shown
				this.setState({ display1: true }); // show the weather conditions
			}

		}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		const city = this.state.city ? `${style.city}` : style.city; // check if the city data is fetched, if so add it
		const cond = this.state.cond ? `${style.cond}` : style.cond; // check if the condition data is fetched
		//var t = style.hour;
		//var l = style.yourloc;
		
		return ( // display all weather data using a table
			<div class={ style.container }>
			<link href="https://fonts.googleapis.com/css?family=Nanum+Brush+Script" rel="stylesheet"/>
				<div class={ style.header }>
					<span class = {style.yourloc} >Snowy Is Using Your Location </span>
				  	<span class = { style.city } > { this.state.city} </span>
				  	<span class = { style.image } > { this.state.image} </span>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class = {style.locIcon}> <img src = {require('../../assets/icons/location-arrow.png')} /> </span>
					<span class={ tempStyles }>{ this.state.temp }</span>
					<div> {this.state.display ? <div class={ style.cond }> Wind {this.state.wind}kph </div> : <div class={ style.cond }> Snow all day { this.state.allday}cm </div> } </div>
					<div> {this.state.display ? <div class={ style.cond }> Visibility {this.state.visibility}km </div> : <div class={ style.cond }> Snow day { this.state.dayy}cm </div> } </div>
					<div> {this.state.display ? <div class={ style.cond }> Precipitation {this.state.pop}% </div> : <div class={ style.cond }> Snow night { this.state.night}cm </div> } </div>
					<span class = {style.table} > {this.state.table}
					<table>
							<tr><div>_________________</div></tr>
							<tr><th><span class={style.hour} > {this.state.display1 ? <span> { this.state.hour} </span> : <span> {this.state.day} </span> } </span></th><th><span class = {style.img}>{this.state.display1 ? <span> <img src = {this.state.img}/> </span> : <span> <img src = {this.state.icon}/> </span> } </span></th><th><span class = {style.temp}> {this.state.display1 ? <span> { this.state.temp}°C </span> : <span> { this.state.tem}°C </span> } </span></th></tr>
							<tr><div>_________________</div></tr>
							<tr><th><span class={ style.hour} >{this.state.display1 ? <span> { this.state.hour1} </span> : <span> {this.state.day1} </span> }</span></th><th><span class = {style.img}> {this.state.display1 ? <span> <img src = {this.state.img1}/> </span> : <span> <img src = {this.state.icon1}/> </span> }</span></th><th><span class = {style.temp}> {this.state.display1 ? <span> { this.state.temp1}°C </span> : <span> { this.state.tem1}°C </span> } </span></th></tr>
							<tr><div>_________________</div></tr>
							<tr><th><span class={ style.hour} >{this.state.display1 ? <span> { this.state.hour2} </span> : <span> {this.state.day2} </span> }</span></th><th><span class = {style.img}> {this.state.display1 ? <span> <img src = {this.state.img2}/> </span> : <span> <img src = {this.state.icon2}/> </span> }</span></th><th><span class = {style.temp}> {this.state.display1 ? <span> { this.state.temp2}°C </span> : <span> { this.state.tem2}°C </span> } </span></th></tr>
							<tr><div>_________________</div></tr>
							<tr><th><span class={ style.hour} >{this.state.display1 ? <span> { this.state.hour3} </span> : <span> {this.state.day3} </span> }</span></th><th><span class = {style.img}> {this.state.display1 ? <span> <img src = {this.state.img3}/> </span> : <span> <img src = {this.state.icon3}/> </span> }</span></th><th><span class = {style.temp}> {this.state.display1 ? <span> { this.state.temp3}°C </span> : <span> { this.state.tem3}°C </span> } </span></th></tr>
							<tr><div>_________________</div></tr>
							<tr><th><span class={ style.hour} >{this.state.display1 ? <span> { this.state.hour4} </span> : <span> {this.state.day4} </span> }</span></th><th><span class = {style.img}> {this.state.display1 ? <span> <img src = {this.state.img4}/> </span> : <span> <img src = {this.state.icon4}/> </span> }</span></th><th><span class = {style.temp}> {this.state.display1 ? <span> { this.state.temp4}°C </span> : <span> { this.state.tem4}°C </span> } </span></th></tr>
							<tr><div>_________________</div></tr>
							<tr><th><span class={ style.hour} >{this.state.display1 ? <span> { this.state.hour5} </span> : <span> {this.state.day5} </span> }</span></th><th><span class = {style.img}> {this.state.display1 ? <span> <img src = {this.state.img5}/> </span> : <span> <img src = {this.state.icon5}/> </span> }</span></th><th><span class = {style.temp}> {this.state.display1 ? <span> { this.state.temp5}°C </span> : <span> { this.state.tem5}°C </span> } </span></th></tr>
							<tr><div>_________________</div></tr>
							<tr><th><span class={ style.hour} >{this.state.display1 ? <span> { this.state.hour6} </span> : <span> {this.state.day6} </span> }</span></th><th><span class = {style.img}> {this.state.display1 ? <span> <img src = {this.state.img6}/> </span> : <span> <img src = {this.state.icon6}/> </span> }</span></th><th><span class = {style.temp}> {this.state.display1 ? <span> { this.state.temp6}°C </span> : <span> { this.state.tem6}°C </span> } </span></th></tr>
							<tr><div>_________________</div></tr>
					</table>
					</span>
				</div>
				<div class={ style.details }></div>
				<div class={style_iphone.container}>{this.state.display ? <Button class={ style_iphone.button } desc='Snow Conditions' clickFunction={this.snowCondButton}/ > : <Button class={ style_iphone.button } desc='Weather Conditions' clickFunction={this.snowCondButton}/ >} </div> 
				<div class={style_iphone.container}>{this.state.display1 ? <Button class={ style_iphone.button } desc='Weekly Report' clickFunction={this.weeklyButton}/ > : <Button class={ style_iphone.button } desc='Daily Report' clickFunction={this.weeklyButton}/ >} </div> 


		</div>);
		
	}
	//Read more: https://html.com/tags/comment-tag/#ixzz59CUiBlBm

	//get the current general weater information
	parseResponse = (parsed_json) => {

		var temp_c = parsed_json['current_observation']['temp_c']; // current temperature
		var conditions = parsed_json['current_observation']['weather']; // current conditions
		var wind = parsed_json['current_observation']['wind_kph']; // current wind speed
		var visibility = parsed_json['current_observation']['visibility_km']; // current visibility
		
		this.setState({ // set states for fields so they could be rendered later on
			temp: temp_c,
		 	cond : conditions,
			wind: wind,
			visibility: visibility
		});
	}
	
	// get the hourly forcast for the next day
	parseForecast = (parsed_json) => {
		
		var hours = new Array(); // array for all of the times
		var temps = new Array(); // array for all of the temperatures
		var imgs = new Array(); // array of the icons used to show weather status
		
		for (var i=0; i<7; i++) { // loop to assign values to all of the hours, temps and imgs
			hours[i] = parsed_json['hourly_forecast'][i]['FCTTIME']['civil'];
			temps[i] = parsed_json['hourly_forecast'][i]['temp']['metric'];
			imgs[i] = this.checkIcon(parsed_json['hourly_forecast'][i]['icon']);
		}
		
		this.setState({ // sets the state with all of the values from the arrays
			hour: hours[0],
			temp: temps[0],
			img: imgs[0],
			hour1: hours[1],
			temp1: temps[1],
			img1: imgs[1],
			hour2: hours[2],
			temp2: temps[2],
			img2: imgs[2],
			hour3: hours[3],
			temp3: temps[3],
			img3: imgs[3],
			hour4: hours[4],
			temp4: temps[4],
			img4: imgs[4],
			hour5: hours[5],
			temp5: temps[5],
			img5: imgs[5],
			hour6: hours[6],
			temp6: temps[6],
			img6: imgs[6],
		});
	}
	
	// get the weater forcast for the next 10 days
	parseForecast10days = (parsed_json) => {
	
		var allday = parsed_json['forecast']['simpleforecast']['forecastday'][0]['snow_allday']['cm'];  // the snow in cm for the day
		var dayy = parsed_json['forecast']['simpleforecast']['forecastday'][0]['snow_day']['cm']; // the snow in cm now
		var night = parsed_json['forecast']['simpleforecast']['forecastday'][0]['snow_night']['cm']; // the snowfall in cm for night
		var pop = parsed_json['forecast']['txt_forecast']['forecastday'][0]['pop']; // ?????????????

		
		
		var days = new Array(); // array for the day name
		var icons = new Array(); // array of the icon used for each day
		var tempsT = new Array(); // array of the temperatures for each day
		
		for (var i=1; i<8; i++) { // loop to assign all values of the arrays with information from the
			days[i] = parsed_json['forecast']['txt_forecast']['forecastday'][i*2]['title'];
			icons[i] = this.checkIcon(parsed_json['forecast']['txt_forecast']['forecastday'][i*2]['icon']);
			tempsT[i] = parsed_json['forecast']['simpleforecast']['forecastday'][i]['high']['celsius'];
		}
				
		// set states for fields so they could be rendered later on
		this.setState({
			day: days[1],
			day1: days[2],
			day2: days[3],
			day3: days[4],
			day4: days[5],
			day5: days[6],
			day6: days[7],
			icon: icons[1],
			icon1: icons[2],
			icon2: icons[3],
			icon3: icons[4],
			icon4: icons[5],
			icon5: icons[6],
			icon6: icons[7],
			tem: tempsT[1],
			tem1: tempsT[2],
			tem2: tempsT[3],
			tem3: tempsT[4],
			tem4: tempsT[5],
			tem5: tempsT[6],
			tem6: tempsT[7],
			allday: allday,
			dayy: dayy,
			night: night,
			pop: pop
		}); 
	}


	// retrive the location from the location API and get location weather information form the weater API
	parseLocation = (parsed_json) => {
			 var country = parsed_json['country_name']; // get the current country name
			 var city = parsed_json['city']; // get the current city name


			 this.fetchWeatherData(city, country); // get the general data for the countries
			 this.fetchForecast(city, country, false); // for the current day forcast
			 this.fetchForecast(city, country, true); // for the 10 day forecast

			// set states for fields so they could be rendered later on
			this.setState({
				country: country,
				city: city,
			});
		}

	// function to get appropriate condition
	checkIcon = (condition) => {
		var img;
		if(condition == "clear"){ // check to see which weather condition 
			img = "http://i67.tinypic.com/345er9v.jpg";
		}
		else if(condition == "mostlyclear"){
			img = "http://i67.tinypic.com/345er9v.png";
		}
		else if(condition == "chancerain" || condition == "rain"){
			img = "http://i64.tinypic.com/10h4xfm.png";
		}
		else if(condition == "cloudy"){
			img = "http://i66.tinypic.com/axnxvt.png";
		}
		else if(condition == "partlycloudy"){
			img = "http://i68.tinypic.com/2rn7z8k.png";
		}
		else if(condition == "mostlycloudy"){
			img = "http://i64.tinypic.com/34rvndc.png";
		}
		else if(condition == "snow"){
			img = "http://i63.tinypic.com/11wgeo4.png";
		}
		else if(condition == "fog"){
			img = "http://i66.tinypic.com/5x5wjr.png";
		}
		return img; // return the appropriate image
	}
}
