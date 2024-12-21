
// 1. Import multer.
import multer from 'multer';

// 2. Configure storage with filename and location.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        // cb(null, new Date().toISOString() + file.originalname);
        //To resolve the issue of colons in filenames for Windows compatibility,the code can be updated as follows:
        cb(
            null,
            new Date().toISOString().replace(/:/g, '_') +
            file.originalname
        );

    },
});

export const upload = multer({
    storage: storage,
});
