import { message } from 'antd';

/**
 * Copies the provided text to the clipboard.
 * @param text - The text to be copied to the clipboard.
 * @returns A promise that resolves when the text has been copied, or rejects if the copy fails.
 */
export const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
        message.success('Copied to clipboard');
    } catch {
        message.error('Failed to copy');
    }
};

/**
 * Downloads the provided text as a file with the specified filename.
 * @param text - The text content to be downloaded as a file.
 * @param filename - The name of the file to be downloaded, including the extension.
 */
export const downloadAsFile = (text: string, filename: string) => {
    // Generate download link
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    // Trigger download
    link.href = url;
    link.download = filename;
    link.click();

    // Clean the URL after the download
    URL.revokeObjectURL(url);
};