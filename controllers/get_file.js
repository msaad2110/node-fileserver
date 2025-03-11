const path = require("path");
const fs = require("fs");

const getFile = async (req, res) => {
    try {
        const { filePath } = req.body; // Ensure this is coming from form-data

        console.log("Request Body:", req.body); // Debugging

        if (!filePath) {
            return res.status(400).json({ message: "File path not provided", hasError: true });
        }

        // Normalize file path and resolve within the "public" directory
        const publicDir = path.join(__dirname, "..", "public");
        // const publicDir = path.join("public");
        const resolvedPath = path.join(publicDir, filePath);

        console.log("Resolved Path:", resolvedPath); // Debugging

        // Check if the file exists
        if (!fs.existsSync(resolvedPath)) {
            return res.status(404).json({ message: "File not found", hasError: true });
        }

        // ✅ Return the file path instead of downloading
        return res.status(200).json({
            message: "File path retrieved successfully",
            filePath: filePath.replace(/\//g, "\\"),
            hasError: false
        });

    } catch (error) {
        console.error("Error fetching file:", error);
        return res.status(500).json({ message: "Internal Server Error", hasError: true });
    }
};

module.exports = { getFile };
