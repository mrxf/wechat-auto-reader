const shell = require('shelljs');

let iTimer = 0;

function clipPage() {
    clearTimeout(iTimer);
    const randX = Math.ceil(Math.random()*50);
	const randY = Math.ceil(Math.random()*100 + 500);
    const x1 = randX + 380;
	const x2 = randX;
    const shellString = `adb shell input swipe ${x1} ${randY} ${x2} ${randY}`;
    shell.exec(shellString);
    
    /** 随机时间 */
    const randomTime = Math.ceil(Math.random()*10 + 5);
    console.log(`翻页将于${randomTime}秒后执行`);
    iTimer = setTimeout(clipPage, randomTime * 1000);
}

clipPage();
