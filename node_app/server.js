require("dotenv").config()

const { createApp }  = require("./app")
const { dataSource } = require("./src/models/dataSource")

const startServer = async () => {
  const app = createApp()

  app.get("/ping", (req, res) => {
    res.json({ message: "pong" })
  })

  await dataSource.initialize()
		.then(() => {
      console.log("SUCCESSED_INITAILIZING_DATABASE");
    })
    .catch((err) => {
      console.log("FAILED_TO_INITAILIZING_DATABASE");
      dataSource.destroy();
    })

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`LISTENING_TO_${PORT}`);
  });
};

startServer();
