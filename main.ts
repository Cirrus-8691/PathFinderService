import HttpGateway from "./HttpGateway";
import MainController from "./controllers/MainController";
import PathFinderController from "./controllers/PathFinderController";

/**
 * Main function to start server
 */
(async function main() {
    // Init Fastify router
    const http = new HttpGateway();

    // Controllers
    new MainController(http.router);
    new PathFinderController(http.router);

    // Fastify router start
    await http.start();
})()
