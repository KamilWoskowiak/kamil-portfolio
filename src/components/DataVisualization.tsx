// src/components/DataVisualization.tsx
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  x: number;
  y: number;
  z: number;
}

export const DataVisualization: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select<SVGSVGElement, unknown>(svgRef.current);
    const width = 600;
    const height = 600;

    const data: DataPoint[] = Array.from({ length: 100 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 100,
    }));

    const colorScale = d3.scaleSequential(d3.interpolateCool).domain([0, 100]);

    const circles = svg.selectAll<SVGCircleElement, DataPoint>('circle').data(data);

    circles
      .enter()
      .append('circle')
      .merge(circles)
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('r', (d) => d.z / 10)
      .attr('fill', (d) => colorScale(d.z) as string);

    circles.exit().remove();

    d3.timer((t) => {
      svg
        .selectAll<SVGCircleElement, DataPoint>('circle')
        .attr('cx', (d) => d.x + Math.sin(t / 1000) * 50)
        .attr('cy', (d) => d.y + Math.cos(t / 1000) * 50);
    });
  }, []);

  return <svg ref={svgRef} width="600" height="600"></svg>;
};
