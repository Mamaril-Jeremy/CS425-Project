/* 
imageFilter Unit Test
Michael Nia
Written: 3/4/2024
Updated: 3/4/2024 - 8:32 PM
Instructions: In terminal, go to 'Plato' directory and type "npm run test" 
*/

import { analyzeImageWithSightengine } from "../src/lib/assets/imagefilterNew"
import { jest } from "@jest/globals" //Set up and use jest elements
import axios from "axios"
jest.mock("axios")

describe ("imageFilterTest", ()=>{
    test("Blank file name - Should return null.", async()=>{
        let result = await analyzeImageWithSightengine("");
        expect (result).toBeNull();
    });
    test("Null file name - Should return null.", async()=>{
        let result = await analyzeImageWithSightengine(null);
        expect (result).toBeNull();
    });
    test("Positive test - Should return true.", async()=>{
        const response = {
          data: {
            gore: {
                prob: 0.01
            },
            offensive: {
                prob: 0.01
            },
            nudity: {
                none: 0.99
            }
          }  
        }
        //axios.mockResolvedValue(response); //Error - Line removed
        jest.spyOn(axios, 'get').mockResolvedValue(response); // Corrected line
        let result = await analyzeImageWithSightengine("src/lib/assets/mike.png")
        expect (result).toBe(true);
    });
    test("Negative test - Should return false.", async()=>{
        const response = {
          data: {
            gore: {
                prob: 0.01
            },
            offensive: {
                prob: 0.01
            },
            nudity: {
                none: 0.28
            }
          }  
        }
        jest.spyOn(axios, 'get').mockResolvedValue(response);
        let result = await analyzeImageWithSightengine("src/lib/assets/illicitPhotoTest.jpg")
        expect (result).toBe(false);
    });

})