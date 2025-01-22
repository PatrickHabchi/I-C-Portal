import React, { useState, useEffect } from "react";

export default function UtcToLocal({ utcTimestamp, options }) {
  const [localTimestamp, setLocalTimestamp] = useState("");

  // this format for only date
  // const options = {
  //     weekday: 'short',
  //     day: 'numeric',
  //     month: 'short',
  //     year: 'numeric',
  // };

  useEffect(() => {
    const getTimezone = async () => {
      const { timeZone } = await Intl.DateTimeFormat().resolvedOptions();
      setLocalTimestamp(new Date(Date.parse(utcTimestamp)).toLocaleString("en-US", { ...options, timeZone }));
    };
    getTimezone();
  }, [utcTimestamp]);

  return <div>{localTimestamp}</div>;
}
