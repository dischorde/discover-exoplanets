class Scatterplot {
  constructor(el, props) {
    this.width = props.width;
    this.height = props.height;
    this.padding = props.padding;
    this.drawChart = this.drawChart.bind(this);
    this.setScales = this.setScales.bind(this);

    this.svg = d3.select(el)
                 .append('svg')
                 .attr('width', props.width)
                 .attr('height', props.height);
  }

  drawChart(dataset, xKey, yKey) {
    this.setScales(dataset, xKey, yKey);
    this.svg.selectAll("circle")
       .data(dataset)
       .enter()
       .append("circle")
       .attr("cx", (d) => this.xScale(d[xKey]))
       .attr("cy",(d) => this.yScale(d[yKey]))
       .attr("r", (d) => 5);

     const xAxis = d3.axisBottom(this.xScale);

     this.svg.append("g")
        .attr("transform", "translate(0," + (this.height - this.padding) + ")")
        .call(xAxis);

     const yAxis = d3.axisLeft(this.yScale);

     this.svg.append("g")
        .attr("transform", "translate("+ this.padding + ", 0)")
        .call(yAxis);
  }

  //TODO: determine best method for scaling domain & axes
  setScales(dataset, xKey, yKey) {
    this.xScale = d3.scaleLinear()
                    .range([this.padding, this.width - this.padding])
                    .domain(d3.extent(dataset, (d) => d[xKey]));
                    // .domain([0, d3.max(dataset, (d) => d[xKey])]);

    this.yScale = d3.scaleLinear()
                    .range([this.height - this.padding, this.padding])
                    .domain(d3.extent(dataset, (d) => d[yKey]));
                    // .domain([d3.min(dataset, (d) => d[yKey]), d3.max(dataset, (d) => d[yKey])]);
  }

}

export default Scatterplot;
