// DOM Elements
const menuUnescape = document.getElementById('menu-unescape');
const menuFormatJson = document.getElementById('menu-format-json');
const unescapePage = document.getElementById('unescapePage');
const formatJsonPage = document.getElementById('formatJsonPage');

const inputUnescape = document.getElementById('inputUnescape');
const outputUnescape = document.getElementById('outputUnescape');
const unescapeButton = document.getElementById('unescapeButton');
const copyUnescape = document.getElementById('copyUnescape');
const copyUnescapeMessage = document.getElementById('copyUnescapeMessage');

const inputJson = document.getElementById('inputJson');
const outputJson = document.getElementById('outputJson');
const formatJsonButton = document.getElementById('formatJsonButton');
const copyJson = document.getElementById('copyJson');
const copyJsonMessage = document.getElementById('copyJsonMessage');

// Show the Unescape String page
menuUnescape.addEventListener('click', () => {
    menuUnescape.classList.add('active');
    menuFormatJson.classList.remove('active');
    unescapePage.classList.remove('hidden');
    formatJsonPage.classList.add('hidden');
});

// Show the Format JSON page
menuFormatJson.addEventListener('click', () => {
    menuFormatJson.classList.add('active');
    menuUnescape.classList.remove('active');
    formatJsonPage.classList.remove('hidden');
    unescapePage.classList.add('hidden');
});

function unescapeJavaString(input) {
    return input
        .replace(/\\n/g, '\n') // unescape \n 
        .replace(/\\t/g, '\t') // unescape \t 
        .replace(/\\r/g, '\r') // unescape \r 
        .replace(/\\"/g, '"')  // unescape \" 
        .replace(/\\\\/g, '\\'); // unescape \\ 
}

function trimQuotes(str) {
    str = str.trim();
    if (str.startsWith('"') && str.endsWith('"')) {
        return str.substring(1, str.length - 1);
    }
    return str;
}
// Unescape String functionality
unescapeButton.addEventListener('click', () => {
    try {
        const input = inputUnescape.value;
        const trimQuotesText = trimQuotes(input);
        const updatedText = unescapeJavaString(trimQuotesText);
        const result = updatedText;
        outputUnescape.textContent = result;
    } catch (error) {
        outputUnescape.textContent = `Error: ${error.message}`;
    }
});

// Copy Unescaped Result
copyUnescape.addEventListener('click', () => {
    const text = outputUnescape.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const time = new Date().toLocaleTimeString();
        copyUnescapeMessage.textContent = `Copied to clipboard! (${time})`;
    }).catch(err => {
        copyUnescapeMessage.textContent = `Failed to copy: ${err}`;
    });
});

// Format JSON functionality
formatJsonButton.addEventListener('click', () => {
    try {
        const input = inputJson.value;
        const json = JSON.parse(input);
        const formatted = JSON.stringify(json, null, 4);
        outputJson.textContent = formatted;
    } catch (error) {
        outputJson.textContent = `Error: ${error.message}`;
    }
});

// Copy Formatted JSON Result
copyJson.addEventListener('click', () => {
    const text = outputJson.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const time = new Date().toLocaleTimeString();
        copyJsonMessage.textContent = `Copied to clipboard! (${time})`;
    }).catch(err => {
        copyJsonMessage.textContent = `Failed to copy: ${err}`;
    });
});