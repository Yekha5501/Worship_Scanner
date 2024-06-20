// utils/tailwind.js
import { create } from 'twrnc';

// create the customized version...
const tw = create(require(`../tailwind.config.js`)); // Adjust the path if necessary

// ... and then this becomes the main function your app uses
export default tw;
