const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express(); // New instance of express

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res) {
  const countryQ = req.body.countryName;
  const query = countryQ.replace(" ", "%20"); //replace spaces with %20
  const apiKey = process.env.API_KEY;
  const rapidApiHost = "covid-19-data.p.rapidapi.com"

  const options = {
    "method": "GET",
    "hostname": "covid-19-data.p.rapidapi.com",
    "port": null,
    "path": "/country?name=" + query,
    "headers": {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
      "useQueryString": true
    }
  };

  const request = https.get(options, function(response) {

    response.on("data", function(data) {

      const covidData = JSON.parse(data);
      const country = covidData[0].country;
      const confirmed = covidData[0].confirmed;
      const recovered = covidData[0].recovered;
      const critical = covidData[0].critical;
      const deaths = covidData[0].deaths;

      console.log(response);

        res.render("index", {
          location: country,
          confirm: confirmed,
          recover: recovered,
          crit: critical,
          fatal: deaths
        });

    })

  })


})


app.listen(port, function() {
  console.log("Server is now running on port 3000...")
})
