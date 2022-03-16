/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ',&appid=532e8cd0bae4295deb0d21f19d769f79&units=metric';

// Event listener to add function to existing HTML DOM element
const generate = document.getElementById("generate");
generate.addEventListener("click",generateAction);

/* Function called by event listener */
function generateAction (){
    const zipCode = document.getElementById("zip").value;
    const feeling = document.getElementById("feelings").value;
    getWeData(baseURL,zipCode,apiKey).then((data)=>{
        postData('/add', {temperature: data.main.temp, date: newDate, feelings: feeling});
        updateUI('/all');
    })
};
/* Function to GET Web API Data*/
const getWeData = async (baseURL,zipCode,apiKey)=>{
    const res = await fetch(baseURL+zipCode+apiKey)
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("error",error);
    };
};

/* Function to POST data */
const postData = async ( url = "", data = {})=>{
    const res = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    });
    try {
        const newData = await res.json();
        return newData
    } catch (error) {
        console.log("error", error);
    }
};

/* Function to GET Project Data */
const updateUI = async(url='')=>{
    const req = await fetch(url='');
    try {
        const newData2 = await req.json();
        document.getElementById("date").innerHTML = newData2.newDate
        document.getElementById("temp").innerHTML = newData2.temperature
        document.getElementById("content").innerHTML = newData2.feelings
    } catch (error) {
        console.log("error", error);
    }
};