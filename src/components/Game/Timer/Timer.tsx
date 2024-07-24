import { createTimeModel, useTimeModel } from "react-compound-timer";

interface ITimerProps {
    time: number;
}

const timer = createTimeModel({
    initialTime: 60, // 60 sekund = 1 minut
    direction: "forward",
    timeToUpdate: 250,
    startImmediately: true,
    lastUnit: "m",
    roundUnit: "s",
    checkpoints: [],
});

function Timer(props: ITimerProps) {
    const { value } = useTimeModel(timer);
    // return <div >dbfdgbfdgbs</div>;
    return (
        <div className="absolute top-[20%] left-[10%]">
            {typeof value.s === "string" ? "1" : "2"} {value.s} seconds
        </div>
    );
}

export default Timer;