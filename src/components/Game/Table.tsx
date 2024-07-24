import axios from "axios";
import { MouseEvent, useEffect, useState } from "react";

interface ITableProps {
    size: number;
}

function Table(props: ITableProps) {
    const [numbers, setNumbers] = useState<number[][]>([]);
    const [doubles, setDoubles] = useState<number[][]>([]);
    const [openCards, setOpenCards] = useState<
        { number: number; rowIndex: number; colIndex: number }[]
    >([]);

    useEffect(() => {
        const fetchNumbers = async () => {
            try {
                const res = await axios.get(
                    "https://www.random.org/integers/?num=100&min=1&max=100&col=1&base=10&format=plain&rnd=new"
                );

                const nums: number[] = res.data
                    .split("\n")
                    .filter(Boolean)
                    .map(Number);

                const rows: number[][] = [];
                for (let i = 0; i < props.size / 2; i++) {
                    rows.push(
                        nums.slice(i * props.size, i * props.size + props.size)
                    );
                }

                setNumbers(rows);
                const duplicatedRows = [...rows, ...rows];
                const shuffledRows = shuffleArray(duplicatedRows);
                setDoubles(shuffledRows);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNumbers();
    }, [props.size]);

    const shuffleArray = (array: number[][]): number[][] => {
        const flatArray = array.flat();
        for (let i = flatArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [flatArray[i], flatArray[j]] = [flatArray[j], flatArray[i]];
        }
        const size = Math.sqrt(flatArray.length);
        return Array.from({ length: size }, (_, i) =>
            flatArray.slice(i * size, (i + 1) * size)
        );
    };

    const handleOpenCard = (event: MouseEvent<HTMLTableCellElement>) => {
        const td = event.currentTarget;
        const number = Number(td.innerHTML);
        const rowIndex = Number(td.getAttribute("data-row"));
        const colIndex = Number(td.getAttribute("data-col"));

        if (openCards.length < 2) {
            td.style.backgroundColor = "transparent";
            td.style.transform = "rotate3d(0, 1, 0, 360deg)";
            setOpenCards((prev) => [...prev, { number, rowIndex, colIndex }]);

            if (openCards.length === 1) {
                const [firstCard] = openCards;

                if (firstCard.number === number) {
                    // Match found
                    setOpenCards([]);
                } else {
                    setTimeout(() => {
                        const cells = document.querySelectorAll("td");
                        cells.forEach((cell) => {
                            if (
                                (Number(cell.getAttribute("data-row")) ===
                                    firstCard.rowIndex &&
                                    Number(cell.getAttribute("data-col")) ===
                                        firstCard.colIndex) ||
                                (Number(cell.getAttribute("data-row")) ===
                                    rowIndex &&
                                    Number(cell.getAttribute("data-col")) ===
                                        colIndex)
                            ) {
                                cell.style.backgroundColor = "#000";
                                cell.style.transform =
                                    "rotate3d(0, 1, 0, 180deg)";
                            }
                        });
                        setOpenCards([]);
                    }, 1000);
                }
            }
        }
    };

    return (
        <div className="table-card flex justify-center items-center">
            <table id="main-table">
                <tbody className="flex flex-col gap-5">
                    {doubles.map((row, rowIndex) => (
                        <tr className="flex gap-5" key={rowIndex}>
                            {row.map((number, colIndex) => (
                                <td
                                    onClick={handleOpenCard}
                                    className={`shadow-md ${
                                        props.size === 8
                                            ? "w-[4vw] h-[4vw]"
                                            : "w-[5vw] h-[5vw]"
                                    } flex justify-center items-center font-semibold text-2xl`}
                                    key={colIndex}
                                    data-row={rowIndex}
                                    data-col={colIndex}
                                >
                                    {number}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
