const confirmed = $(".confirmed").html();
const recovered = $(".recovered").html();
const critical = $(".critical").html();
const deaths = $(".deaths").html();

const data = [
  {name: "Confirmed", value: confirmed},
  {name: "Recovered", value: recovered},
  {name: "Critical", value: critical},
  {name: "Deaths", value: deaths}
];

const svg = d3.select('svg'),
    width = svg.attr('width'),
    height = svg.attr('height');

const radius = 170;

const g = svg.append('g').attr('transform', `translate(${200}, ${200})`);

const color = d3.scaleOrdinal()
                .range(['#10A5F5', 'green', 'red', 'yellow']);

const pie = d3.pie().sort(null).value(d => d.value);

const path = d3.arc().outerRadius(radius).innerRadius(0);

const label = d3.arc().outerRadius(radius).innerRadius(radius - 90);

const pies = g.selectAll('.arc')
              .data(pie(data))
              .enter()
              .append('g')
              .attr('class', 'arc');

pies.append('path')
    .attr('d', path)
    // .attr('stroke', 'black')
    .attr('fill', d => color(d.data.name));
