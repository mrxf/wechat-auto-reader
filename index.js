const shell = require('shelljs');
const config = require('./config.json');
const tesseract = require('node-tesseract');
const fs = require('fs');

const rPixel = /(\d+)x(\d+)/g;  //  获取分辨率
const rPage = /(\d+)\/(\d+)/g   //  页码正则

let iClipTimer = 0;  // 翻页计时器
let iPixelWidth = 0;    //  分辨率宽
let iPixelHeight = 0;    //  分辨率高
let iCurrentPage = 0;    // 当前页数
let iTotalPage = 0;    //  总页数

/**
 * 初始化数据
 */
function initData() {
    const aPixel = getPixel().match(rPixel)[0].split('x');
    iPixelWidth = Number(aPixel[0]);
    iPixelHeight = Number(aPixel[1]);
}

/**
 * 翻页
 */
function clipPage() {
    clearTimeout(iClipTimer);
    /** 随机时间 */
    const randomTime = Math.ceil(Math.random()*10 + 5);
    console.log(`下次翻页将于${randomTime}秒后执行`);
    iClipTimer = setTimeout(clipPage, randomTime * 1000);

    if(!iPixelWidth || !iPixelHeight) {
        initData();
        return 0;
    }
    /** 本次翻页 */
    const randX = Math.ceil(Math.random() * 100);
    const randY = Math.ceil(Math.random() * 100 + iPixelHeight * 0.4);
    const x1 = randX + iPixelWidth * 0.8;
    const x2 = randX;
    console.log(shellString);
    shell.exec(shellString);
}

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
 * 更新页码信息
 */
function updatePage() {
    tesseract.process('./assets/e.png', (err, data) => {
        if(err) return err;
        const aPageInfo = data.match(rPage);
        if(aPageInfo){
            iCurrentPage = Number(aPageInfo[0].split("/")[0]);
            iTotalPage =  Number(aPageInfo[0].split("/")[1]);
        }
    })
}

clipPage();