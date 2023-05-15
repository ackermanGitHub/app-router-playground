"use client"
import { useState, createContext, useContext } from "react"
import { Input } from "@/components/ui/input";
import { logDev } from "@/utils/functions";

interface InputProps {
    active: boolean;
    left: number;
    top: number;
    width: number;
    height: number;
    value: string;
    id: number;
    type: string;
    column: string;
    callback: (value: string) => void;
}

interface EditInput {
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    setLeft: React.Dispatch<React.SetStateAction<number>>;
    setTop: React.Dispatch<React.SetStateAction<number>>;
    setWidth: React.Dispatch<React.SetStateAction<number>>;
    setHeight: React.Dispatch<React.SetStateAction<number>>;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    setId: React.Dispatch<React.SetStateAction<number>>;
    setType: React.Dispatch<React.SetStateAction<string>>;
    setColumn: React.Dispatch<React.SetStateAction<string>>;
    setCallback: React.Dispatch<React.SetStateAction<(value: string) => void>>;
}

export const InputContext = createContext({} as { inputProps: InputProps, editInput: EditInput });

export const InputProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [active, setActive] = useState(false);
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [value, setValue] = useState('');
    const [id, setId] = useState(-1);
    const [type, setType] = useState('');
    const [column, setColumn] = useState('');
    const [callback, setCallback] = useState(() => {
        return (value: string) => {
            logDev("default close input callback");
        }
    });

    const inputProps = {
        active, left, top, width, height, value, id, type, column, callback
    }

    const editInput = {
        setActive, setLeft, setTop, setWidth, setHeight, setValue, setId, setType, setColumn, setCallback
    }

    return (
        <InputContext.Provider value={{ inputProps, editInput }}>
            <div className="relative w-full h-full">
                <Input
                    type="text"
                    onChange={(e) => {
                        editInput.setValue(e.target.value);
                    }}
                    style={{
                        left,
                        top,
                        height,
                        width,
                        display: `${active ? 'block' : 'none'}`,
                    }}
                    className="absolute bg-secondary text-primary p-4 z-10"
                    value={value}
                />

                {children}
            </div>
            <div style={{
                display: `${active ? 'block' : 'none'}`,
            }} onClick={() => {
                callback(value)
                logDev("🧙‍♂️ close input callback executed");
                setActive(false);
            }} className="absolute top-0 left-0 h-screen w-screen bg-black opacity-50">

            </div>
        </InputContext.Provider>
    )
}

export const useInput = () => {
    const context = useContext(InputContext);

    if (!context) {
        throw new Error('use Toast must be used within a ToastProvider');
    }

    return context;
}