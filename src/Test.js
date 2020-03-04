import * as d3 from "d3";
import * as topojson from "topojson-client";

import React, { Component } from "react";

class Test extends Component {
    
    render() { 
        let data = [{
            "source": {
                "lat": 40.712776,
                "lon": -74.005974    
            },
            "destination": {
                "lat": 21.05,
                "lon": 105.55
            }
        },
                 {
            "source": {
                "lat": 40.712776,
                "lon": -74.005974    
            },
            "destination": {
                "lat": -35.15,
                "lon": 149.08
            }
        }]
    
    var curve = function(context) {
      var custom = d3.curveLinear(context);
      custom._context = context;
      custom.point = function(x,y) {
        var x = +x;
        var y = +y;
        switch (this._point) {
          case 0: this._point = 1; 
            this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
            this.x0 = x; this.y0 = y;        
            break;
          case 1: this._point = 2;
          default: 
            var x1 = this.x0 * 0.5 + x * 0.5;
            var y1 = this.y0 * 0.5 + y * 0.5;
            var m = 1/(y1 - y)/(x1 - x);
            var r = -100; // offset of mid point.
            var k = r / Math.sqrt(1 + (m*m) );
            if (m == Infinity) {
              y1 += r;
            }
            else {
              y1 += k;
              x1 += m*k;
            }     
            this._context.quadraticCurveTo(x1,y1,x,y); 
            this.x0 = x; this.y0 = y;        
            break;
        }
      }
      return custom;
    }
    
    var projection = d3.geoEquirectangular().translate([250,150]).scale(500/Math.PI/2);
    var path = d3.geoPath(projection);
    
    var svg = d3.select("body")
      .append("svg")
      .attr("width", 500)
      .attr("height", 300);
      
    d3.json("https://unpkg.com/world-atlas@1/world/110m.json").then(function(world) {
     
      var worldOutline = svg.append("path")
        .datum(topojson.mesh(world))
        .attr("d", path );
        
      var line = d3.line()
        .x(function(d) {
          return projection([d.lon,d.lat])[0];
        })
        .y(function(d) {
          return projection([d.lon,d.lat])[1];
        })
        .curve(curve);
        
      svg.selectAll(null)
        .data(data)
        .enter()
        .append("path")
        .datum(function(d) {
          return [d.source,d.destination]; // d3.line expects an array where each item represnts a vertex.
        })
        .attr("d",line)
        .attr("fill","none")
        .style("stroke","black")
        .style("stroke-width",1.5);
    
    });
        return ( 
            <div></div>
         );
    }
}
 
export default Test;