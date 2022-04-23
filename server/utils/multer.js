const multer = require("multer");
const path = require ("path")


module.exports = multer({
     storage:multer.diskStorage({}),
     fileFilter:(req,file,cb)=>{
          let ext= path.extname(file.originalname);
          if(ext!==".jpg"&& ext !== ".jpeg"&& ext!==".png"){
               cb(new Error("File type not supported"), false);
               return
          }
          cb(null, true)
     }
})


// const storage = multer.diskStorage({
//      destination: function (req, files, cb) {
//           console.log(req.file);
//           cb(null, "public/");
//      },
//      filename: function (req, file, cb) {
//           cb(null, new Date().toISOString() + "-" + file.originalname);
//      },
// });

// const fileFilter = (req, file, cb) => {
//      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//           cb(null, true);
//      } else {
//           cb({ message: " Unsupported File Format" }, false);
//      }
// };

// const upload = multer({
//      storage: storage,
//      limits: { fileSize: 1024 * 1024 },
//      fileFilter: fileFilter,
// });

// module.exports = upload;
