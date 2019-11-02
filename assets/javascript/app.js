// Stock market summary

function displaySummary() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary?region=US&lang=en",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key": "d4f983eb80msha2a2ec7abf9e9f1p1ae353jsnd376774df4a6"
        }
    }

    $.ajax(settings).done(function (response) {

        var tbl = $("<table>");
        tbl.attr("class", "tableClass")
        var t_row = ($("<tr id=totop>"));

        for (var i = 0; i < 6; i++) {
            var indexName = response.marketSummaryResponse.result[i].shortName;
            t_row.append($("<td>").text(indexName).attr("class", "firstRowClass"));
        }

        tbl.append(t_row);
        t_row = ($("<tr id=secondrow>"));

        for (var i = 0; i < 6; i++) {
            var indexPrice = response.marketSummaryResponse.result[i].regularMarketPrice.fmt;
            t_row.append($("<td>").text(indexPrice).attr("class", "secondRowClass"));
        }

        tbl.append(t_row);
        t_row = ($("<tr id=thirdrow>"));

        for (var i = 0; i < 6; i++) {
            var indexPreviousClose = response.marketSummaryResponse.result[i].regularMarketPreviousClose.fmt;
            t_row.append($("<td>").text(indexPreviousClose).attr("class", "thirdRowClass"));
        }

        tbl.append(t_row);
        t_row = ($("<tr id=fourrow>"));

        for (var i = 0; i < 6; i++) {
            var indexChange = response.marketSummaryResponse.result[i].regularMarketChange.fmt;
            t_row.append($("<td>").text(indexChange).attr("class", "fourRowClass"));
        }

        tbl.append(t_row);
        t_row = ($("<tr id=fiverow>"));

        for (var i = 0; i < 6; i++) {
            var indexChangePercent = response.marketSummaryResponse.result[i].regularMarketChangePercent.fmt;
            t_row.append($("<td>").text(indexChangePercent).attr("class", "fiveRowClass"));
        }

        tbl.append(t_row);
        $(".marketSum").append(tbl);

    }
    )
}

// Company Summary

function displayStocks() {
    var stocks = $("#search").val().trim();
    var queryURL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + stocks + "&apikey=8MKLVA7WLARZMNWP";

    $.ajax({

        url: queryURL,
        method: "GET"

    }).then(function (response) {

        var company = response['Global Quote'];
        var name = company['01. symbol'];
        var open = company['02. open'];
        var high = company['03. high'];
        var low = company['04. low'];
        var price = company['05. price'];

        var nameDiv = $("<p>").text(name);
        $(".name").prepend(nameDiv);

        var openDiv = $("<p>").text(open);
        $(".open").prepend(openDiv);

        var highDiv = $("<p>").text(high);
        $(".high").prepend(highDiv);

        var lowDiv = $("<p>").text(low);
        $(".low").prepend(lowDiv);

        var priceDiv = $("<p>").text("$" + price);
        $(".price").prepend(priceDiv);
    })
};

// Submit button 

$("#input-stocks").on("click", function (event) {
    event.preventDefault();
    var stocks = $("#search").val().trim();
    displayStocks(stocks);
});

// News

function displayNews() {
    var queryURL = 'https://newsapi.org/v2/top-headlines?' +
        'country=us&category=business&pageSize=5&' + 'apiKey=6a8adef82f2546e38bfe6db61628cb26';

    $.ajax({

        url: queryURL,
        method: "GET"

    }).then(function (response) {

        for (var i = 0; i < response.articles.length; i++) {

            var card = `<div class="col s12 m7">\
            <div class="card horizontal">\
              <div class="card-image">\
                <img src="${response.articles[i].urlToImage}">\
              </div>\
              <div class="card-stacked">\
                <div class="card-content">\
                  <p>${response.articles[i].description}</p>\
                </div>\
                <div class="card-action">\
                  <a href="${response.articles[i].url}">${response.articles[i].title}</a>\
                </div>\
              </div>\
            </div>\
          </div>`

            $("#news").append(card);
        }
    }
    )}

displaySummary()
displayNews()


