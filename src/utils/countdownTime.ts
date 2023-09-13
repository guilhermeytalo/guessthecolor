export const countDowTimer = (seconds: number) => {
    const time = setInterval(() => {
        seconds = seconds - 1;
        console.log('how many seconds the counter had?', seconds)
        if(seconds === 0) clearInterval(time)
    }, 1000)

    return time;
}