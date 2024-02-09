/*
  ----------------------------------------------------------------------
  Michael Nia
  Created: 12/8/2023
  Updated: 2/9/2024
  Google Vision API infused Image Filtering
  Checks image file/link for inappropriate content and blocks or approves
  -----------------------------------------------------------------------
*/

import { ImageAnnotatorClient } from '@google-cloud/vision';
import fs from 'fs';

// Assuming the credentials JSON file is named 'your-credentials-file.json' in the same directory.
export const credentialsPath = '../assets/safesearch-api-test-978a34fe91ce.json';

// Check if the credentials file exists before creating the client.
if (!fs.existsSync(credentialsPath)) {
  console.error('Error: Credentials file not found. Make sure it exists in the current directory.');
  process.exit(1);
}

export const client = new ImageAnnotatorClient({ keyFilename: credentialsPath });

export async function testExplicitContentDetection(input) {
  try {
    const [result] = await client.safeSearchDetection(input);
    processResults(result.safeSearchAnnotation);
  } catch (err) {
    console.error('Error:', err.message || err);
  }
}

export async function testExplicitContentDetectionFromFile(input) {
  try {
    const content = fs.readFileSync(input);
    const [result] = await client.safeSearchDetection(content);
    return processResults(result.safeSearchAnnotation);
  } catch (err) {
    console.error('Error:', err.message || err);
    return false;
  }
}

export function processResults(safeSearchAnnotation) {
  console.log('Safe Search Annotation:');
  console.log(`Adult: ${safeSearchAnnotation.adult}`);
  console.log(`Spoof: ${safeSearchAnnotation.spoof}`);
  console.log(`Medical: ${safeSearchAnnotation.medical}`);
  console.log(`Violence: ${safeSearchAnnotation.violence}`);
  console.log(`Racy: ${safeSearchAnnotation.racy}`);

  if (isContentLikelyBlocked(safeSearchAnnotation)) {
    console.log('Content has been blocked.');
    return true;
  } else {
    console.log('Content is allowed.');
    return false;
  }
}

export function isContentLikelyBlocked(safeSearchAnnotation) {
  // Check if any category is likely
  if (
    safeSearchAnnotation.adult === 'LIKELY' ||
    safeSearchAnnotation.medical === 'LIKELY' ||
    safeSearchAnnotation.violence === 'LIKELY' ||
    safeSearchAnnotation.racy === 'LIKELY'
  ) {
    console.log('Likely blocked content:');
    if (safeSearchAnnotation.adult === 'LIKELY') {
      console.log('- Adult content');
    }
    if (safeSearchAnnotation.medical === 'LIKELY') {
      console.log('- Medical content');
    }
    if (safeSearchAnnotation.violence === 'LIKELY') {
      console.log('- Violent content');
    }
    if (safeSearchAnnotation.racy === 'LIKELY') {
      console.log('- Racy content');
    }
    return true;
  }

  return false;
}

