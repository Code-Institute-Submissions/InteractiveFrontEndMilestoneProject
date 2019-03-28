// To load the content from financialdata.csv we use the queue.js library
queue()
    .defer(d3.csv, "data/financialdata.csv")
    .await(makeGraphs);


// The data from the csv file will be passed to the variable financialData by queue.js
function makeGraphs(error, financialData) {

    var ndx = crossfilter(financialData);

    console.log(financialData);

    // Converting the financial dataset to integers as it is being currently read as text
    financialData.forEach(function(d) {
        d.price = parseInt(d["Price"]);
    });

    show_price_per_share(ndx);

    dc.renderAll();
}


function show_price_per_share(ndx) {
    var dim = ndx.dimension(dc.pluck('Sector'));
    var group = dim.group();

    dc.barChart("#price-per-share")
        .width(400)
        .height(300)
        .margins({ top: 10, right: 50, bottom: 110, left: 50 })
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        /*.elasticY(true)*/
        .xUnits(dc.units.ordinal)
        /*.xAxisLabel("Sector Name")*/
        .yAxisLabel("Sector Count")
        .yAxis().ticks(10);

}
