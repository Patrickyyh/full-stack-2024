import express , {Express} from 'express';
import { backendServer } from './setupServer';

class Application {
    public initizalize(): void{
        const app: Express = express();
        const server = new backendServer(app);
        server.start();
    }

}

const application:Application = new Application();
application.initizalize();

