const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.memoryStorage();
exports.upload = multer({ storage: storage });


exports.uploadFile = async (req,res) => {
    try {
        const { directory } = req.body;
        const file = req.file;

        if (!directory || !file) {
            return res.status(400).json({ error: "Directory and file are required" });
        }

        // const dirPath = path.join(__dirname, "..", directory);
        const dirPath = path.join(directory);

        // Create directory if it doesn't exist
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // Save the file inside the directory
        const filePath = path.join(dirPath, file.originalname);
        fs.writeFileSync(filePath, file.buffer);

        return res.status(200).json({
            message: "File uploaded successfully",
            fileName: file.originalname,
            filePath: filePath
        });

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }


}


