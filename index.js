#!

const net = require("net");
const http = require("http");
const fs = require("fs");

let private_ip;
let private_port;

function updateIP() {
    const ip_raw = JSON.parse(fs.readFileSync("./ipaddr.json").toString());
    console.log("ip: " + JSON.stringify(ip_raw));
    
    private_ip = ip_raw.ip;
    private_port = ip_raw.port;
}

updateIP();

setInterval(() => {
    updateIP();
}, 5000);

net.createServer((req) => {
    try {
        const client = net.createConnection({
            host: private_ip,
            port: private_port
        });
        
        req.pipe(client);
        client.pipe(req);
    } catch(e) {
        console.error(e);
    }
}).listen(6969).on("error", (e) => {
    console.error(e);
});

http.createServer((req, res) => {
    if(req.url === "/changeip") {
        if(req.headers.authorization === "chicken") {
            const ip = req.headers.ip;
            const port = req.headers.port;
            res.writeHead(200);
            res.end("ok");
            
            fs.writeFileSync("./ipaddr.json", JSON.stringify({
                ip: ip,
                port: port,
            }));
            
            return;
        }
    }
    
    res.writeHead(404);
    res.end("Not Found");
}).listen(8989);
