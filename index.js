const shell = require('shelljs');

let iTimer = 0;

function clipPage() {
    clearTimeout(iTimer);
    const randX = Math.ceil(Math.random()*100 + 800);
    const randY = Math.ceil(Math.random()*100 + 700);
    const shellString = `adb shell input tap ${randX} ${randY}`;
    shell.exec(shellString);
    
    /** 随机时间 */
    const randomTime = Math.ceil(Math.random()*10 + 5);
    console.log(`翻页将于${randomTime}秒后执行`);
    iTimer = setTimeout(clipPage, randomTime * 1000);
}

clipPage();