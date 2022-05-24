import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const extArray = file.mimetype.split("/");
    const extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + "-" + Date.now() + "." + extension);
  },
});
function checkFileType(file: any, cb: any) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
}
export const upload = multer({
  storage: storage,
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  },
});
