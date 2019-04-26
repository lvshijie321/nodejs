// npm i -S cookie-parser

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser())

// /lvyou?city=上海
app.get("/lvyou", (req, res) => {
  const visitedCityList = req.cookies.visitedCityList  ? req.cookies.visitedCityList.split(';') : []
  req.query.city && !visitedCityList.includes(req.query.city) && visitedCityList.push(req.query.city)
  res.cookie('visitedCityList', visitedCityList.join(';'))
  res.send(JSON.stringify(visitedCityList));
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
