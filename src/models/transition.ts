import { Input } from "./input";
import { Output } from "./output";

export type Transition = {
    id: string;
    program: string;
    function: string;
    inputs?: (Input)[] | null;
    outputs?: (Output)[] | null;
    proof: string;
    tpk: string;
    tcm: string;
    fee: number;
}
