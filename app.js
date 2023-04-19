window.addEventListener("DOMContentLoaded", () =>
{
    console.log("LOADED")
})
window.onload = function(e){

      // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCKSQjIna2OJ3b4gajFMz7ynBmKqRZjuz8",
    authDomain: "a2-jackbox-8f23a.firebaseapp.com",
    projectId: "a2-jackbox-8f23a",
    storageBucket: "a2-jackbox-8f23a.appspot.com",
    messagingSenderId: "612616829216",
    appId: "1:612616829216:web:ecab19f3be2f01fbfb7f45",
    measurementId: "G-9SHSKCFNV6"
  };

    try{
        firebase.initializeApp(firebaseConfig)
        console.log("FIREBASE INIT")
    }
    catch (err){
        console.warn("Can't connect to firebase")
    }

    const db = firebase.database()

    let points = 0
    let timer = 5
    const pointRef = db.ref("points")
    // pointRef.set(0)

    // pointRef.on("value", (snapshot) => {
    //     let val = snapshot.val()
    // })

    const timerRef = db.ref("timer")
    // timerRef.set(5)



    new Vue ({
        template: `<div id="app">
            <h1>99 Points</h1>

            <h2>Team's Points: {{points}}</h2>
            <h3>Countdown: {{countdown}}</h3>

            <div>
                <button @click="button0":disabled="buttonID != 0">-10</button>
                <button @click="button1":disabled="buttonID != 1">-5</button>
                <button @click="button2":disabled="buttonID != 2">-3</button>
                <button @click="button3":disabled="buttonID != 3">-2</button>
                <button @click="button4":disabled="buttonID != 4">+/-1</button>
                <button @click="button5":disabled="buttonID != 5">+2</button>
                <button @click="button6":disabled="buttonID != 6">+3</button>
                <button @click="button7":disabled="buttonID != 7">+5</button>
                <button @click="button8":disabled="buttonID != 8">+10</button>
                <button @click="button9":disabled="buttonID != 9">Surprise</button>

            </div>

            <div>
                <button @click="reset">RESET</button>
            </div>
        </div>`,

        computed: {

        },

        watch: {
            points() {
                console.log("POINTES CHANGED")
                this.selectRandomButton()
                pointRef.set(this.points)
            },
            // countdown() {
            //     console.log("TIMER CHANGED")
            //     timerRef.set(this.countdown)
            // },

        },

        methods: {
            selectRandomButton()
            {
                let rand = Math.floor(Math.random()*10)
                console.log("The random button set is: ", rand)

                this.buttonID = rand

            },

            button0()
            {
                console.log("subtracted by: ", -10)

                this.points -= 10

                this.resetCounter()
            },
            button1()
            {
                console.log("subtracted by: ", -5)

                this.points -= 5

                this.resetCounter()
            },
            button2()
            {
                console.log("subtracted by: ", -3)

                this.points -= 3

                this.resetCounter()
            },

            button3()
            {
                console.log("subtracted by: ", -2)

                this.points -= 2

                this.resetCounter()
            },

            button4()
            {
                console.log("PLAIN ", 0)

                let rand = Math.random()

                if (rand < .5)
                {
                    this.points -= 1
                }
                else{
                    this.points += 1
                }

                this.resetCounter()
            },

            button5()
            {
                console.log("add by: ", 2)

                this.points += 2

                this.resetCounter()
            },
            button6()
            {
                console.log("add by: ", 3)

                this.points += 3

                this.resetCounter()
            },
            button7()
            {
                console.log("add by: ", 5)

                this.points += 5

                this.resetCounter()
            },
            button8()
            {
                console.log("add by: ", 10)

                this.points += 10

                this.resetCounter()
            },
            button9()
            {
                console.log("surprise me")

                let rand = Math.floor(Math.random()*25)
                let rand2 = Math.random()
                
                if (rand2 < .5)
                {
                    this.points -= rand
                }
                else{
                    this.points += rand
                }

                this.resetCounter()
            },

            resetCounter()
            {
                this.countdown = 5;
            },

            countDownKeeper()
            {
                if (this.countdown < 1)
                {
                    this.resetCounter()
                    this.points -= 5
                }
                else
                {
                    this.countdown--
                }

                timerRef.set(this.countdown)

   
            },

            reset()
            {
                this.points = 0
            },

        },

        mounted()
        {
            console.log("START (step function)")

            setInterval(() =>{
                console.log("step")
                this.countDownKeeper()
            }, 1000)

            pointRef.on("value", (snapshot) => {
                let val = snapshot.val()
                console.log("points: ", val)
                this.points = val
            })
            timerRef.on("value", (snapshot) => {
                let val = snapshot.val()
                console.log("points: ", val)
                this.countdown = val
            })
        },

        data() {
            return {
                points: points,
                buttonID: Math.floor(Math.random()*10),
                countdown: timer,
            }
        },

        el: "#app",

    })

}