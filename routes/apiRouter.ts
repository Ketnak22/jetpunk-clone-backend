import express from 'express';
import multer from 'multer';
import { readFileSync } from 'fs'

const router = express.Router();
const upload = multer({ dest: "uploads/" });

type IdPathMapping = {
    [key: string]: string;
}

type TableList = Array<string>;

interface ReceivedJSON {
    name: string;
    data: IdPathMapping | TableList;
}

interface StoredJSON {
    name: string;
    id: string;
}

router.post("/uploadMap", upload.any(), (req, res) => {
    // Access JSON data and SVG file
    const files = req.files as Express.Multer.File[]; // Type assertion

    const svgFile = files ? files.find(file => file.mimetype === 'image/svg+xml') : null;
    const pathIdMapping = files ? files.find(file => file.mimetype === 'application/json') : null;

    console.log(files)
    if (!svgFile) {
        return res.status(400).send("SVG file is required.");
    }

    // Read and parse the JSON file if it exists
    let pathIdMappingContent: ReceivedJSON | null = null;
    if (pathIdMapping) {
        try {
            const data = readFileSync(pathIdMapping.path, 'utf8');
            pathIdMappingContent = JSON.parse(data) as ReceivedJSON;
            console.log('Received path ID mapping:', pathIdMappingContent);
        } catch (err) {
            console.error('Error reading or parsing path ID mapping:', err);
        }
    } else {
        console.log('No path ID mapping file uploaded.');
    }
    console.log('Received SVG file:', svgFile);

    res.status(200).send('OK');
});

export default router;

/* TODO
    Add error handling and validation
    Store file type in json or database
*/
