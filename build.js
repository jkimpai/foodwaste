// radio button options
$('#yrForm input').on('change', function() {
  yr =($('input[name=yr]:checked', '#yrForm').val()); 
  update();
});

$('#actForm input').on('change', function() {
  ac = ($('input[name=act]:checked', '#actForm').val()); 
  update();
});

// build initial graphs based on 2010 data
d3.csv("https://raw.githubusercontent.com/jkimpai/foodwaste/master/us-fw-2008-2010.csv", function(d) {
  d.val = +d.Value;
  d.unitID = d.UNIT;
  d.year = +d.TIME;
  d.actID = d.ACT;
  d.varID = d.VAR;
  d.var = d.Variable;
  return d; 
}, function(error, data) {
  if (error) throw error;

  // filter the data for given year and unit/act/id
  yrData = data.filter(function(d) {
    return (d.year == yr) && (d.unitID == un) && (d.actID == ac) 
    && (d.var != "Food Loss");
  });

  yrData = yrData.sort((a, b) => d3.descending(a.val, b.val));

  // calculate the total amount of waste (for calculating %)
  total = yrData.reduce(function(sum, d) {
    return sum + d.val;
  }, 0);

  buildBarGraph(yrData, total);
  buildPieGraph(yrData, total);
 
});

function update() {
  d3.csv("https://raw.githubusercontent.com/jkimpai/foodwaste/master/us-fw-2008-2010.csv", function(d) {
    d.val = +d.Value;
    d.unitID = d.UNIT;
    d.year = +d.TIME;
    d.actID = d.ACT;
    d.varID = d.VAR;
    d.var = d.Variable;
    return d; 
  }, function(error, data) {
    if (error) throw error;

    // filter out data for the given year
    var yrData = data.filter(function(d) {
      return (d.year == yr) && (d.unitID == un) && (d.actID == ac) && (d.var != "Food Loss");
    });

    yrData = yrData.sort((a, b) => d3.descending(a.val, b.val));

    var total = yrData.reduce(function(sum, d) {
      return sum + d.val;
    }, 0);

    updateBars(yrData, total);
    updatePie(yrData, total);

  });
};
