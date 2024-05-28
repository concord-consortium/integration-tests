export const output = [
  { algae: {may: "Low", jun: "Med", jul: "Med", aug: "Med", sep: "High"},
  nitrate: {may: "Med", jun: "Med", jul: "Med", aug: "High", sep: "High"},
  turbidity: {may: "Low", jun: "Med", jul: "Med", aug: "Med", sep: "High" }},
  { algae: {may: "Med", jun: "Med", jul: "Med", aug: "Med", sep: "Med"},
  nitrate: {may: "Med", jun: "Med", jul: "Med", aug: "Med", sep: "Med"},
  turbidity: {may: "Med", jun: "Med", jul: "Med", aug: "Med", sep: "Med" }},
  { algae: {may: "High", jun: "High", jul: "High", aug: "Med", sep: "Med"},
  nitrate: {may: "Med", jun: "Med", jul: "Med", aug: "Low", sep: "Low"},
  turbidity: {may: "High", jun: "High", jul: "High", aug: "Med", sep: "Med" }}];

export const experimentConfigs = [
  {
    trial: 1,
    algae: "Low",
    clams: "1",
    result: output[0]
  },
  {
    trial: 2,
    algae: "Med",
    clams: "5",
    result: output[1]
  },
  {
    trial: 3,
    algae: "High",
    clams: "10",
    result: output[2]
  }
];

export const time = { finalTime: "Sep" };
