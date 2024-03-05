/*
  ----------------------------------------------------------------------
  Michael Nia
  Created: 3/2/2024
  Updated: 3/2/2024
  SightEngine Image Filter .js version
  Checks image file for inappropriate content and blocks or approves.
  Improved take on the image filter system using SightEngine API.
  -----------------------------------------------------------------------
*/

import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

// Analyze image with Sightengine
export async function analyzeImageWithSightengine(imagePath) {
  try {
    const data = new FormData();
    data.append('media', fs.createReadStream(imagePath));
    data.append('models', 'nudity-2.0,offensive,gore');
    data.append('api_user', '814034437');
    data.append('api_secret', 'TyzDvp3zEYqFDJmBPJe6EgozSSMayrXG');

    const response = await axios({
      method: 'post',
      url: 'https://api.sightengine.com/1.0/check.json',
      data: data,
      headers: data.getHeaders()
    });

    // Process response
    //console.log(response.data);

    //Threshold logic
    let goreValue = response.data.gore.prob
    let offensiveValue = response.data.offensive.prob
    let nudityValue = 1 - response.data.nudity.none
    let totalThreshold = (goreValue + offensiveValue + nudityValue) - 0.03

    //Check threshold
    if (totalThreshold > 0.7) {
      console.log('[Image Denied]')
      return false;
    } else {
      console.log('[Image Accepted]')
      return true;
    }

  } catch (error) {
    console.error('Error analyzing image:', error.response ? error.response.data : error.message);
    return null;
  }
}