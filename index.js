// var API = require('indian-stock-exchange');
var express = require("express");
const cors = require('cors')
var NSEAPI = require('./nse/index');
const PORT = process.env.PORT || 5000;

var app = express();

app.use(cors())

// National Stock Exchange (NSE) APIS

// Get the stock market status (open/closed) - JSON
// Example: http://localhost:3000/get_market_status
app.get("/get_market_status", (req, res, next) => {
	NSEAPI.getMarketStatus()
		.then(function (response) {
			res.json(response.data);
			// console.log(response.data);
		});
});

// Get the NSE indexes information (last updated, name, previous close, open, low, high, last, percent change, year high and low, index order) - JSON
// Example: http://localhost:3000/get_indices
app.get("/get_indices", (req, res, next) => {
	NSEAPI.getIndices()
		.then(function (response) {
			res.json(response.data);
		});
});

// Get the quotes of all indexes in NSE - HTML
// Example: http://localhost:3000/get_quotes
app.get("/get_quotes", (req, res, next) => {
	NSEAPI.getQuotes()
		.then(function (response) {
			res.json(response.data);
		});
});

// Get the quotation data of the symbol (companyName) from NSE - JSON
// Example: http://localhost:3000/get_quote_info?companyName=TCS
app.get("/get_quote_info", (req, res, next) => {
	NSEAPI.getQuoteInfo(req.query.companyName)
		.then(function (response) {
			res.json(response.data);
		});
});

// Get the quotation data of the symbols (companyNames) from NSE - JSON
// Example: http://localhost:3000/get_multiple_quote_info?companyNames=TCS,WIPRO
app.get("/get_multiple_quote_info", (req, res, next) => {
	const companyNames = req.query.companyNames.split(",");
	NSEAPI.getMultipleQuoteInfo(companyNames).then(r => res.json(r));
});

// Get the top 10 gainers of NSE - JSON
// Example: http://localhost:3000/get_gainers
app.get("/get_gainers", (req, res, next) => {
	NSEAPI.getGainers()
		.then(function (response) {
			res.send(response.data)
		});
});

// Get the top 10 losers of NSE - JSON
// Example: http://localhost:3000/get_losers
app.get("/get_losers", (req, res, next) => {
	NSEAPI.getLosers()
		.then(function (response) {
			res.json(response.data);
		});
});

// Get advances/declines of individual index, and the value if its changed or not - JSON
// Example: http://localhost:3000/get_incline_decline
app.get("/get_incline_decline", (req, res, next) => {
	NSEAPI.getInclineDecline()
		.then(function (response) {
			res.json(response.data);
		});
});

// Get the information of all the companies in a single NSE index (slug) JSON
// Example: http://localhost:3000/get_index_stocks?symbol=nifty
app.get("/get_index_stocks", (req, res, next) => {
	NSEAPI.getIndexStocks(req.query.symbol)
		.then(function (response) {
			res.json(response.data);
		});
});

// Get the list of companies in provided NSE index with matching keyword data - JSON
// Example: http://localhost:3000/search_stocks?keyword=AXIS
app.get("/search_stocks", (req, res, next) => {
	NSEAPI.searchStocks(req.query.keyword)
		.then(function (response) {
			res.json(response.data);
		});
});

// Get the intra day data of company in NSE - XML
// Example: http://localhost:3000/get_intra_day_data?companyName=TCS&time=1
// Example: http://localhost:3000/get_intra_day_data?companyName=TCS&time=month
app.get("/get_intra_day_data", (req, res, next) => {
	NSEAPI.getIntraDayData(req.query.companyName, req.query.time)
		.then(function (response) {
			res.json(response.data);
		});
});

// Get 52 weeks all high stocks in NSE - JSON
// Example: http://localhost:3000/get_52_week_high
app.get("/get_52_week_high", (req, res, next) => {
	NSEAPI.get52WeekHigh()
		.then(function (response) {
			res.json(response.data);
		});
});

// Get 52 weeks all low stocks in NSE - JSON
// Example: http://localhost:3000/get_52_week_low
// app.get("/get_52_week_low", (req, res, next) => {
// 	NSEAPI.get52WeekLow()
// 		.then(function (response) {
// 			res.json(response.data);
// 		});
// });

// Get the NSE stocks whose values are highest - JSON
// Example: http://localhost:3000/get_top_value_stocks
app.get("/get_top_value_stocks", (req, res, next) => {
	NSEAPI.getTopValueStocks()
		.then(function (response) {
			res.json(response.data);
		});
});

// Get the NSE stocks whose volumes sold are highest - JSON
// Example: http://localhost:3000/get_top_volume_stocks
app.get("/get_top_volume_stocks", (req, res, next) => {
	NSEAPI.getTopVolumeStocks()
		.then(function (response) {
			res.json(response.data);
		});
});

// Get the futures data for a company stock (symbol) and time - JSON
// Example: http://localhost:3000/get_stock_futures_data?companyName=TCS&time=15
// Example: http://localhost:3000/get_stock_futures_data?companyName=VEDL&time=month
app.get("/get_stock_futures_data", (req, res, next) => {
	NSEAPI.getStockFuturesData(req.query.companyName, req.query.time)
		.then(function (response) {
			res.json(response.data);
		});
});

// Get chart data of a companyName(symbol) depending on time in NSE - CSV Format (delimiter - |)
// Example: http://localhost:3000/get_chart_data_new?companyName=VEDL&time=5
// Example: http://localhost:3000/get_chart_data_new?companyName=VEDL&time=year
app.get("/get_chart_data_new", (req, res, next) => {
	NSEAPI.getChartDataNew(req.query.companyName, req.query.time)
		.then(function (response) {
			res.json(response.data);
		});
});

app.get('/', (req, res) => {
	res.send(`listening to port ${PORT}`)
})


app.listen(PORT, () => {
	console.log("Server running on port " + PORT);
});