function https_server(req, res, next) {

    if (process.env.NODE_ENV != 'development' && !req.secure) {
       return response.redirect("https://" + req.headers.host + req.path);
    }

    next();
}

module.exports = {https_server} ;