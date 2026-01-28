const express = require("express");
const serverConfig = require("./config/serverConfig.js");
const connectDB = require("./config/dbConfig.js");
const Boardrouter = require("./routes/boardRoute.js");
const userRouter = require("./routes/userRoute.js");
const authRoute = require("./routes/authRoute.js");
const cookieParser = require('cookie-parser')
const app = express();
const PORT = serverConfig.PORT;
app.use(express.urlencoded({ extended: true })) 

app.use(cookieParser())
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use('/', authRoute)
app.use('/',Boardrouter);
app.use('/',userRouter);

 app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectDB();
});
    