const crypto = require('crypto');
const constant = require('../Values/constant');

// Encryption function
function encrypt(text) {
    const algorithm = 'aes-256-cbc';
    const ENCRYPTION_KEY = constant.ENCRYPTION_KEY; // Securely store this key
    const IV = constant.IV; // Random Initialization Vector

    console.log("Encryption Key:", ENCRYPTION_KEY);
    console.log("IV:", IV);
    console.log("Text to Encrypt:", text);

    if (!text) {
        throw new Error("Text parameter is required for encryption.");
    }

    // Convert text to string if it's an ObjectId or any other type
    if (typeof text !== 'string') {
        text = text.toString();
    }

    let cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), Buffer.from(IV));

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return encrypted;
}

module.exports = encrypt; // Export the function itself
