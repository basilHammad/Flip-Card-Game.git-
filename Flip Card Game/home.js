const iCard = document.getElementById('therdcard');
const pCard = document.getElementById('forthcard');
const lCard = document.getElementById('secondcard');
const fCard = document.getElementById('firstcard');

iCard.onclick = flipI;
pCard.onclick = flipP;
fCard.onclick = flipL;

function flipI (){
  
    pCard.classList.toggle ('hide');
    iCard.classList.toggle('flip');
    if (pCard.classList.contains('flip')){pCard.classList.remove('flip')};
}

function flipP () {
    pCard.classList.add('flip');
}

function flipL () {
    lCard.classList.toggle('hide');
    fCard.classList.toggle('flip');

} 

const correctE = JSON.parse(localStorage.getItem('totalCorecktFlip'))  || 0;
const wrongE   = JSON.parse(localStorage.getItem('totalWrongTries'))   || 0;
const timeE    = JSON.parse(localStorage.getItem('bestTime'))          || '-:-';

const correctM = JSON.parse(localStorage.getItem('mTotalCorecktFlip')) || 0;
const wrongM   = JSON.parse(localStorage.getItem('mTotalWrongTries'))  || 0;
const timeM    = JSON.parse(localStorage.getItem('mBestTime'))         || '-:-';
console.log (timeM)
const correctH = JSON.parse(localStorage.getItem('hTotalCorecktFlip')) || 0;
const wrongH   = JSON.parse(localStorage.getItem('hTotalWrongTries'))  || 0;
const timeH    = JSON.parse(localStorage.getItem('hBestTime'))         || '-:-';






$('.correct-e').text(correctE)
$('.wrong-e').text(wrongE)
if (timeE == '-:-') {
    $('.time-e').text(timeE)
 }else {
    $('.time-e').text(timeE + 's')
 }

$('.correct-m').text(correctM)
$('.wrong-m').text(wrongM)
if (timeM == '-:-') {
    $('.time-m').text(timeM)
 }else {
    $('.time-m').text(timeM + 's')
 }

$('.correct-h').text(correctH)
$('.wrong-h').text(wrongH)
if (timeH == '-:-') {
    $('.time-h').text(timeH)
 }else {
    $('.time-h').text(timeH + 's')
 }




