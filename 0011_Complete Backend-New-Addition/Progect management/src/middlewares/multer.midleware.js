import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, file, cd) {
        cd(null, `./public/images`);
    },
    filename: function(req, file, cd) {
        cd(null, `${Date.now()}-${file.originalname}`);
    },
});

export const upload = multer({
    storage,
    limits: {
        fileSize: 1 * 1000 * 1000,
    },
});