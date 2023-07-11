/* 
    --> Confetti animation using pure Javascript
  ----------------------
    - Youtube Tuttorial
    - Youtube [Channel](New Age Coder)
    - Youtube [Live](https://youtu.be/Z7wuikoPBr0)
    - Github: [User](https://github.com/Rachit-hooda-18)
    - Donwload Source Code: [Code](https://github.com/Rachit-hooda-18/confetti-animation-using-javasript)
    */

/* --> DOM header elements */

//lets start the confetti functnality
//first we will create function
const start = () => {
  setTimeout(function () {
    confetti.start();
  }, 1000);
};

const stop = () => {
  setTimeout(function () {
    confetti.stop();
  }, 5000);
};

// i am writing these start and stop here bcs it will tell the compiler to start the function
start();
stop();
