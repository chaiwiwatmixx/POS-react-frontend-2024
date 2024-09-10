const LastOrPrevious = (position, stat) => {
  let res;
  if (stat.length <= 1) {
    res = stat.length > 0 ? stat[0].totalAmount : "0";
    return res;
  }
  if (position === "Last") {
    res = stat.length > 0 ? stat[stat.length - 1].totalAmount : "0";
  } else {
    res = stat.length > 0 ? stat[stat.length - 2].totalAmount : "0";
  }
  return res;
};

const difference = (statPre, statLast) => {
  let difference;
  if (statPre && statLast) {
    const min = Math.min(Number(statLast), Number(statPre));
    const max = Math.max(Number(statLast), Number(statPre));
    const calculate = Math.abs(((min - max) / max) * 100).toFixed(2);
    difference = String(calculate);
  } else {
    difference = "0";
  }

  return difference;
};

const TopReportUntil = { LastOrPrevious, difference };
export default TopReportUntil;
