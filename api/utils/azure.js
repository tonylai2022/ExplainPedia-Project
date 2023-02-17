// For details, please visit: https://learn.microsoft.com/en-us/azure/developer/javascript/tutorial/convert-text-to-speech-cognitive-services

//Azure is required to have the audio function 

// Import the required libraries
const sdk = require('microsoft-cognitiveservices-speech-sdk');
const { Buffer } = require('buffer');
const { PassThrough } = require('stream');

// Load environment variables using dotenv
require('dotenv').config()

// Retrieve the Azure resource key from environment variables
const AZURE_RESOURCE_KEY = process.env.AZURE_RESOURCE_KEY
// Set the Azure resource region to 'eastus'
const AZURE_RESOURCE_REGION = "eastus"

/**
 * Node.js server code to convert text to speech
 * @returns stream
 * @param {*} text text to convert to audio/speech
 */
const textToSpeech = async (text) => {

    // Convert callback function to promise
    return new Promise((resolve, reject) => {

        // Create a SpeechConfig object using the Azure resource key and region
        const speechConfig = sdk.SpeechConfig.fromSubscription(AZURE_RESOURCE_KEY, AZURE_RESOURCE_REGION);
        // Set the speech synthesis output format to mp3
        speechConfig.speechSynthesisOutputFormat = 5; // mp3

        // Initialize an AudioConfig object to null
        let audioConfig = null;

        // Create a SpeechSynthesizer object using the SpeechConfig and AudioConfig objects
        const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

        // Call the speakTextAsync method on the SpeechSynthesizer object, passing in the text to be converted to speech, as well as callback functions for when the speech is completed or when an error occurs
        synthesizer.speakTextAsync(
            text,
            result => {

                // Retrieve the audio data from the result object
                const { audioData } = result;

                // Close the SpeechSynthesizer object
                synthesizer.close();

                // Create a PassThrough stream and write the audio data to it as a Buffer, then resolve the stream
                const bufferStream = new PassThrough();
                bufferStream.end(Buffer.from(audioData));
                resolve(bufferStream);
            },
            error => {
                // Close the SpeechSynthesizer object
                synthesizer.close();
                // Reject the promise with the error
                reject(error);
            });
    });
};

// Export the textToSpeech function so it can be used by other modules
module.exports = {
    textToSpeech
};