// To load the content from winedata.csv we use the queue.js library
queue()
    .defer(d3.csv, "data/winedata.csv")
    .await(makeGraphs);


// The data from the csv file will be passed to the variable wineData by queue.js
function makeGraphs(error, wineData) {

    var ndx = crossfilter(wineData);

    console.log(wineData);

    // Converting the dataset to integers as it is being currently read as text
    wineData.forEach(function(d) {
        d.price = parseInt(d["Price"]);
    });

    show_country_selector(ndx);
    
    show_variety_selector(ndx);
    
    show_sector_count(ndx);

    dc.renderAll();
}


function show_country_selector(ndx) {

    // Defining the variables
    dim = ndx.dimension(dc.pluck('country'));
    group = dim.group();

    // Targeting the div which the chart will belong to
    dc.selectMenu("#country-selector")
        .dimension(dim)
        .group(group);
}

function show_variety_selector(ndx) {

    // Defining the variables
    dim = ndx.dimension(dc.pluck('variety'));
    group = dim.group();

    // Targeting the div which the chart will belong to
    dc.selectMenu("#variety-selector")
        .dimension(dim)
        .group(group);
}


function show_sector_count(ndx) {
    var dim = ndx.dimension(dc.pluck('country'));
    var group = dim.group();

    dc.barChart("#sector-count")
        .width(500)
        .height(300)
        .margins({ top: 30, right: 30, bottom: 60, left: 30 })
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        /*.elasticY(true)*/
        .xUnits(dc.units.ordinal)
        /*.xAxisLabel("Sector Name")*/
        /*.yAxisLabel("Sector Count")*/
        .yAxis().ticks(11);

}
