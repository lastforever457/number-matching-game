import { Tab, Tabs } from "@mui/material";
import React, { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";

interface IMainProps {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    setSize: React.Dispatch<React.SetStateAction<number>>;
    navigate: ReturnType<typeof useNavigate>;
}

function Main(props: IMainProps) {
    const handleChange = (event: SyntheticEvent, newValue: number) => {
        props.setValue(newValue);
    };

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`,
        };
    }

    return (
        <div className="sm:w-[70%] md:w-[60%] lg:w-[35%] p-10 my-auto shadow-2xl min-h-[500px]">
            <Tabs
                value={props.value}
                onChange={handleChange}
                className="mx-auto"
            >
                <Tab
                    className="text-white w-[30%] h-[20vh] shadow-md"
                    style={{ color: "white" }}
                    label="4 X 4"
                    {...a11yProps(0)}
                    onClick={() => props.setSize(4)}
                />
                <Tab
                    className="text-white w-[30%] h-[20vh] shadow-md"
                    style={{ color: "white" }}
                    label="6 X 6"
                    {...a11yProps(1)}
                    onClick={() => props.setSize(6)}
                />
                <Tab
                    className="text-white w-[30%] h-[20vh] shadow-md"
                    style={{ color: "white" }}
                    label="8 X 8"
                    {...a11yProps(2)}
                    onClick={() => props.setSize(8)}
                />
            </Tabs>
            <div className="typography flex flex-col justify-center items-center">
                <h3 className="my-5 text-3xl font-semibold">
                    Choose difficult and click start
                </h3>
                <button
                    onClick={() => props.navigate("/game")}
                    className="py-2 px-10 rounded-xl transiti bg-white"
                >
                    Start !
                </button>
            </div>
        </div>
    );
}

export default Main;
