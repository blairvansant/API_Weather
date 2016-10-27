"use strict";


let apiKeys = {};

let imageList = (searchText) => {
  return new Promise ((resolve, reject) => {
    $.ajax({
      method: 'GET',
      url: 'apiKeys.json'
    }).then((response) => {
    	console.log(response);
      apiKeys = response;
      let authHeader =  apiKeys.api_key	;
      $.ajax({
        method: 'GET',
      

        url: `http://api.openweathermap.org/data/2.5/weather?zip=${searchText}&units=imperial&APPID=${authHeader}`
      }).then((response2)=>{
      	console.log("response2", response2);
        resolve(response2);
      }, (errorResponse2) => {
        reject(errorResponse2);
      });
    }, (errorResponse) =>{
      reject(errorResponse);
    });
  });
};



$(document).ready(function() {
  $('#clicky-button').on('click', ()=> {
    $('#clicky-button').button('loading');
    $('#output').html("");
    let searchy = $('#imgur-search').val();
    console.log('its working', searchy);
    imageList(searchy).then((dataFromImgur)=>{
      $('#clicky-button').button('reset');
      console.log('dataFromImgur', dataFromImgur);
        $('#output').append(`<div>Your Zipcode: ${dataFromImgur.name}</div>
        	<div>Your current temperature: ${dataFromImgur.main.temp}</div>
        	<div>Your current conditions: ${dataFromImgur.weather[0].description}</div>
        	<div>Your current air pressure: ${dataFromImgur.main.pressure}</div>
        	<div>Your current wind speed: ${dataFromImgur.wind.speed}</div>`);
    });
  });

});
