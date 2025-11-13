import express from 'express';
import multer from 'multer'; 
import auth from '../middleware/auth.js'; 
import { analyzeStatement } from '../services/geminiService.js'; 

const router = express.Router();


const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
});

const pdfOnly = (req, res, next) => {
    const uploadMiddleware = upload.single('statementFile'); 

    uploadMiddleware(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ msg: `File upload error: ${err.message}` });
        } else if (err) {
            return res.status(500).json({ msg: `Unknown upload error: ${err.message}` });
        }

        if (req.file && req.file.mimetype !== 'application/pdf') {
            return res.status(400).json({ msg: 'Only PDF files are allowed.' });
        }
        next();
    });
};


router.post('/upload', auth, pdfOnly, async (req, res) => {
    
    if (!req.file) {
        return res.status(400).json({ msg: 'No file uploaded.' });
    }
    
    try {
        const transactions = await analyzeStatement(req.file.buffer);

        res.json({ 
            msg: "Statement parsed successfully. Review transactions before import.",
            transactions: transactions 
        });

    } catch (err) {
        console.error("Statement Processing Error:", err.message);
        res.status(500).send('Server Error during AI processing. Check server logs.');
    }
});

export default router;