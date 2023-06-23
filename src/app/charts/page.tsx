"use client";

import useSWR from "swr";
import { serverUrl } from "../constants";
import fetcher from "../helpers/swr";
import { baseResponse, character, episode, location } from "../entities";
import { BarChart } from "@mui/x-charts/BarChart";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination/Pagination";
import Typography from "@mui/material/Typography/Typography";
import { LineChart } from "@mui/x-charts";

interface chartData {
  xAxis: { id: string; data: any; scaleType: any }[];
  series: { data: number[]; color: string; area?: boolean; }[];
  width: number;
  height: number;
}

export default function Charts() {
  const [page, setPage] = useState<number>(1);
  const [lpage, setlpage] = useState<number>(1);
  const [lpages, setlpages] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [chartData, setChartData] = useState<chartData>({} as chartData);
  const [locationChart, setLocationChart] = useState<chartData>(
    {} as chartData
  );

  const { data, error, isLoading } = useSWR<baseResponse<episode>, Error>(
    `${serverUrl}/episode?page=${page}`,
    fetcher
  );

  const {
    data: locationData,
    error: locationError,
    isLoading: locationLoading,
  } = useSWR<baseResponse<location>, Error>(
    `${serverUrl}/location?page=${lpage}`,
    fetcher
  );

  useEffect(() => {
    if (!data?.results.length) return;

    let chartData: chartData = {
      series: [{ data: [], color: "#2590EB" }],
      xAxis: [{ id: "1", scaleType: "band", data: [] }],
      width: data?.results.length! * 100,
      height: 300,
    };

    data?.results.map((result) => {
      chartData.xAxis[0].data.push(result.episode);
      chartData.series[0].data.push(result.characters.length);
    });
    setPages(data.info.pages);
    setChartData(chartData);
  }, [data]);

  useEffect(() => {
    if (!locationData?.results.length) return;

    let chartData: chartData = {
      series: [{ data: [], color: "#2590EB", area: true }],
      xAxis: [{ id: "1", scaleType: "band", data: [] }],
      width: data?.results.length! * 200,
      height: 300,
    };

    locationData?.results.map((result) => {
      chartData.xAxis[0].data.push(result.name);
      chartData.series[0].data.push(result.residents.length);
    });
    setlpages(locationData.info.pages);
    setLocationChart(chartData);
  }, [locationData]);

  return (
    <main className="flex flex-col max-sm:p-0 h-full items-center justify-between p-6">
      <div className="flex flex-col place-items-center">
        <article className="flex flex-col mb-8">
          <header className="p-6">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Stunning Evolution of Rick and Morty's Characters{" "}
              <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
                Across Episodes
              </mark>{" "}
            </h1>
            <p className="text-lg max-sm:text-sm font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Prepare for mind-blowing character transformations in every
              episode!
            </p>
          </header>

          {chartData?.series && (
            <>
              <div className="max-sm:max-w-[100vw] overflow-auto max-w-[90vw]">
                <BarChart
                  xAxis={chartData.xAxis}
                  series={chartData.series}
                  width={chartData.width}
                  height={chartData.height}
                ></BarChart>
              </div>
              <Pagination
                count={pages}
                page={page}
                color="primary"
                onChange={(_: any, index: number) => setPage(index)}
              />
            </>
          )}
        </article>
        <article className="flex flex-col mb-8">
          <header className="p-6">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              The Multiverse Map: Explore Rick and Morty's{" "}
              <mark className="text-transparent bg-clip-text bg-gradient-to-r to-rose-600 from-indigo-400">
                Exotic Residences!
              </mark>{" "}
            </h1>
            <p className="text-lg max-sm:text-sm font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Navigate through the interdimensional chart, unveiling the
              eclectic dwellings of Rick and Morty across the multiverse."
            </p>
          </header>

          {locationChart?.series && (
            <>
              <div className="max-sm:max-w-[100vw] overflow-auto max-w-[90vw]">
                <LineChart
                  xAxis={locationChart.xAxis}
                  series={locationChart.series}
                  width={locationChart.width}
                  height={locationChart.height}
                ></LineChart>
              </div>
              <Pagination
                count={lpages}
                page={lpage}
                color="secondary"
                onChange={(_: any, index: number) => setlpage(index)}
              />
            </>
          )}
        </article>
      </div>
      {error ? "" : <footer className="max-sm:pt-14 pt-4"></footer>}
    </main>
  );
}
