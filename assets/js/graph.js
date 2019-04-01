// To load the content from winedata.csv we use the queue.js library
queue()
    .defer(d3.csv, "data/winedata.csv")
    .await(makeGraphs);


// The data from the csv file will be passed to the variable wineData by queue.js
function makeGraphs(error, wineData) {

    var ndx = crossfilter(wineData);

    /*console.log(wineData);*/ // This console was inserted just for testinf reasons to check if the dataset is loaded in the proper format

    // Converting the dataset to integers as it is being currently read as text
    wineData.forEach(function(d) {
        d.points = parseInt(d["points"]);
        d.price = parseInt(d["price"]);
    });

    show_country_selector(ndx);

    show_variety_selector(ndx);

    show_points_selector(ndx);

    show_price_selector(ndx);

    show_country_count(ndx);

    /*show_country_distribution(ndx);*/

    show_average_points(ndx);

    dc.renderAll();
}


// This function provides the user with the possibility to filter the data by country
function show_country_selector(ndx) {

    // Defining the variables
    dim = ndx.dimension(dc.pluck('country'));
    group = dim.group();

    // Targeting the div which the chart will belong to
    var select = dc.selectMenu("#country-selector")
        .dimension(dim)
        .group(group)
        .promptText('Country');

    select.title(function(d) {
        return d.key;
    });
}


// This function provides the user with the possibility to filter the data by grape variety
function show_variety_selector(ndx) {

    dim = ndx.dimension(dc.pluck('variety'));
    group = dim.group();

    var select = dc.selectMenu("#variety-selector")
        .dimension(dim)
        .group(group)
        .promptText('Variety');

    select.title(function(d) {
        return d.key;
    });
}


// This function provides the user with the possibility to filter the data by grape variety
function show_points_selector(ndx) {

    var price_range = ndx.dimension(function(d) {
        if (d.points >= 0 && d.points <= 82)
            return "Bad: Below 83";
        else if (d.points >= 83 && d.points <= 87)
            return "Average: 83 to 87";
        else if (d.points >= 88 && d.points <= 91)
            return "Good: 88 to 91";
        else if (d.points >= 92 && d.points <= 95)
            return "Very Good: 92 to 95";
        else if (d.points >= 96)
            return "Excellent: Above 95";
    });

    var price_range_group = price_range.group();

    console.log(price_range_group.all());

    dc.selectMenu("#points-selector")
        .dimension(price_range)
        .group(price_range_group)
        .promptText('Points')
        .title(function(d) {
            return d.key;
        });
}


// This function provides the user with the possibility to filter the data by price per bottle
function show_price_selector(ndx) {

    var price_range = ndx.dimension(function(d) {
        if (d.price >= 0 && d.price <= 25)
            return "$1 to $25";
        else if (d.price >= 26 && d.price <= 50)
            return "$25 to $50";
        else if (d.price >= 51 && d.price <= 75)
            return "$50 to $75";
        else if (d.price >= 76 && d.price <= 100)
            return "$75 to $100";
        else if (d.price >= 101)
            return "Above $100";
    });

    var price_range_group = price_range.group();

    console.log(price_range_group.all());

    dc.selectMenu("#price-selector")
        .dimension(price_range)
        .group(price_range_group)
        .promptText('Price')
        .title(function(d) {
            return d.key;
        });
}


// This function displays the number of constituents or entries per country
function show_country_count(ndx) {
    var dim = ndx.dimension(dc.pluck('country'));
    var group = dim.group();

    dc.barChart("#country-count")
        .width(500)
        .height(300)
        .margins({ top: 30, right: 30, bottom: 60, left: 50 })
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        /*.elasticY(true)*/
        .xUnits(dc.units.ordinal)
        /*.xAxisLabel("Country Name")*/
        .yAxisLabel("Wine Bottles")
        .yAxis().ticks(10);

}


// This function displays the number of constituents or entries per country



function show_average_points(ndx) {
    var dim = ndx.dimension(dc.pluck('country'));

    // As we use a custom reduce for this function, we must set the add, reduce, and initialise functions to be added in the custom reducer
    //p will keep track of the total, the count, and the average, whereas v represented each entry added or removed
    function add_item(p, v) {
        p.count++;
        p.total += v.points;
        p.average = p.total / p.count;
        return p;
    }

    function reduce_item(p, v) {
        p.count--;
        if (p.count == 0) { // Here we insert an if in case our count is 0 which would cause an error when calculatinf the average
            p.total = 0;
            p.average = 0;
        }
        else {
            p.total -= v.points;
            p.average = p.total / p.count;
        }
        return p;
    }

    function initialise_item() {
        return { count: 0, total: 0, average: 0 };
    }

    var averagePointsByCountry = dim.group().reduce(add_item, reduce_item, initialise_item);

    /*console.log(averagePointsByCountry);*/

    dc.barChart("#average-points")
        .width(500)
        .height(300)
        .margins({ top: 30, right: 10, bottom: 60, left: 50 })
        .dimension(dim)
        .group(averagePointsByCountry)
        .valueAccessor(function(d) { // As a custom reducer was put in place, here we must use the valueAccessor property plucking the average value which is the only one to be displayed    
            return d.value.average.toFixed(1);
        })
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .elasticY(true)
        .xUnits(dc.units.ordinal)
        /*.xAxisLabel("Country Name")*/
        .yAxisLabel("Average Points")
        .yAxis().ticks(10);

}
