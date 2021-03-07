var yr = 2010;
var un = "MILLIONKG";
var ac = "HOUSEHOLDS";

var container = document.getElementById("all"),
  width = container.clientWidth;
  height = container.clientHeight;

var minWidth = 200,
  minHeight = 200;

// colormap
var colorMap = d3.scaleOrdinal()
  .range(["#a49fcc", "#80bdc3", "#8cacd3", "#91c2b6", "#7eb6cf"]);

// tooltip to show more information about hovered element
var tooltip = d3.select("#tooltipDiv");
tooltip.append("div")
  .attr("class","label")
  .html("Mouseover graphs to get");
tooltip.append("div")
  .attr("class","count")
  .html("weight in millions of kgs &");
tooltip.append("div")
  .attr("class", "percent")
  .html("percent of total food waste");

function mouseOvr(id, vr, val, tot) {
  d3.selectAll("#"+id)
    .style("fill", "#fff27a");
  tooltip.select(".label").html(vr);
  tooltip.select(".count").html(val.toFixed(2) + " million kg");
  tooltip.select(".percent").html((val/tot * 100).toFixed(2) + "%");
};

function mouseOut(id, vr) {
  d3.selectAll("#"+id)
    .style("fill", colorMap(vr));
  tooltip.select(".label").html("Mouseover graphs to get");
  tooltip.select(".count").html("weight in millions of kgs &");
  tooltip.select(".percent").html("percent of total food waste");
};

var yrData;
var total;