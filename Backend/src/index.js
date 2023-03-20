const express = require("express"); 
const {connectToDb} = require("../src/database/conncetion");
const v1UserRouter = require("./v1/routes/userRoutes");
const v2TeamRouter = require("./v2/routes/teamRoutes");
const v3AccountRouter = require("./v3/routes/accountRoutes");
const v4TeamUserRouter = require("./v4/routes/teaamUserRoutes");
const app = express(); 
const cors = require("cors");
const { swaggerDocs: V1SwaggerDocs} = require ("./v1/routes/swagger");
const PORT = process.env.PORT || 3000; 


app.use(express.json());
app.use(cors());
app.use("/api/v1/users", v1UserRouter);
app.use("/api/v2/teams", v2TeamRouter);
app.use("/api/v3/accounts", v3AccountRouter);
app.use("/api/v4/teamUser", v4TeamUserRouter);

app.listen(PORT, async () => { 
    console.log(`API is listening on port ${PORT}`);
    V1SwaggerDocs(app, PORT);
    await connectToDb(); 
});

module.exports = app;