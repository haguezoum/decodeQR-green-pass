const fs = require('fs')
const pako = require('pako');
const base45 = require('base45');
const cbor = require('cbor');
const jpeg = require('jpeg-js');
const jsQR = require("jsqr");
//------------------------------

try {
    const img = fs.readFileSync(__dirname + '/greenpass-demo.jpeg'); //only .jpeg images :)
    const decodImg = jpeg.decode(img, {useTArray: true});
    const data = jsQR(decodImg.data,decodImg.width , decodImg.height)
    const greenpassBody = data.data.substr(4);
    const decodeData = base45.decode(greenpassBody)
    const output = pako.inflate(decodeData);
    const results = cbor.decodeAllSync(output);   
    const cbor_data = results[0].value[2];  
    const greenpassData = cbor.decodeAllSync(cbor_data);
    console.log (JSON.stringify(greenpassData[0].get(-260).get(1), null, 2));

} catch (error) {

    console.log('|=> '+error)

}
