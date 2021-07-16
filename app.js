// let get = []
// const form = document.querySelector('#form')



// change jquery to JS



$(document).ready(function(){
    //get request to the api
    $('#form').submit(function(event){
        event.preventDefault();
        const ip = $('#ip').val();
        $('#details').empty()
        // $('#map').empty()
        if(ip == ''){
            alert('please enter the ip address')
        }
        const API_KEY = 'at_gXkeuayMluJv1ZoC6QX5fR82tyRxs';
        const url = "https://geo.ipify.org/api/v1?apiKey="+API_KEY+"&ipAddress="+ip;

        $.get(url, function(data){
            
            const countryName = data.location.country
            const city = data.location.city
            const lat = data.location.lat
            const lng = data.location.lng
           
            
            //create object
            const position = {
                lat:lat,
                lng:lng
            }
            console.log(position)

            displayDetails(countryName, city)
            displayMap(position);
        })
    })
    function displayDetails(countryName,city){
        const details = `<h1>${countryName}</h1><br><h2>${city}</h2><br> `;
        $('#details').append(details);
    }
    function displayMap(position){
        const link = `<a href='https://www.google.com/maps/search/?api=1&query=${position.lat},${position.lng}'>Link</a>`
        $('#map').append(link)
        
    }
})
// console.log(position)

const mymap = L.map('mapid').setView([51.505, -0.09], 13);
console.log(mymap)
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicmFpbWlzciIsImEiOiJja3I2cDV5bW8zMjNkMnZwbG4wc2EyMDNxIn0.6zIQyxRDR5YmlRklHSSmJw'
}).addTo(mymap);