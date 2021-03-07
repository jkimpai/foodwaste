// pie variables
var pieWdthPct = 0.3,
  pieHghtPct = 0.5,
  donutWidth = 80,
  whole = 2 * Math.PI,
  pieWidth = Math.max(Math.floor(width * pieWdthPct), minWidth),
  pieHeight = Math.max(Math.floor(height * pieHghtPct) - 50, minHeight),
  radius = Math.min(pieWidth, pieHeight) / 2;

// svg for the pie graph
var pieSvg = d3.select("#pieSvg")
  .attr("width", radius * 2)
  .attr("height", radius * 2);

// arcs for the pie graph
var arc = d3.arc()
  .outerRadius(radius)
  .innerRadius(radius - donutWidth)
  .padAngle(.005);

var pie = d3.pie()
  .sort(null)
  .value(function(d) { return d.val; });

// container for the pie graph
var slices = pieSvg.append("g")
  .attr("class","pieGraph")
  .attr("transform", "translate(" + radius + "," + radius + ")");

function buildPieGraph(yrData, total) {
  // build pie chart
  slices.selectAll(".arc")
    .data(pie(yrData))      
    .enter().append("path")
      .attr("d", arc)
      .attr("class", "arc")
      .attr("id", function(d) { return (d.data.varID); })
      .style("fill", function(d) { return colorMap(d.data.var); })
      .each(function(d) { this._current = d; });

  // set each pie slice to show information in tooltip on hover
  slices.selectAll(".arc").on("mouseover", 
    function(d) { mouseOvr(d.data.varID, d.data.var, d.data.val, total); });
  slices.selectAll(".arc").on("mouseout", 
    function(d) { mouseOut(d.data.varID, d.data.var); });
};

function arcTween(a) {
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
};

function updatePie(yrData, total) {
	var arcs = pieSvg.select("g").selectAll(".arc")
	  .data(pie(yrData))
	  .transition().duration(500).attrTween("d", arcTween);

	slices.selectAll(".arc").on("mouseover", 
	  function(d) { mouseOvr(d.data.varID, d.data.var, d.data.val, total); });
	slices.selectAll(".arc").on("mouseout", 
	  function(d) { mouseOut(d.data.varID, d.data.var); });
  };