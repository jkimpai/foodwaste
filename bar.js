// bar variables
var barWdthPct = 0.5,
  barHghtPct = 0.7,
  barMargin = {top: 0, right: 0, bottom: 140, left: 70},
  barWidth = Math.max(Math.floor(width * barWdthPct) - barMargin.left, minWidth),
  barHeight = Math.max(Math.floor(height * barHghtPct) - barMargin.bottom, minHeight);

// svg for the bar graph
var barSvg = d3.select("#barSvg")
  .attr("width", barWidth + barMargin.left + 5)
  .attr("height", barHeight + barMargin.bottom);

// axes for the bar graph
var x = d3.scaleBand().rangeRound([0, barWidth]).padding(0.1),
    y = d3.scaleLinear().rangeRound([barHeight, 0]);

// container for the graph within the svg, w room for axes labels
var bars = barSvg.append("g")
  .attr("transform", "translate(" + barMargin.left + "," + barMargin.top + ")");

function buildBarGraph(yrData, total) {

	// build bar graph
  x.domain(yrData.map(function(d) { return d.var; }));
  y.domain([0, d3.max(yrData, function(d) { return d.val; })]);
  
  // x axis
  bars.append("g")
    .attr("class", "xAxis")
    .attr("transform", "translate(0,"+ barHeight + ")")
    .call(d3.axisBottom(x));

  // y axis
  bars.append("g")
    .attr("class", "yAxis")
    .call(d3.axisLeft(y))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", "-60")
      .attr("x", "-250")
      .attr("text-anchor", "middle")
      .text("Waste in Millions of KGs");

  // adding individual bars
  bars.selectAll(".bar")
      .data(yrData)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("id", function(d) { return (d.varID); })
      .attr("x", function(d) { return x(d.var); })
      .attr("y", function(d) { return y(d.val); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return barHeight - y(d.val); })
      .style("fill", function(d) { return colorMap(d.var); });

  // set each bar to show information in tooltip on hover
  bars.selectAll(".bar").on("mouseover", 
    function(d) { mouseOvr(d.varID, d.var, d.val, total); });
  bars.selectAll(".bar").on("mouseout", 
    function(d) { mouseOut(d.varID, d.var); });
};

function updateBars(yrData, total) {
  // get data again
  x.domain(yrData.map(function(d) { return d.var; }));
  y.domain([0, d3.max(yrData, function(d) { return d.val; })]);

  bars.select(".xAxis").transition()
    .duration(750)
    .delay(function(d, i) { return i * 50; })
    .attr("transform", "translate(0,"+ barHeight + ")")
    .call(d3.axisBottom(x));

  // y axis
  bars.select(".yAxis").transition()
    .duration(750)
    .delay(function(d, i) { return i * 50; })
    .attr("class", "yAxis")
    .call(d3.axisLeft(y))

	bars.selectAll(".bar")
        .data(yrData)
      .transition()
        .duration(750)
        .delay(function(d, i) { return i * 50; })
        .attr("x", function(d) { return x(d.var); })
        .attr("y", function(d) { return y(d.val); })
        .attr("height", function(d) { return barHeight - y(d.val); });

        // set each bar to show information in tooltip on hover
    bars.selectAll(".bar").on("mouseover", 
      function(d) { mouseOvr(d.varID, d.var, d.val, total); });
    bars.selectAll(".bar").on("mouseout", 
      function(d) { mouseOut(d.varID, d.var); });
}