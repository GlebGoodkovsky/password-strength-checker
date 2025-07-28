const fs = require('fs');
const path = require('path');

// Determine the full path to your index.html
// This assumes update-html.js is in the same directory as index.html
const htmlFilePath = path.join(__dirname, 'index.html');

try {
    // Read the current content of index.html
    let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

    // Generate a unique timestamp (e.g., milliseconds since Jan 1, 1970)
    const timestamp = Date.now();

    // Define the files you want to cache-bust
    const filesToUpdate = [
        'css/main.css',
        'js/zxcvbn.js',
        'js/checker.js'
    ];

    // Loop through each file and update its URL in the HTML content
    filesToUpdate.forEach(originalPath => {
        // Construct a regular expression to find the file's reference in href or src attributes.
        // It accounts for existing query parameters (like "?v=12345") and removes them before adding the new one.
        // The `(?:\\?v=\\d+)?` part is a non-capturing group for the optional existing timestamp.
        const regex = new RegExp(`(href|src)="(.*?${originalPath})(?:\\?v=\\d+)?"`, 'g');
        const newUrl = `${originalPath}?v=${timestamp}`;

        // Replace the old URL with the new cache-busted URL
        // We use a replacer function to ensure we only modify the exact target paths
        htmlContent = htmlContent.replace(regex, (match, attrName, currentPathBase) => {
            // Check if the captured path base truly ends with our originalPath to avoid partial matches
            if (currentPathBase.endsWith(originalPath)) {
                console.log(`Updating ${attrName} for ${originalPath}: adding/updating timestamp.`);
                return `${attrName}="${newUrl}"`;
            }
            return match; // If it's not our exact target, return the original matched string
        });
    });

    // Write the modified HTML content back to index.html
    fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
    console.log('index.html updated successfully with cache-busting timestamps.');

} catch (error) {
    console.error('Error updating index.html:', error);
    console.error('Please ensure update-html.js is in the same directory as index.html or adjust htmlFilePath.');
}
