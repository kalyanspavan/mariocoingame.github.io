const avatar = document.querySelector('#player');
const coins = document.querySelector('#coin');
const score = document.querySelector('#points');
const closeBtn = document.querySelector('#restartGame');
let cScore = 0;

window.onload = (e) => {
    document.querySelector('#coin').style.display = "none";
    document.querySelector('#gameSummary').style.display = "none"
    avatar.style.top = '50px';
    avatar.style.left = '10px';
}

window.addEventListener('keydown', function (e) {
    if (e.keyCode == '40') { //down arrow keycode
        let position = extractPos(avatar.style.top)
        if (position + 80 < this.innerHeight) {
            avatar.style.top = `${position + 50}px`;
        }
    } else
        if (e.keyCode == '38') {//Up arrow keycode
            let position = extractPos(avatar.style.top)
            if (position - 50 > 0) {
                avatar.style.top = `${position - 50}px`;
            }
        } else
            if (e.keyCode == '37') {//left arrow keycode
                let position = extractPos(avatar.style.left)
                if (position > 0) {
                    avatar.style.left = `${position - 50}px`;
                    avatar.style.transform = 'scale(-1,1)';
                }
            } else
                if (e.keyCode == '39') { //right arrow keycode
                    let position = extractPos(avatar.style.left)
                    if (position + 80 < this.innerWidth) {
                        avatar.style.left = `${position + 50}px`;
                        avatar.style.transform = 'scale(1,1)';
                    }
                }

    if (isTouching(avatar, coins)) {
        cScore++;
        score.innerHTML = `<b>${cScore}</b>`
        coinPosition();
    }
})

closeBtn.addEventListener('click', function() {
    document.querySelector('#gameSummary').style.display = "none"
    cScore = 0;
})

function isTouching(a, b) {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();

    return !(
        aRect.top + aRect.height < bRect.top ||
        aRect.top > bRect.top + bRect.height ||
        aRect.left + aRect.width < bRect.left ||
        aRect.left > bRect.left + bRect.width
    );
}

function startTimer() {
    cScore = 0;
    let totalMins = document.querySelector('#ipMins').value;
    let timeleft = 60 * totalMins;
    coins.style.display = "block";
    let downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
        }
        document.querySelector('#time').innerHTML = timeleft;
        timeleft -= 1;
        if (timeleft < 0) {
            coins.style.display = "none";
            document.querySelector('#gameSummary').style.display = "block"
            document.querySelector('#gameOver').innerHTML = `Your score ${cScore}`;
        } else {
            document.querySelector('#gameSummary').style.display = "none"                 
        }
        
    }, 1000);
}


const coinPosition = () => {
    const y = Math.floor(Math.random() * innerHeight) - 40;
    const x = Math.floor(Math.random() * innerWidth) - 40;
    coins.style.top = `${y}px`;
    coins.style.left = `${x}px`;
}
coinPosition();

const extractPos = (pos) => {
    if (pos == '') {
        return 0;
    } else
        return parseInt(pos.slice(0, -2));
}