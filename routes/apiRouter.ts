import express from 'express';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/uploadMap", upload.any(), (req, res) => {
    // Access JSON data and SVG file
    const files = req.files as Express.Multer.File[]; // Type assertion

    const svgFile = files ? files.find(file => file.mimetype === 'image/svg+xml') : null;
    const pathIdMapping = files ? files.find(file => file.mimetype === 'application/json') : null;

    console.log(files)
    if (!svgFile) {
        return res.status(400).send("SVG file is required.");
    }

    // Optionally log or process the SVG file
    console.log('Received path ID mapping:', pathIdMapping);
    console.log('Received SVG file:', svgFile);

    res.status(200).send('OK');
});

export default router;

/* TODO
    Add error handling and validation
    Store file type in json or database
*/
