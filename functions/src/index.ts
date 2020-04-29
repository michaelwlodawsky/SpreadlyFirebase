import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';

import * as os from 'os';
import * as path from 'path';

const QRCode = require('qrcode');

admin.initializeApp();


const IMAGE_PATH = path.join(os.tmpdir(), 'code.png')

export const generateQRCode = functions.auth.user().onCreate(async (user) => {
    // UID will be the link tied to the QR Code
    const uid = user.uid;

    QRCode.toFile(IMAGE_PATH, uid);
    const bucket = admin.storage().bucket("spreadly-core.appspot.com")
    await bucket.upload(IMAGE_PATH, {
        destination: `${uid}.png`
    })
    
});
