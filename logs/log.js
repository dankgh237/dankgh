const log=(req)=>{
    const modified = `${req.get("If-Modified-Since")}`; 
    const url=`${req.method}: ${req.protocol}:v${req.httpVersion} ${req.get("host")}${req.path} ${req.socket.remoteAddress}`;
    const platform = `${req.get("sec-ch-ua-platform")} ${req.get("sec-ch-ua")} ${new Date()}`;
    return `${url} ${platform} \r\n`;
}

module.exports = {log};