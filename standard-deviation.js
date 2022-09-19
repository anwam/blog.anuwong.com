const data = [16, 15, 20, 26, 17];
const l = data.length;
const sum = data.reduce((acc, v) => acc + v, 0);
const mean = sum / l;
const sd = Math.sqrt(
  data.map((d) => Math.pow(d - mean, 2)).reduce((acc, s) => acc + s, 0) /
    (data.length - 1)
);
console.log({ mean, sd });
