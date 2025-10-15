import express from 'express';
import multer from 'multer';
import path from 'path';

import { addMapToDb } from '../db.ts';

const router = express.Router();
const upload = multer({ dest: "uploads/" });

type IdPathMapping = {
    [key: string]: string;
}

type TableList = Array<string>;

router.post("/uploadMap", upload.any(), (req, res) => {
    const files = req.files as Express.Multer.File[];
    
    const svgFile = files ? files.find(file => file.mimetype === 'image/svg+xml') : null;
    const pathIdMapping = files ? files.find(file => file.mimetype === 'application/json') : null;

    const name = req.body.name as string | null;

    if (!name) {
        return res.status(400).send("Name is required.");
    }

    if (!svgFile) {
        return res.status(400).send("SVG file is required.");
    }

    if (!pathIdMapping) {
        return res.status(400).send("JSON file is required.");
    }

    const svgFilename = path.parse(svgFile.filename).name;
    let jsonFilename = path.parse(pathIdMapping?.filename).name;

    addMapToDb(name, jsonFilename, svgFilename);

    console.log('SVG filename:', svgFilename);
    console.log('JSON filename:', jsonFilename);
    console.log("Name:", name);

    res.status(200).send('OK');
});

export default router;

/* TODO
    Add error handling and validation
    Store file type in json or database
*/
