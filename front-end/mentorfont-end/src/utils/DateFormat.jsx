const FormatTime = (date) => {
  const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
  const units = [
    { label: "y", value: 31536000 },
    { label: "mo", value: 2592000 },
    { label: "d", value: 86400 },
    { label: "h", value: 3600 },
    { label: "m", value: 60 },
    { label: "s", value: 1 },
  ];

  for (let unit of units) {
    const quotient = Math.floor(seconds / unit.value);
    if (quotient === 1 && unit.label === "d") {
      return "Yesterday";
    }
    if (quotient > 0)
      return `${quotient} ${unit.label}${quotient > 1 ? "s" : ""} ago`;
  }

  return "Just now";
};

export default FormatTime;
