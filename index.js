let count = 0;
setInterval(
  () =>
    require("node-fetch")(process.env.URL).then(() =>
      console.log(`[${++count}] i pinged ${process.env.URL}`)
    ),
  5 * 60 * 1000
);
require('./server.js')