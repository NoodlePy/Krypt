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

function calcTotalPrice(array){
    var val = 0
    for (var key in array){
        val += parseFloat(array[key])
    }
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
                    prices[key] = parseFloat(prices[key]).toFixed(1);
                }
            }

            console.log(prices);
            calcTotalPrice(prices)
            createChart(prices,"Price Distribution ($)", "priceDistribution")
        } else {
            // Request failed
            console.error('Request failed:', request.status, request.statusText);
        }
        }
    };

    request.send(JSON.stringify(assets))
}

