const router = require("express").Router();
const path = require("path"); 
const mongooseModel = require("../models/index");  
const {n_trials_,_trials_,courses} = require("../utilities/courses");
let {errorMessage} = require("../utilities/courses");
const {sendError} = require("../utilities/errorPage");
const {dir} = require("../utilities/dir");
const Session = require("../auth/sessions");



/* ==============================================
     Homepage route
    =============================================== */
router.get("/", Session.auth,async(req, res)=>{
    mongooseModel.setRoute(req.path);
    req.session.route = req.path;
    res.sendFile(path.join(__dirname,"../public/index_1_.html"));
});


/* ==============================================
     Form  route
    =============================================== */
    router.get("/form", (req, res)=>{ 
        res.sendFile(path.join(__dirname,"../public/views/__form__.html"));
        // res.sendFile(path.join(__dirname,"../public/views/_____login.html"));
    });

    /* ==============================================
     Homepage route
    =============================================== */
    // router.get("/register", (req, res)=>{ 
    //     res.sendFile(path.join(__dirname,"../public/views/_____register.html"));
    // });


/* ==============================================
     Quizzes Home route
    =============================================== */
router.get("/quizzes",Session.auth, (req, res)=>{
    res.sendFile(path.join(__dirname,"../public/quizzes_1_.html"));
    req.session.route = req.path;
    mongooseModel.setRoute(req.path);
});


/* ==============================================
     Dynamic Quiz route using params
    =============================================== */
router.get("/quizzes/:trial/:course",Session.auth,  (req, res)=>{
    const {trial,course} = req.params;
    if(!courses.includes(course)) {
        errorMessage = `
            <h2>Invalid course entry </h2>
            <h4>@ ${course}</h4>
            <h6>We provide quizzes for either ${courses.map(i=>`<b>${i}</b>`).join("")} </h6>
        `;
        return res.redirect("/error");
    };
    if( course=="nursing" && !n_trials_.includes(trial)) {
        errorMessage = `
        <h2>Invalid trial entry </h2>
        <h4>APP ERROR: @ ${trial}</h4>
        <h6> You are allowed access to only trial ${1} to ${n_trials_.length} </h6>
    `;
    return res.redirect("/error");

    };
    if( course=="midwifery" && !_trials_.includes(trial)) {
        errorMessage = `
        <h2>Invalid trial entry </h2>
        <h4>APP ERROR: @ ${trial}</h4>
        <h6> You are allowed access to only trial ${1} to ${_trials_.length} </h6>
    `;
    return res.redirect("/error");

    };
    if( course=="mental health nursing" && !_trials_.includes(trial)) {
        errorMessage = `
        <h2>Invalid trial entry </h2>
        <h4>APP ERROR: @ ${trial}</h4>
        <h6> You are allowed access to only trial ${1} to ${_trials_.length} </h6>
    `;
    return res.redirect("/error");

    };

    if( course=="nursing" && n_trials_.includes(trial)) {
        mongooseModel.setRoute(req.path);
        return res.sendFile(dir(course,trial,'nursing.html'));
    };
    if( course=="midwifery" && _trials_.includes(trial)) {
        mongooseModel.setRoute(req.path);
        return res.sendFile(dir(course,trial,'midwifery.html'));
    };
    if( course=="mental health nursing" && _trials_.includes(trial)) {
        mongooseModel.setRoute(req.path);
        return res.sendFile(dir(course,trial,'mental-health.html'));
    };
  
    res.sendFile(path.join(__dirname,"/public/pages/nursing/trial-1/nursing.html"));
    mongooseModel.setRoute(req.path);
});



/* ==============================================
     Return Error Route
    =============================================== */
router.get("/error", (req, res)=>{
    if(!errorMessage) return res.redirect("/");
    res.send(sendError(req, errorMessage));
});


router.get("*",(req,res)=>{
    errorMessage = `
            <h2> Oops Invalid Request </h2>
            <h4>Error: ${req.originalUrl}</h4>
            <h6>Please check your web address entry </h6>
        `;
        return res.redirect("/error");

})

/* ==============================================
     Export router
    =============================================== */
module.exports = router;