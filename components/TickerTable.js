import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { Sparklines, SparklinesLine } from "react-sparklines";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";

const TickerTable = () => {
  const [ts, setts] = useState([]);
  const [btc, setbtc] = useState([]);
  const [matic, setmatic] = useState([]);
  const [bnb, setbnb] = useState([]);
  const [eth, seteth] = useState([]);

  useEffect(() => {
    // initialize pusher
    const pusher = new Pusher("f1b69d71b4bc3fc09a48", {
      cluster: "ap2",
    });

    // subscribe to channel
    var channel = pusher.subscribe("prices");

    // listen for events on channel
    channel.bind("vwap1", function (data) {
      console.log("pusher says - ", data.feed[0]);
      if (data.feed != undefined) {
        setts(data.ts);
        setbtc((prevArray) => [...prevArray.slice(-5), data.feed[0]]);
        setmatic((prevArray) => [...prevArray.slice(-5), data.feed[1]]);
        setbnb((prevArray) => [...prevArray.slice(-5), data.feed[2]]);
        seteth((prevArray) => [...prevArray.slice(-5), data.feed[3]]);
      }
    });

    // clean up
    return () => {
      pusher.unsubscribe("prices");
      pusher.disconnect();
    };
  }, []);

  useEffect(() => {
    if (
      Date.now() / 1000 - parseFloat(localStorage.getItem("datats")) <
      20000
    ) {
      setts(localStorage.getItem("datats"));
      setbtc(JSON.parse(localStorage.getItem("btcdata")));
      setmatic(JSON.parse(localStorage.getItem("maticdata")));
      setbnb(JSON.parse(localStorage.getItem("bnbdata")));
      seteth(JSON.parse(localStorage.getItem("ethdata")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("datats", ts);
    localStorage.setItem("btcdata", JSON.stringify(btc));
  }, [btc]);

  useEffect(() => {
    localStorage.setItem("maticdata", JSON.stringify(matic));
  }, [matic]);

  useEffect(() => {
    localStorage.setItem("bnbdata", JSON.stringify(bnb));
  }, [bnb]);

  useEffect(() => {
    localStorage.setItem("ethdata", JSON.stringify(eth));
  }, [eth]);

  return (
    <>
      {" "}
      {btc.length != 0 && (
        <div className="w-full bg-gray-100 p-2 sm:p-4 rounded-lg shadow-md mb-8">
          <div className="flex items-center justify-between">
            <div className="w-1/5">
              <h2 className="text-lg font-medium text-gray-800">BTC-USDT</h2>
            </div>
            <div className="w-1/3 sm:w-1/5">
              <h2 className="text-lg font-medium text-gray-800">
                ${parseFloat(btc[btc.length - 1]).toFixed(3)}
              </h2>
              <p className="text-[10px]">
                (
                {isNaN(parseInt(Date.now() / 1000 - parseFloat(ts)))
                  ? parseInt(
                      Date.now() / 1000 -
                        parseFloat(localStorage.getItem("datats"))
                    )
                  : parseInt(Date.now() / 1000 - parseFloat(ts))}{" "}
                secs ago)
              </p>
            </div>
            <div className="w-1/6 sm:w-1/5 text-center">
              <h3 className="text-lg font-medium text-gray-800">
                {" "}
                {btc[btc.length - 1] - btc[btc.length - 2] > 0 ? (
                  <IoIosArrowDropupCircle
                    color="green"
                    size="25px"
                    className="mx-auto"
                  />
                ) : (
                  <IoIosArrowDropdownCircle
                    color="red"
                    size="25px"
                    className="mx-auto"
                  />
                )}
              </h3>
            </div>
            <div className="w-1/4 sm:w-1/3">
              <Sparklines data={btc}>
                <SparklinesLine color="green" />
              </Sparklines>
            </div>
          </div>
        </div>
      )}
      {matic.length != 0 && (
        <div className="w-full bg-gray-100 p-2 sm:p-4 rounded-lg shadow-md mb-8">
          <div className="flex items-center justify-between">
            <div className="w-1/5">
              <h2 className="text-lg font-medium text-gray-800">MATIC-USDT</h2>
            </div>
            <div className="w-1/3 sm:w-1/5">
              <h2 className="text-lg font-medium text-gray-800">
                ${parseFloat(matic[matic.length - 1]).toFixed(3)}
              </h2>
              <p className="text-[10px]">
                (
                {isNaN(parseInt(Date.now() / 1000 - parseFloat(ts)))
                  ? parseInt(
                      Date.now() / 1000 -
                        parseFloat(localStorage.getItem("datats"))
                    )
                  : parseInt(Date.now() / 1000 - parseFloat(ts))}{" "}
                secs ago)
              </p>
            </div>
            <div className="w-1/6 sm:w-1/5 text-center">
              <h3 className="text-lg font-medium text-gray-800">
                {" "}
                {matic[matic.length - 1] - matic[matic.length - 2] > 0 ? (
                  <IoIosArrowDropupCircle
                    color="green"
                    size="25px"
                    className="mx-auto"
                  />
                ) : (
                  <IoIosArrowDropdownCircle
                    color="red"
                    size="25px"
                    className="mx-auto"
                  />
                )}
              </h3>
            </div>
            <div className="w-1/4 sm:w-1/3">
              <Sparklines data={matic}>
                <SparklinesLine color="green" />
              </Sparklines>
            </div>
          </div>
        </div>
      )}
      {bnb.length != 0 && (
        <div className="w-full bg-gray-100 p-2 sm:p-4 rounded-lg shadow-md mb-8">
          <div className="flex items-center justify-between">
            <div className="w-1/5">
              <h2 className="text-lg font-medium text-gray-800">BNB-USDT</h2>
            </div>
            <div className="w-1/3 sm:w-1/5">
              <h2 className="text-lg font-medium text-gray-800">
                ${parseFloat(bnb[bnb.length - 1]).toFixed(3)}
              </h2>
              <p className="text-[10px]">
                (
                {isNaN(parseInt(Date.now() / 1000 - parseFloat(ts)))
                  ? parseInt(
                      Date.now() / 1000 -
                        parseFloat(localStorage.getItem("datats"))
                    )
                  : parseInt(Date.now() / 1000 - parseFloat(ts))}{" "}
                secs ago)
              </p>
            </div>
            <div className="w-1/6 sm:w-1/5 text-center">
              <h3 className="text-lg font-medium text-gray-800">
                {" "}
                {bnb[bnb.length - 1] - bnb[bnb.length - 2] > 0 ? (
                  <IoIosArrowDropupCircle
                    color="green"
                    size="25px"
                    className="mx-auto"
                  />
                ) : (
                  <IoIosArrowDropdownCircle
                    color="red"
                    size="25px"
                    className="mx-auto"
                  />
                )}
              </h3>
            </div>
            <div className="w-1/4 sm:w-1/3">
              <Sparklines data={bnb}>
                <SparklinesLine color="green" />
              </Sparklines>
            </div>
          </div>
        </div>
      )}
      {eth.length != 0 && (
        <div className="w-full bg-gray-100 p-2 sm:p-4 rounded-lg shadow-md mb-8">
          <div className="flex items-center justify-between">
            <div className="w-1/5">
              <h2 className="text-lg font-medium text-gray-800">ETH-USDT</h2>
            </div>
            <div className="w-1/3 sm:w-1/5">
              <h2 className="text-lg font-medium text-gray-800">
                ${parseFloat(eth[eth.length - 1]).toFixed(3)}
              </h2>
              <p className="text-[10px]">
                (
                {isNaN(parseInt(Date.now() / 1000 - parseFloat(ts)))
                  ? parseInt(
                      Date.now() / 1000 -
                        parseFloat(localStorage.getItem("datats"))
                    )
                  : parseInt(Date.now() / 1000 - parseFloat(ts))}{" "}
                secs ago)
              </p>
            </div>
            <div className="w-1/6 sm:w-1/5 text-center">
              <h3 className="text-lg font-medium text-gray-800">
                {" "}
                {eth[eth.length - 1] - eth[eth.length - 2] > 0 ? (
                  <IoIosArrowDropupCircle
                    color="green"
                    size="25px"
                    className="mx-auto"
                  />
                ) : (
                  <IoIosArrowDropdownCircle
                    color="red"
                    size="25px"
                    className="mx-auto"
                  />
                )}
              </h3>
            </div>
            <div className="w-1/4 sm:w-1/3">
              <Sparklines data={eth}>
                <SparklinesLine color="green" />
              </Sparklines>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TickerTable;
