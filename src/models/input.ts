export type Input = {
    type: string;
    id: string;
    tag?: string | null;
    origin?: Origin | null;
    value?: string | null;
}
export type Origin = {
    commitment: string;
}
