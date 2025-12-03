export interface Message {
    id: string;
    role: "system" | "user" | "assistant" | "data";
    content: string;
}
