class Scatterplot {
  constructor(node, props) {
    // save properties
    this.width = props.width;
    this.height = props.height;
    this.padding = props.padding;

    this.drawChart = this.drawChart.bind(this);
    this.setScales = this.setScales.bind(this);
    this.drawLegend = this.drawLegend.bind(this);

    this.colorScale = d3.scaleOrdinal()
                       .range(['#85992C',
                               '#8C19C1',
                               '#C61C6F',
                               '#B58929',
                               '#268BD2'])
                       .domain(["water-gas",
                                "gas",
                                "rocky-iron",
                                "rocky-water",
                                "iron"]);

    // add svg to DOM
    this.svg = d3.select(node)
      .append('svg')
      .attr('width', props.width)
      .attr('height', props.height);
  }

  drawLegend() {
    let legend = this.svg.append("g");
    legend.selectAll("rect")
         .data(this.colorScale.domain())
         .enter()
         .append("rect")
         .attr("x", this.width - this.padding)
         .attr("y", (d, i) => this.padding + 20 * i)
         .attr("width", 18)
         .attr("height", 18)
         .style("fill", d => this.colorScale(d));

    legend.selectAll("text")
         .data(this.colorScale.domain())
         .enter()
         .append("text")
         .attr("x", this.width - 4 - this.padding)
         .attr("y", (d, i) => this.padding + 9 + (20 * i))
         .attr("dy", ".35em")
         .style("text-anchor", "end")
         .text(d => d);
  }

  setScales(dataset, xKey, yKey) {
    this.xScale = d3.scaleLinear()
                    .range([this.padding, this.width - this.padding])
                    .domain(d3.extent(dataset, (d) => Number(d[xKey])))
                    .nice();

    this.yScale = d3.scaleLinear()
                    .range([this.height - this.padding, this.padding])
                    .domain(d3.extent(dataset, (d) => Number(d[yKey])))
                    .nice();
  }

  drawChart(dataset, xKey, yKey) {
    // filter data to remove empty values or other not numerical datapoints
    const filteredData = dataset.filter(datapoint => (
      (datapoint[xKey]) && datapoint[yKey]) &&
      (datapoint[xKey].trim() !== "" && datapoint[yKey].trim() !== "")
    );

    // create or update scales to fit data
    this.setScales(filteredData, xKey, yKey);

    // add data points
    this.svg.selectAll("circle")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("fill", d => this.colorScale(d["P. Composition Class"]))
      .attr("cx", d => this.xScale(Number(d[xKey])))
      .attr("cy", d => this.yScale(Number(d[yKey])))
      .attr("r", d => 2);

    // add axes and legend
    const xAxis = d3.axisBottom(this.xScale);
    const yAxis = d3.axisLeft(this.yScale);

    this.svg.append("g")
        .attr("transform", "translate(0," + (this.height - this.padding) + ")")
        .call(xAxis);

    this.svg.append("g")
        .attr("transform", "translate("+ this.padding + ", 0)")
        .call(yAxis);

    this.drawLegend();
  }

  updateChart(dataset, xKey, yKey) {
    // remove old chart and redraw with new data
    this.svg.selectAll("*").remove();
    this.drawChart(dataset, xKey, yKey);
  }
}

export default Scatterplot;
