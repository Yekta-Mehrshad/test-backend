const crypto = require('crypto');
const constant = require('../Values/constant');


function decrypt(text) {
    const algorithm = 'aes-256-cbc';
    const ENCRYPTION_KEY = constant.ENCRYPTION_KEY;
    const IV = constant.IV;

    console.log("Encryption Key:", ENCRYPTION_KEY);
    console.log("IV:", IV);
    console.log("Text to Decrypt:", text);

    if (!text) {
        throw new Error("Text parameter is required for decryption.");
    }

    let iv = Buffer.from(IV, 'hex');
    let encryptionKey = Buffer.from(ENCRYPTION_KEY, 'hex');


    if (iv.length !== 16) {
        throw new Error('Invalid IV length, must be 16 bytes');
    }

    if (encryptionKey.length !== 32) {
        throw new Error('Invalid ENCRYPTION_KEY length, must be 32 bytes');
    }

    let encryptedText = Buffer.from(text, 'hex');

    let decipher = crypto.createDecipheriv(algorithm, encryptionKey, iv);

    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

module.exports = decrypt;
