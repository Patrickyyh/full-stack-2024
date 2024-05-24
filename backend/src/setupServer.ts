import {Application , json , urlencoded, Response , Request,NextFunction} from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import cookieSession from 'cookie-session';
import 'express-async-errors'
import compression from 'compression';

const SERVER_PORT = process.env.PORT || 4000;


export class backendServer {
    private app: Application;
    constructor(app: Application) {
        this.app = app;
    }

    public start(): void {
        this.securityMiddleWare(this.app);
        this.standardMiddleWare(this.app);
        this.routeMiddleWare(this.app);
        this.globalErrorHandler(this.app);
        this.startServer(this.app);
    }

    private  securityMiddleWare(app: Application):void{
        app.use(
            cookieSession(
                {
                    name: 'session',
                    keys: ['test1','test2'],
                    maxAge: 24 * 7 * 60 * 60 * 1000,
                    secure: false,
                }
            )
        )

        // to protect against HTTP Parameter Pollution attacks
        app.use(hpp());

        // Helmet helps secure Express apps by setting HTTP response headers.
        app.use(helmet());

        // Enable CORS
        app.use(cors({
            origin: '*',
            credentials: true,
            optionsSuccessStatus: 200,
            methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'],

        }));

    }

    private  standardMiddleWare(app: Application):void{
        app.use(compression());
        app.use(json({limit : '50mb'}));
        app.use(urlencoded({extended: true , limit : '50mb'}));

    }
    private  routeMiddleWare(app: Application):void{}
    private  globalErrorHandler(app: Application):void{}
    private async startServer(app: Application): Promise<void>{
        try {
            const httpServer: http.Server = new http.Server(app);
            this.startHttpServer(httpServer);


        } catch (error) {

        }
    }
    private  createSocketIO(httpServer: http.Server):void{}

    private  startHttpServer(httpServer: http.Server):void{
        httpServer.listen(SERVER_PORT, () => {
            console.log(`Server started on port ${SERVER_PORT}`);
        });

    }

}
