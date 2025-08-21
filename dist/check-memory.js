"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const v8 = require("v8");
function checkMemory() {
    console.log("==== Node.js Memory Info ====");
    console.log("Process Memory Usage:", process.memoryUsage());
    console.log("Max old space size (heap limit):", (v8.getHeapStatistics().heap_size_limit / 1024 / 1024).toFixed(2), "MB");
    console.log("Total System RAM:", (os.totalmem() / 1024 / 1024).toFixed(2), "MB");
    console.log("Free System RAM:", (os.freemem() / 1024 / 1024).toFixed(2), "MB");
}
checkMemory();
