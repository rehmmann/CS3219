import express from "express";
import cors from "cors";
import { routes } from "./matching-routes.js";
import Matcher from "./matcher.js";


const QUEUE_NAME = "user-matchlist";
const matcher = new Matcher(QUEUE_NAME);

matcher.intialise().then(
    () =>
    {
        const app = express();
        app.use(cors({
            origin: '*'
        }));
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        app.use("/api", routes);

        app.listen(8080, () => {
            console.log("App Intialised on port 8080");
        });
    }
)

export default matcher;


