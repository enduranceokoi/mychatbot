let dtn = new Date();

let mnt = dtn.getMonth();
let yrs = dtn.getFullYear();
let min = dtn.getMinutes();
let hour = dtn.getHours();
let second = dtn.getSeconds();
let data = dtn.getDate();
let day = dtn.getDay()


const Respons = [
    {
        Response1: `This is ${yrs}`,
        Response2: `We are currently in ${yrs}`,
        Response3: `Current year is ${yrs}`,
        Response4: `${yrs}`

    },
    {
        Response1: `current time ${hour}`,
        Response2: `the time is  ${hour}: ${min}: ${second}`,
        Response3: `${hour}: ${min}: ${second}`,
        Response4: `${hour}: ${min}`,

    },
    {
        Response1: `my is Endurance chatbot what's your?`,
        Response2: `friends call me chatbot`,
        Response3: `Endurance chatbot and your?`,
        Response4: `how may i help be of help to your `,

    }



];