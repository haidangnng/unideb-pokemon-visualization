<script lang="ts">
  import {addAxis} from '@/d3-utils';
  import {AxisPosition} from '@/types/d3-type';
  import * as d3 from 'd3';
  let ref: HTMLDivElement;

  var margin = {top: 0, right: 0, bottom: 100, left: 100},
    width = 600 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  const draw = () => {
    clearDraw();

    if (!ref || ref === null || ref === undefined) {
      return;
    }
    let svg = d3.select(ref).append('svg').attr('width', width).attr('height', height);

    addAxis({
      pos: AxisPosition.BOTTOM,
      target: svg,
      scale: d3
        .scaleLinear()
        .domain([0, 2e6])
        .range([height - margin.bottom, margin.top])
    });
  };

  const clearDraw = () => {
    d3.select(ref).html(null);
  };

  $effect(() => {
    draw();
    window.addEventListener('resize', draw);

    return () => {
      clearDraw();
      window.removeEventListener('resize', draw);
    };
  });
</script>

<div bind:this={ref}></div>
