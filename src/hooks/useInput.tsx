"use client"
import { useState, createContext } from "react"

interface InputProps {
    active: boolean;
    left: number;
    top: number;
    width: number;
    height: number;
    value: string;
    productId: number;
    type: string;
    field: string;
    callback: (value: string) => void;
}

interface EditInput {
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    setLeft: React.Dispatch<React.SetStateAction<number>>;
    setTop: React.Dispatch<React.SetStateAction<number>>;
    setWidth: React.Dispatch<React.SetStateAction<number>>;
    setHeight: React.Dispatch<React.SetStateAction<number>>;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    setProductId: React.Dispatch<React.SetStateAction<number>>;
    setType: React.Dispatch<React.SetStateAction<string>>;
    setField: React.Dispatch<React.SetStateAction<string>>;
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
    const [productId, setProductId] = useState(-1);
    const [type, setType] = useState('');
    const [field, setField] = useState('');
    const [callback, setCallback] = useState(() => {
        return (value: string) => { }
    });

    const inputProps = {
        active, left, top, width, height, value, productId, type, field, callback
    }

    const editInput = {
        setActive, setLeft, setTop, setWidth, setHeight, setValue, setProductId, setType, setField, setCallback
    }

    return (
        <InputContext.Provider value={{ inputProps, editInput }}>
            <input
                type={type}
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
                value={value}
                className="absolute border-stone-600 border-solid border shadow-lg z-10"
            />
            {children}
            <div style={{
                display: `${active ? 'block' : 'none'}`,
            }} onClick={() => {
                callback(value)
                setActive(false);
            }} className="absolute top-0 left-0 h-screen w-screen bg-black opacity-50">

            </div>
        </InputContext.Provider>
    )
}