<style>

.node {
  cursor: move;
  stroke: #fff;
  fill: #ccc;
  stroke-width: 1.5px;
}

.link {
  cursor: move;
  fill: #ccc;
  stroke: #999;
  stroke-opacity: .6;
}
.node.fixed {
  fill: #ccc;
}

</style>


<script src="http://d3js.org/d3.v3.min.js"></script>
<script type="text/javascript">var networkOutputBinding = new Shiny.OutputBinding();
  $.extend(networkOutputBinding, {
    find: function(scope) {
      return $(scope).find('.shiny-network-output');
    },
    renderValue: function(el, data) {
      
      //format nodes object
      var nodes = new Array();
      for (var i = 0; i < data.names.length; i++){
        nodes.push({"name": data.names[i]})
      }


      var width = 850;
      var height = 600;
    
      var lin = data.links
	  
      var force = d3.layout.force()
        .nodes(nodes)
        .links(lin)
		.friction([0.4])
        .charge(-120)
        .linkDistance(30)        
        .size([width, height])
        .start();
        
        var drag = force.drag()
       .on("dragstart", dragstart);
       var k = 0;
       while ((force.alpha() > 1e-2) && (k < 150)) {
          force.tick(),
           k = k + 1;
        }
      //remove the old graph
      var svg = d3.select(el).select("svg");      
      svg.remove();
      
      $(el).html("");
      
      //append a new one
      svg = d3.select(el).append("svg");
      
      svg.attr("width", width)
        .attr("height", height);
    
    var link = svg.selectAll("line.link")
          .data(lin)
         .enter().append("line")
          .attr("class", "link")
          .style("stroke-width", function(d) { return Math.sqrt(d.value); });
    
      var node = svg.selectAll("circle.node")
          .data(nodes)
        .enter().append("circle")
          .attr("class", "node")
          .attr("r", 12)
          //.style("fill", function(d) { return color(d.group); })
		  .on("dblclick", dblclick)
          .call(drag);
      node.append("title")
        .text(function(d) { return d.name; });
        
        
      force.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
    
        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
      });
	  function dblclick(d) {
  d3.select(this).classed("fixed", d.fixed = false);
};

function dragstart(d) {
  d3.select(this).classed("fixed", d.fixed = true);
};
      
    }
  });
  Shiny.outputBindings.register(networkOutputBinding, 'trestletech.networkbinding');
  
  </script>
