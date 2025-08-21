import os from "os";
import v8 from "v8";

// check-memory.js
console.log("==== Node.js Memory Info ====");
console.log(process.memoryUsage());
console.log("Max old space size (heap limit) :", v8.getHeapStatistics().heap_size_limit / 1024 / 1024, "MB");

console.log("Node.js version:", process.version);

console.log("==== System Memory ====");
console.log("Total RAM:", (os.totalmem() / 1024 / 1024).toFixed(2), "MB");
console.log("Free RAM:", (os.freemem() / 1024 / 1024).toFixed(2), "MB");
