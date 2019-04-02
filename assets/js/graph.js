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

    show_country_distribution(ndx);

    show_average_points(ndx);

    show_points_distribution(ndx);

    show_national_variety(ndx);

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
        .margins({ top: 20, right: 30, bottom: 60, left: 50 })
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .colors(d3.scale.ordinal().range(['#9a3339', '#E64C55']))
        .x(d3.scale.ordinal())
        /*.elasticY(true)*/
        .xUnits(dc.units.ordinal)
        /*.xAxisLabel("Country Name")*/
        .yAxisLabel("Wine Bottles")
        .yAxis().ticks(10);

}


// This function displays the number of constituents or entries per country in the form a pie chart
function show_country_distribution(ndx) {
    var dim = ndx.dimension(dc.pluck('country'));
    var group = dim.group();

    dc.pieChart("#country-distribution")
        .height(350)
        .radius(120)
        /*.margins({ top: 30, right: 30, bottom: 60, left: 50 })*/
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .colors(d3.scale.ordinal().range(['#9a3339', '#E64C55', '#AB6C6F', '#E69196', '#672226', '#B33B42', '#805154', '#B37175', '#341113', '#C0797D', '#332022', '#802A2F', '#8D4327']))
        .legend(dc.legend().x(30).y(75).itemHeight(10).gap(5));
}


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
        .colors(d3.scale.ordinal().range(['#9a3339', '#E64C55']))
        .x(d3.scale.ordinal().domain(dim).range([0, 1000]))
        .elasticY(true)
        .xUnits(dc.units.ordinal)
        /*.xAxisLabel("Country Name")*/
        .yAxisLabel("Average Points")
        .yAxis().ticks(10);

}


// This function displays in the form of a pie chart the overall grade/points distribution
function show_points_distribution(ndx) {

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

    dc.pieChart("#points-distribution")
        .height(350)
        .radius(120)
        .dimension(price_range)
        .group(price_range_group)
        .transitionDuration(500)
        .colors(d3.scale.ordinal().range(['#9a3339', '#E64C55', '#AB6C6F', '#E69196', '#672226', '#B33B42', '#805154', '#B37175', '#341113', '#C0797D', '#332022', '#802A2F', '#8D4327']))
        .legend(dc.legend().x(15).y(125).itemHeight(15).gap(5));
}


// This function displays in the form of a stacked bar chart the wine variety per country
function show_national_variety(ndx) {

    // In this case we are nesting the custom reduce function internal to the reducer as opose to what has been done in the previous custom reduce
    /*var cabernetSauvignon = dim.group().reduce(
        function(p, v) {
            p.total++;
            if (v.variety == "Cabernet Sauvignon") {
                p.match++;
            }
            return p;
        },
        function(p, v) {
            p.total--;
            if (v.variety == "Cabernet Sauvignon") {
                p.match--;
            }
            return p;
        },
        function() {
            return { total: 0, match: 0 };
        }
    );*/

    // Instead of duplicating the function above we can create another based on the one for Cabernet Sauvignon, which will take two arguments, dimension and variety
    function countryVariety(dimension, variety) {
        return dimension.group().reduce(
            function(p, v) {
                p.total++;
                if (v.variety == variety) {
                    p.match++;
                }
                return p;
            },
            function(p, v) {
                p.total--;
                if (v.variety == variety) {
                    p.match--;
                }
                return p;
            },
            function() {
                return { total: 0, match: 0 };
            }
        );
    }

    var dim = ndx.dimension(dc.pluck('country'));
    var cabernet = countryVariety(dim, "Cabernet Sauvignon");
    var malbec = countryVariety(dim, "Malbec");
    var bordeaux = countryVariety(dim, "Bordeaux-style Red Blend");
    var pinot = countryVariety(dim, "Pinot Noir");
    var syrah = countryVariety(dim, "Syrah");
    var grenache = countryVariety(dim, "Grenache");
    var merlot = countryVariety(dim, "Merlot");
    
    // We can log one of the variables above to see if the data is being loaded properly
    console.log(malbec.all());
    
    // Therefore, as we now have created the variables in order to show the varieties we would like to display, now it is time to create the stacked bar chart
    dc.barChart("#country-variety")
        .width(1100)
        .height(400)
        .margins({ top: 10, right: 100, bottom: 70, left: 50 })
        .dimension(dim)
        .group(cabernet, "Cabernet Sauvignon")
        .stack(malbec, "Malbec")
        .stack(bordeaux, "Bordeaux-style Red Blend")
        .stack(pinot, "Pinot Noir")
        .stack(syrah, "Syrah")
        .stack(grenache, "Grenache")
        .stack(merlot, "Merlot")
        .valueAccessor(function(d) {                // As a custom reducer was put in place, here we must use the valueAccessor property in order to find out the percentage of each variety     
            if (d.value.total > 0) {
                return (d.value.match / d.value.total).toFixed(1) * 100;
            } else {
                return 0;
            }
        })
        .transitionDuration(500)
        .colors(d3.scale.ordinal().range(['#9a3339', '#E64C55', '#AB6C6F', '#E69196', '#672226', '#B33B42', '#805154', '#B37175', '#341113', '#C0797D', '#332022', '#802A2F', '#8D4327']))
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .legend(dc.legend().x(800).y(10).itemHeight(15).gap(5))
        .yAxisLabel("Variety %");
        /*.yAxis().ticks(10);*/
}
