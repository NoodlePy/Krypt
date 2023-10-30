function fetchCryptoDataBySymbol(symbol , name) {
    return new Promise((resolve, reject) => {
        // First, fetch the list of cryptocurrencies to find the ID associated with the symbol
        fetch('https://api.coingecko.com/api/v3/coins/list')
            .then(response => response.json())
            .then(data => {
                const cryptoList = data;
                // Find the ID associated with the provided symbol
                const cryptocurrency = cryptoList.find(crypto => crypto.symbol === symbol.toLowerCase());
                if (cryptocurrency) {
                    const cryptocurrencyId = cryptocurrency.id;
                    // Use the obtained ID to fetch historical data
                    const apiUrl = `https://api.coingecko.com/api/v3/coins/${cryptocurrencyId}/market_chart?vs_currency=usd&days=7`;
                    // Fetch and process data as shown in previous examples
                    fetch(apiUrl)
                        .then(response => response.json())
                        .then(data => {
                            // Extract and return the historical price data
                            const prices = data.prices; // An array of [timestamp, price] pairs
                            const timeLabels = prices.map(item => new Date(item[0]));

                            // Extract prices from the data
                            const priceData = prices.map(item => item[1]);
                            const ctx = document.getElementById(name).getContext('2d');
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: timeLabels,
                        datasets: [{
                            label: `${symbol} Price (USD)`,
                            data: priceData,
                            borderColor: '#fca311',
                            fill: false,
                        }]
                    },
                    options: {
                        scales: {
                            x: [{
                                type: 'time',
                                time: {
                                    unit: 'day'
                                }
                            }],
                            y: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Price (USD)'
                                }
                            }]
                        }
                    }
                });
                        })
                        .catch(error => {
                            reject(error);
                        });
                } else {
                    reject('Cryptocurrency not found.');
                }
            })
            .catch(error => {
                reject('Error fetching cryptocurrency list:', error);
            });
    });
}

function createChart(array, title, container_id){
    const dataPoints = [];
    for (const key in array) {
        if (array.hasOwnProperty(key)) {
            dataPoints.push({ label: key, y: parseFloat(array[key]) });
        }
    }
    // Specify the chart configuration
    const chart = new CanvasJS.Chart(container_id, {
        animationEnabled: true,
        title: {
            text: title,
            fontColor: "#FCA311",
            fontFamily: 'Rajdhani, monospace'
        },
        backgroundColor: "black",
        legend: {
            fontColor: "#FCA311", // Set legend font color to #FCA311
            fontFamily: 'Rajdhani, monospace'
        },
        data: [{
            type: "pie",
            showInLegend: true,
            legendText: "{label}",
            indexLabel: "{label} - #percent%",
            dataPoints: dataPoints,
            indexLabelFontColor: "#FCA311", // Set data labels' text color to #FCA311
            indexLabelFontFamily: 'Rajdhani, monospace'
        }]
    });
    // Render the chart
    chart.render();
}

function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

function calcTotalPrice(array){
    var val = 0
    for (var key in array){
        val += parseFloat(array[key])
    }
    val = parseFloat(val).toFixed(2);
    console.log(val)
    const t_span =  document.getElementById("t_span")
    var val_text = "$"+val
    t_span.textContent = val_text
}

window.onload = function(){

    const assets = {};
    Object.keys(localStorage).forEach(key => {
        assets[key] = localStorage.getItem(key)
    });    

    createChart(assets, "Asset Distribution", "assetDistribution")
    const request = new XMLHttpRequest();

    request.open('POST', `http://localhost:5500/process`, true);
    request.setRequestHeader('Content-Type', 'application/json');
    // Define a callback function to handle the response from the server
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
        if (request.status === 200) {
            const prices = JSON.parse(request.responseText)
            
            for (const key in prices) {
                if (prices.hasOwnProperty(key)) {
                    prices[key] = parseFloat(prices[key]).toFixed(2);
                }
            }

            console.log(prices);
            calcTotalPrice(prices)
            createChart(prices,"Price Distribution ($)", "priceDistribution")



            for (const key in prices){
                const new_p = document.createElement("p")
                document.getElementById("prices").appendChild(new_p)
                new_p.classList.add("dashboard_heading")
                new_p.textContent = key+": "
                const new_span = document.createElement("span")
                new_p.appendChild(new_span)
                new_span.setAttribute("style","color: #fca311")
                new_span.textContent = "$"+prices[key]
                new_p.setAttribute("style", "margin-bottom: -4.5vh")

                const chart_canvas = document.createElement("canvas")
                chart_canvas.width = 800
                chart_canvas.height = 400
                
                document.getElementById("crypto_chart_div").appendChild(chart_canvas)
                
                chart_canvas.id = key
                fetchCryptoDataBySymbol(key,key)
            }

            
        } else {
            // Request failed
            console.error('Request failed:', request.status, request.statusText);
        }
        }
    };

    request.send(JSON.stringify(assets))
}

