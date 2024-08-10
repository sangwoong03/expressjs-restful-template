require("dotenv").config();

const { createApp }  = require("./app");
const { database } = require("./src/models/database");

const app = createApp();

const startServer = async () => {

  /**
   * Health-check Endpoint
   */
  app.get("/ping", (_req, res) => {
    res.json({ message: "pong" })
  });

  await database.initialize()
		.then(() => {
      console.log("SUCCESSED_INITAILIZING_DATABASE");
    })
    .catch((err) => {
      console.log("FAILED_TO_INITAILIZING_DATABASE", err);
      dataSource.destroy();
    });

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`LISTENING_TO_${PORT}`);
  });
};

startServer();
