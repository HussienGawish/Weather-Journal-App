/* Global Variables */

const host = "http://localhost:8080"
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=`;
const apiKey = ',&appid=532e8cd0bae4295deb0d21f19d769f79&units=metric';

// Event listener to add function to existing HTML DOM element
/* Function called by event listener */
const generate = document.getElementById("generate");
const generateAction = ()=>{
    const zip = document.getElementById("zip").value;
    const content = document.getElementById("feelings").value;
    const url = baseURL+zip+apiKey
    getWeData(url).then((data)=>{
        const entry = {
            date: newDate,
            temp: temp,
            content: content,
        }
        postData('/add',entry ).then((data)=>{
            updateUI();
        })
        });
    };
generate.addEventListener("click",generateAction);
/* Function to GET Web API Data*/
const getWeData = async (url)=>{
    const res = await fetch(url);  
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    };
};

/* Function to POST data */
const postData = async (url='', data = {}) => {
    const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    });
    try {
        const newData = await res.json();
        return newData
    } catch (error) {
        console.log(error);
    }
};

/* Function to GET Project Data */
const updateUI = async()=>{
    const req = await fetch('/all');
    getWeData('/all')
    try {
        const newData = await req.json();
        document.getElementById("date").innerHTML = newData.date
        document.getElementById("temp").innerHTML = newData.temp
        document.getElementById("content").innerHTML = newData.content
    } catch (error) {
        console.log(error);
    };
};