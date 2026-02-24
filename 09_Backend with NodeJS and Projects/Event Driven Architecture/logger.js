const fs = require("fs");
const os = require("os");

const EventEmitter = require("events");

class Logger extends EventEmitter {
    log(message) {
        this.emit("message", {message});
    }
    
}
const logger = new Logger();
const logFile = "./eventlog.txt";

const logToFile = (event) => {
    const loogMessage = `${new Date().toISOString()} - ${event.message} \n`;

    fs.appendFileSync(logFile, loogMessage);
};

logger.on("message", logToFile);

setInterval(()=> {
    const memoryUsage = (os.freemem() / os.totalmem()) * 100;
    logger.log(`Current memory usage: ${memoryUsage.toFixed(2)}`);

},3000);

logger.log("Application started.");
logger.log("Application event occured.");