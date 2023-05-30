export const barGraph = [
    { sugarUsed: {zero: "0%", four: "4%", eight: "5%", twelve: "6%", sixteen: "7%", twenty: "7%", twentyFour: "7%", twentyEight: "7%"},
      sugarCreated: {zero: "0%", four: "10%", eight: "13%", twelve: "15%", sixteen: "16%", twenty: "16%", twentyFour: "16%", twentyEight: "16%"} },
    { sugarUsed: {zero: "0%", four: "13%", eight: "18%", twelve: "21%", sixteen: "24%", twenty: "28%", twentyFour: "34%", twentyEight: "40%"},
      sugarCreated: {zero: "0%", four: "30%", eight: "48%", twelve: "50%", sixteen: "58%", twenty: "70%", twentyFour: "78%", twentyEight: "100%"} },
    { sugarUsed: {zero: "0%", four: "0%", eight: "0%", twelve: "0%", sixteen: "0%", twenty: "0%", twentyFour: "0%", twentyEight: "0%"},
      sugarCreated: {zero: "0%", four: "0%", eight: "0%", twelve: "0%", sixteen: "0%", twenty: "0%", twentyFour: "0%", twentyEight: "0%"} },
    { sugarUsed: {zero: "0%", four: "8%", eight: "9%", twelve: "10%", sixteen: "10%", twenty: "10%", twentyFour: "10%", twentyEight: "10%"},
      sugarCreated: {zero: "0%", four: "22%", eight: "23%", twelve: "24%", sixteen: "25%", twenty: "25%", twentyFour: "25%", twentyEight: "25%"} }];

export const output = [
    { sugarUsed: {zero: "None", four: "None", eight: "None", twelve: "None", sixteen: "None", twenty: "None", twentyFour: "None", twentyEight: "None"},
      sugarCreated: {zero: "None", four: "Low", eight: "Low", twelve: "Low", sixteen: "Low", twenty: "Low", twentyFour: "Low", twentyEight: "Low"} },
    { sugarUsed: {zero: "None", four: "Low", eight: "Low", twelve: "Low", sixteen: "Low", twenty: "Low", twentyFour: "Low", twentyEight: "Medium"},
      sugarCreated: {zero: "None", four: "Low", eight: "Medium", twelve: "Medium", sixteen: "Medium", twenty: "Medium", twentyFour: "Medium", twentyEight: "High"} },
    { sugarUsed: {zero: "None", four: "None", eight: "None", twelve: "None", sixteen: "None", twenty: "None", twentyFour: "None", twentyEight: "None"},
      sugarCreated: {zero: "None", four: "None", eight: "None", twelve: "None", sixteen: "None", twenty: "None", twentyFour: "None", twentyEight: "None"} },
    { sugarUsed: {zero: "None", four: "None", eight: "None", twelve: "Low", sixteen: "Low", twenty: "Low", twentyFour: "Low", twentyEight: "Low"},
      sugarCreated: {zero: "None", four: "Low", eight: "Low", twelve: "Low", sixteen: "Low", twenty: "Low", twentyFour: "Low", twentyEight: "Low"} }];

export const experimentConfigs = [
    {
      trial: 1,
      light: "Some",
      water: "Some",
      co2: "Some",
      graph: barGraph[0],
      result: output[0]
    },
    {
      trial: 2,
      light: "Full",
      water: "Full",
      co2: "Full",
      graph: barGraph[1],
      result: output[1]
    },
    {
      trial: 3,
      light: "None",
      water: "None",
      co2: "None",
      graph: barGraph[2],
      result: output[2]
    },
    {
      trial: 4,
      light: "Some",
      water: "Full",
      co2: "Full",
      graph: barGraph[3],
      result: output[3]
    },
];

export const time = { finalTime: "Time: 28 days" };
