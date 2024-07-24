import { Box } from "@mui/material";
import Table from "./Table";
import Timer from "./Timer/Timer";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

interface IGameProps {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    size: number;
    score4x4: number;
    score6x6: number;
    score8x8: number;
    setScore4x4: React.Dispatch<React.SetStateAction<number>>;
    setScore6x6: React.Dispatch<React.SetStateAction<number>>;
    setScore8x8: React.Dispatch<React.SetStateAction<number>>;
}

function Game(props: IGameProps) {
    return (
        <div>
            <CustomTabPanel value={props.value} index={0}>
                <Table size={props.size} />
            </CustomTabPanel>
            <CustomTabPanel value={props.value} index={1}>
                <Table size={props.size} />
            </CustomTabPanel>
            <CustomTabPanel value={props.value} index={2}>
                <Table size={props.size} />
            </CustomTabPanel>
            <Timer time={100} />
        </div>
    );
}

export default Game;
