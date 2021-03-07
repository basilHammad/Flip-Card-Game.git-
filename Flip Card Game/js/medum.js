$(document).ready(function () {
  const timer = $("#timer"),
    cont = $(".cards"),
    goodLuck = $(".goodluck"),
    cards = Array.from($(".card")),
    cardsIndexes = [...Array(cards.length).keys()],
    ready = $(".ready"),
    pause = $(".pause");
  let n = 0,
    w = 0,
    starTimer,
    wrongTries = 0,
    corecktFlip = 0,
    totalWrongTries = JSON.parse(localStorage.getItem("mTotalWrongTries")) || 0,
    totalCorecktFlip =
      JSON.parse(localStorage.getItem("mTotalCorecktFlip")) || 0,
    bestTime = JSON.parse(localStorage.getItem("mBestTime")) || "-:-";

  $(cont).height($(window).height() - $(timer).height());

  function counter() {
    n++;
    w = w + 0.83333333;
    timer.animate({
      width: `${w}vw`,
    });

    if (n == 180) {
      clearInterval(starTimer);
      $(".hardLuck").addClass("show");
    }
  }

  goodLuck.click(() => {
    ready.addClass("hide");

    starTimer = setInterval(counter, 1000);
  });

  $(document).keyup(function (e) {
    e.key === "p" ? pause.toggleClass("show") : null;
    pause.hasClass("show")
      ? clearInterval(starTimer)
      : (starTimer = setInterval(counter, 1000));
    e.key === "Escape" ? window.location.replace("../home.html") : null;
  });

  function shuffle(arr) {
    let temp, newpos;
    for (let i = arr.length - 1; i > 0; i--) {
      newpos = Math.floor(Math.random() * (i + 1));
      temp = arr[i];
      arr[newpos] = arr[i];
      temp = arr[newpos];
    }
    return arr;
  }

  shuffle(cardsIndexes);

  cards.forEach((card, index) => {
    card.style.order = cardsIndexes[index];
    card.addEventListener("click", () => checker(card));
  });

  function checker(card) {
    card.classList.add("flip");

    let flippedcards = cards.filter((card) => card.classList.contains("flip"));

    if (flippedcards.length == 2) {
      cont.addClass("stop");

      setTimeout(() => {
        cont.removeClass("stop");
      }, 1000);

      checkMatch(flippedcards[0], flippedcards[1]);

      checkWin();
    }

    function checkMatch(first, second) {
      if (first.dataset.shap === second.dataset.shap) {
        first.classList.add("matched");
        second.classList.add("matched");

        first.classList.remove("flip");
        second.classList.remove("flip");

        setTimeout(() => {
          first.classList.add("hide");
          second.classList.add("hide");
        }, 1500);

        corecktFlip++;
        totalCorecktFlip++;
        localStorage.setItem(
          "mTotalCorecktFlip",
          JSON.stringify(totalCorecktFlip)
        );
      } else {
        wrongTries++;
        totalWrongTries++;

        localStorage.setItem(
          "mTotalWrongTries",
          JSON.stringify(totalWrongTries)
        );

        setTimeout(() => {
          first.classList.remove("flip");
          second.classList.remove("flip");
        }, 1000);
      }
    }
  }

  function checkWin() {
    let x;

    let win = cards.filter((card) => card.classList.contains("matched"));

    if (win.length == cards.length) {
      clearInterval(starTimer);

      // win card
      $(".correct").text(corecktFlip);
      $(".wrong").text(wrongTries);
      $(".Time").text(n + "s");

      setTimeout(() => {
        $(".gameOver").addClass("show");
      }, 1500);

      x = bestTime - n;

      if (bestTime == "-:-" || x > 0) {
        localStorage.setItem("mBestTime", JSON.stringify(n));
      }
    }
  }
});
