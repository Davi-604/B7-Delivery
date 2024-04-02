import Link from 'next/link';
import HiddenPassword from '../public/svgs/hiddenPassword.svg';
import ShowPassword from '../public/svgs/showPassword.svg';
import { useEffect, useState } from 'react';

type Props = {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: string) => void;
    mainColor: string;
    password?: boolean;
    disabled?: boolean;
    errorMessage?: string;
};
export const DefaultInput = ({
    type,
    onChange,
    placeholder,
    value,
    password,
    mainColor,
    errorMessage,
    disabled,
}: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        if (errorMessage) {
            setFocused(true);
        }
    }, [errorMessage]);

    return (
        <div className="w-full">
            <div
                className={`flex items-center h-[61px] px-4 border-2 border-transparent rounded-md transition-colors ease-out`}
                style={
                    focused
                        ? errorMessage
                            ? { borderColor: '#F00' }
                            : { borderColor: mainColor }
                        : {}
                }
            >
                <input
                    type={password ? (showPassword ? 'text' : 'password') : 'text'}
                    className="outline-none flex-1 w-[1px]"
                    placeholder={placeholder}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
                {password && (
                    <div className="ml-3" onClick={() => setShowPassword(!showPassword)}>
                        {!showPassword && <HiddenPassword color="#BBB" />}
                        {showPassword && <ShowPassword color="#BBB" />}
                    </div>
                )}
            </div>
            <div className="ml-2 mt-1 text-sm text-red-700 font-semibold">
                {errorMessage}
            </div>
        </div>
    );
};
