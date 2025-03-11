const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Multer Storage (Using Memory Storage)
const storage = multer.memoryStorage();
exports.upload = multer({ storage: storage });

exports.uploadFile = async (req, res) => {
    try {
        const { directory } = req.body;
        const file = req.file;

        if (!directory || !file) {
            return res.status(400).json({ error: "Directory and file are required" });
        }

        // Define the directory inside the "public" folder
        const publicDir = path.join(__dirname, "..", "public", directory);

        // Create directory if it doesn’t exist
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }

        // Extract file extension and name
        const fileExt = path.extname(file.originalname);
        const fileBaseName = path.basename(file.originalname, fileExt);
        let newFileName = file.originalname;
        let filePath = path.join(publicDir, newFileName);
        let counter = 1;

        // Check if file already exists and rename if necessary
        while (fs.existsSync(filePath)) {
            newFileName = `${fileBaseName}_${counter}${fileExt}`;
            filePath = path.join(publicDir, newFileName);
            counter++;
        }

        // Save file
        fs.writeFileSync(filePath, file.buffer);

        // Construct response path (relative to `public/`)
        const responsePath = path.join(directory, newFileName).replace(/\\/g, "/");

        return res.status(200).json({
            message: "File uploaded successfully",
            fileName: newFileName,
            filePath: responsePath
        });

    } catch (error) {
        console.error("Error uploading file:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};
