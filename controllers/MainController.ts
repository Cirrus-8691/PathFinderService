import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import { Health } from "../views/interfaces/Health";
import fs from "fs";

export default class MainController {

    private router: FastifyInstance;

    private version : string = "1.0";
    private apiName : string = "pathfinder-api";

    constructor(router: FastifyInstance) {
        this.router = router

        router.get("/api",
            this.sayHello.bind(this));

        router.get("/api/version",
            this.healthCheck.bind(this));
    }

    /**
     * Entry point of the service with small htmp help
    * @param request default Request for log
    */
    async sayHello(request : FastifyRequest,reply : FastifyReply)
    {
        try
        {
            request.log.info( "SW - api" );

            const stream = fs.createReadStream("./assets/serviceIndex.html")
            reply.type("text/html").send(stream);
        }
        catch(error) {
             request.log.error( error );
            return Promise.reject(error);
        }
    }

    /**
    * Healthcheck endpoint
    * In each service we need an endpoint to check if the API is alive.
    *  WS: /api/version
    *  
    * @param request default Request for log
    */
   async healthCheck(request : FastifyRequest): Promise<Health> {
        try
        {
            request.log.info( "SW - version" );

            return {
                name : this.apiName,
                version: this.version,
                time: Date.now()
            };
        }
        catch(error) {
            // Ok, it will never happen. It's just to be consistent with the other Controllers.
            // That way, if later we add code that throws exception it will already be taken care of.
            request.log.error( error );
            return Promise.reject<Health>(error);
        }
    }
}