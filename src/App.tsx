import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Game from "./components/Game/Game";
import Main from "./components/Main";

export default function App() {
    const [value, setValue] = useState(0);
    const [size, setSize] = useState(4);
    const [score4x4, setScore4x4] = useState(0);
    const [score6x6, setScore6x6] = useState(0);
    const [score8x8, setScore8x8] = useState(0);
    const navigate = useNavigate();

    return (
        <div className="app flex justify-center items-center bg-gray-500">
            <Routes>
                <Route
                    path="/"
                    element={
                        <Main
                            value={value}
                            setValue={setValue}
                            setSize={setSize}
                            navigate={navigate}
                        />
                    }
                />
                <Route
                    path="/game"
                    element={
                        <Game
                            score4x4={score4x4}
                            score6x6={score6x6}
                            score8x8={score8x8}
                            setScore4x4={setScore4x4}
                            setScore6x6={setScore6x6}
                            setScore8x8={setScore8x8}
                            value={value}
                            setValue={setValue}
                            size={size}
                        />
                    }
                />
            </Routes>
        </div>
    );
}
