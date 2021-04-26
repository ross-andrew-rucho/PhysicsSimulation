import { Line } from "react-chartjs-2";
import { useEffect, useRef, useState } from "react";

const GraphComponent = ({ ind, dep, ...rest }) => {
  const [p1, setP1] = useState(null);
  const [p2, setP2] = useState(null);

  const width = 200;
  const height = 200;

  const ref = useRef();

  // function handleClick(e, element) {
  //   // If first point is null, save as p1
  //   if (!p1) setP1([e.x, e.y]);
  //   // If second point is null, save as p2
  //   else if (!p2) setP2([e.x, e.y]);
  //   console.log(e);
  // }

  const data = {
    labels: ind.length > 1 ? ind : [0, 1, 2, 3, 4, 5, 6],
    datasets: [
      {
        label: "Simulation",
        data: dep,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      // { label: "My guess", data: [], fill: false, tension: 0.1 },
    ],
  };

  const options = {
    scales: {
      y: {
        suggestedMax: 30,
      },
      x: { type: "linear", suggestedMax: 6, suggestedMin: 3 },
    },
    maintainAspectRatio: false,
    onClick: { handleClick },
  };

  return (
    <Line
      className="graph"
      ref={ref}
      data={data}
      width={200}
      height={200}
      options={{ maintainAspectRatio: false, onClick: handleClick }}
    />
  );
};

export default GraphComponent;