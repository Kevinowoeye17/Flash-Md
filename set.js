const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidU9RZXFmOXRRVUpQTmg2eTNHWEg0MVlsOVFiYVdSdWRuSU9BZHBPWFVYOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRjBmUUd4MkpiWWVLNUpHUTNrUzZzQ2hBeTdrT0xDUkxiT2FMbXdjc1N5UT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhS1d5K0VGaEhZVnhLLy85b2ZnTGp5cEdSQ2RwZUZibDFZNUVnMTVRejFBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3bDl1eXljWDYxN2QwZFR1M0tEUU9wc1hIN015Q2ZwOVpZNThqU01nUDJnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdOTmwrTFc2eCtPQUg4S2pwcHV4ZHVxb1hLL2FBdlFlRXNKc3pYdlJqM2c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im93b09IcWhQSWZJcG12OTdLNE9HZTJtSyt2SjhhS28wMHFsVDZ2dS94eTg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0lDck5pUWlIWnZNK0JsMk12R3VQMVp5aHRRWC9uK01HbUFKWmN2eEwzWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZlZGR0krQ3MzMWhYQ1g1RDZkTHJPd1dDb1ZIZWV4Zy9EdDZtRjBDcjJ3RT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InM1TmJjbGtHZjNGUHJicnBuTWtBTzc0dkZPL3d5S3ZxQnFNb3BNekg5OTdObWpwN0FUK0ptQzVMQ2ZzSERRS01oak5mNkJZN0Q2YjlQeUxINVV3V2l3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQxLCJhZHZTZWNyZXRLZXkiOiIrV2lucmpXZmNaakh4NTN5R3lrcm1HYmt2TFJTMHBDcWF3c1UyR3dwNFNFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkxMjUwOTYzNzRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiODQ5QUJDM0QzRTNFNDkwM0ZFMDEwNjE1NTAyRDU2QjgifSwibWVzc2FnZVRpbWVzdGFtcCI6MTczMTY1NjEzM30seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTEyNTA5NjM3NEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI5MDA0OUZDRjY4NTVGMjExREQ3RDk1N0I5NjNCQzlGOSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzMxNjU2MTM1fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJOcVZ6TVBkZFFWcTBvUmNKQkhvOFJRIiwicGhvbmVJZCI6IjhjODc4ZTUzLTZhMDgtNGVkMy04YjE2LWI5YjhkY2RlZWU3NSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWeDhvZnUwL1lCWjZCVXUwN0ZyU1ZmWmR6UEE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRnpiemJBbUMzbjA0cGloWlVRSnJxNzJ3dDFFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjVXRENKWTlTIiwibWUiOnsiaWQiOiIyMzQ5MTI1MDk2Mzc0OjIwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkFTVEHwk4O1In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPdjI0WVFHRUxQejI3a0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJJb1JwbHZ1WXBGVHJSU2JjQXFjUjl0Yk9zcnBjc0tYdldRSDJJTkZtUVNBPSIsImFjY291bnRTaWduYXR1cmUiOiI3SVI1QkQzSTBBd05CQ25mRlI1eURZcEVxVUVTQWZiREY2alJpUzkyMjJsOWIxNDY0NzV2YWdLY1VxVnUxUTBkZDJla0s1SHlEK3ZVOTFqQklUVWFCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiU0tUM1p4TTZRM05DbW8yRkJqV2tWdlZGWi9LY3RwbGxoNlV6Y3E5RkNqdmdIdGF1M0YrNXBrelZaOFdhSzB2MWJySEE5Sm9GOWhiZmgyZEp3QXNWZ0E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTI1MDk2Mzc0OjIwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlNLRWFaYjdtS1JVNjBVbTNBS25FZmJXenJLNlhMQ2w3MWtCOWlEUlprRWcifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzE2NTYxMjksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSWJGIn0=',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "ASTA KING",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2349125096374",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
