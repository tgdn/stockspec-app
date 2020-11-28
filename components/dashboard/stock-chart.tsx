import React, { useContext } from "react";

import cx from "classnames";
import { LinePath, AreaClosed } from "@visx/shape";
import { scaleTime, scaleLinear } from "@visx/scale";
import { extent, max, min } from "d3-array";

import {
  IStockSeriesContext,
  StockSeriesContext,
} from "providers/stockseries.provider";
import { IStockPrice } from "types/stock-price";

import styles from "./stock-list.module.css";

export default function StockChart({ width, height }) {
  const {
    prices,
    delta,
    xAccessor,
    yAccessor,
  }: IStockSeriesContext = useContext(StockSeriesContext);
  if (!prices) return null;

  const margin = { left: 0, right: 0, top: 0, bottom: 0 };
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const maxY = max(prices || [], yAccessor);
  const minY = min(prices || [], yAccessor);

  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(prices || [], xAccessor),
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [minY, maxY],
    nice: true,
  });

  const x = (d: IStockPrice) => xScale(xAccessor(d));
  const y = (d: IStockPrice) => yScale(yAccessor(d));

  const curveClassName = delta > 0 ? styles.pos : styles.neg;
  const areaFill = delta > 0 ? "url(#gradient-green)" : "url(#gradient-red)";

  return (
    <svg width={width} height={height}>
      <g>
        <LinePath
          data={prices}
          x={x}
          y={y}
          fill="transparent"
          strokeWidth={2}
          className={cx(styles.curve, curveClassName)}
        />
        <AreaClosed
          data={prices}
          x={x}
          y={y}
          yScale={yScale}
          strokeWidth={2}
          stroke="transparent"
          fill={areaFill}
        />
      </g>
    </svg>
  );
}
