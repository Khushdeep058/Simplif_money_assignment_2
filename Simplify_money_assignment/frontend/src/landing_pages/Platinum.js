import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import Footer from "./Footer";

function Platinum() {
  const [price, setPrice] = useState(0);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(0);
  const [yearLow, setYearLow] = useState(0);
  const [yearHigh, setYearHigh] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("1D");

  const timeframes = ["1D", "1W", "1M", "3M", "6M", "1Y", "5Y", "All"];

  useEffect(() => {
    setLoading(true);
    fetch(`/api/prices/history/platinum?timeframe=${timeframe}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setChartData(data.chartData);
          setPrice(data.currentPrice);
          setLow(data.low);
          setHigh(data.high);
          setYearLow(data.yearLow || Math.floor(data.currentPrice * 0.85));
          setYearHigh(data.yearHigh || Math.floor(data.currentPrice * 1.12));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [timeframe]);

  return (
    <div className="container p-4">
      <h2 className="mb-2">Platinum</h2>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <h1 className="fw-bold">₹ {price}</h1>

          <div className="row mt-4 mb-4">

            
            <div className="col-lg-8">
              <div style={{ width: "100%", height: 350 }} className="border rounded p-3 shadow-sm bg-white h-100">
                <ResponsiveContainer>
                  <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorPlatinum" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#575a6c" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#575a6c" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eaeaea" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#888' }} />
                    <YAxis
                      domain={['dataMin', 'dataMax']}
                      scale="linear"
                      width={60}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#888' }}
                      tickFormatter={(value) => `₹${Math.round(value / 1000)}k`}
                    />
                    <Tooltip formatter={(value) => [`₹${value}`, "Price"]} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#575a6c"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorPlatinum)"
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              
              <div className="d-flex justify-content-between my-3 overflow-auto">
                {timeframes.map((tf) => (
                  <button
                    key={tf}
                    className={`btn btn-sm ${timeframe === tf ? 'btn-dark' : 'btn-outline-secondary'} mx-1`}
                    onClick={() => setTimeframe(tf)}
                    style={{ borderRadius: "20px", minWidth: "45px" }}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            
            <div className="col-lg-4 mb-3 mb-lg-0">
              <div className="border rounded p-3 shadow-sm bg-white d-flex flex-column justify-content-center" style={{ height: "350px" }}>
                <h4 className="mb-3">Insights</h4>
                <p className="text-muted" style={{ lineHeight: "1.6" }}>
                  Platinum is exceptionally rare—rarer than gold—and holds critical importance in reducing automotive emissions through catalytic converters.
                </p>
                <p className="text-muted" style={{ lineHeight: "1.6" }}>
                  As global emissions standards tighten and hydrogen fuel cell technologies develop, platinum's strong industrial fundamentals position it as an investing avenue with unique growth potential independent of traditional markets.
                </p>
              </div>
            </div>

          </div>

          <h4 className="mb-3 mt-5">Performance</h4>
          <div className="row text-center">
            <div className="col-md-6">
              <p className="text-muted">Today's Low</p>
              <h5>₹ {low}</h5>
            </div>
            <div className="col-md-6">
              <p className="text-muted">Today's High</p>
              <h5>₹ {high}</h5>
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

export default Platinum;