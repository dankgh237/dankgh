const path = require("path");
const dir =(course,trial,html)=> path.join(__dirname,`../public/pages/${course}/${trial}/${html}`);

module.exports = {dir};
