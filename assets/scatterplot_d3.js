class Scatterplot {
  constructor(node, props) {
    this.width = props.width;
    this.height = props.height;
    this.padding = props.padding;

    this.drawChart = this.drawChart.bind(this);
    this.setScales = this.setScales.bind(this);

    this.svg = d3.select(node)
                 .append('svg')
                 .attr('width', props.width)
                 .attr('height', props.height);

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
  }

  drawChart(dataset, xKey, yKey) {
    const filteredData = dataset.filter(datapoint => (
      (datapoint[xKey]) && datapoint[yKey]) &&
      (datapoint[xKey].trim() !== "" && datapoint[yKey].trim() !== "")
    );

    this.setScales(filteredData, xKey, yKey);

    this.svg.selectAll("circle")
       .data(filteredData)
       .enter()
       .append("circle")
       .attr("fill", d => this.colorScale(d["P. Composition Class"]))
       .attr("cx", d => this.xScale(Number(d[xKey])))
       .attr("cy", d => this.yScale(Number(d[yKey])))
       .attr("r", d => 2);

     const xAxis = d3.axisBottom(this.xScale);
     const yAxis = d3.axisLeft(this.yScale);

     this.svg.append("g")
        .attr("transform", "translate(0," + (this.height - this.padding) + ")")
        .call(xAxis);

     this.svg.append("g")
        .attr("transform", "translate("+ this.padding + ", 0)")
        .call(yAxis);
  }

  updateChart(dataset, xKey, yKey) {
    this.svg.selectAll("*").remove();
    this.drawChart(dataset, xKey, yKey);
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
}

export default Scatterplot;
