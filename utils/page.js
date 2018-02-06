const shell = require('shelljs');
const config = require('../config.json');
const tesseract = require('node-tesseract');
const fs = require('fs');

const rPixel = /(\d+)x(\d+)/g;  //  获取分辨率
/**
 * 获取截图
 * @returns 0 成功
 */
function getScreen() {
    const iScreenCode = shell.exec(config.shell.screenshot).code;
    let iPullCode = -1;

    if(iScreenCode === 0) {
        iPullCode = shell.exec(config.shell.pull).code
    }
    if(iPullCode === 0) {
        console.log("截图成功!");
    }

    return iPullCode;
}

/**
 * 获取屏幕分辨率
 * @returns mUnrestrictedScreen=(0,0) 1080x1920
 */
function getPixel() {
    return shell.exec(config.shell.pixel).toString();
}

/**
 * 获取页码信息
 */
function getPage() {
    tesseract.process('./assets/e.png', function(err, data){
        console.log(data);
    })
}
getPage();