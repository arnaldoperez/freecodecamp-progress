import express from "express";
import cors from "cors";
import routes from "./server/routes";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());


function serveFrontend() {
    const frontendBuildPath = path.resolve(process.cwd(), 'dist');
    console.log("Serving frontend from:", frontendBuildPath);
    return express.static(frontendBuildPath);
}

app.use("/", serveFrontend());

app.use("/api", routes)

app.listen(3000, () => {
    console.log("Server started on port 3000");
});