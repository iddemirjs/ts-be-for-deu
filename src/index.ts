import express, {Application, Request, Response} from "express";
import Database from "./config/database";
import NoteRouter from "./router/NoteRouter";
import AuthenticationRouter from "./router/AuthenticationRouter";

class App{
    public app: Application;

    constructor() {
        this.app = express();
        this.databaseSync();
        this.plugins();
        this.routes();
    }

    protected routes(): void {
        this.app.route("/").get((req: Request, res: Response) => {
            res.send("welcome idris");
        });

        this.app.use("/api/v1/note", NoteRouter);
        this.app.use("/api/v1/auth", AuthenticationRouter);
    }

    protected databaseSync(): void {
        const db = new Database();
        db.sequelize?.sync();
    }

    // add plugin
    protected plugins(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }
}
const port: number = 8000;
const app: Application = new App().app;

app.listen(port, () => {
   console.log("App is running... 🏃🏻");
});
// Kaldık : https://youtu.be/cv4ywZvS-go?t=1772
