import { Icon } from '../Icon';

type Props = {
    mainColor: string;
    secondColor: string;
    label?: string;
    leftIcon?: string;
    rightIcon?: string;
    onClick?: () => void;
    fill?: boolean;
};
export const CheckoutItem = ({
    mainColor,
    secondColor,
    label,
    leftIcon,
    onClick,
    rightIcon,
    fill,
}: Props) => {
    return (
        <div
            className="flex items-center justify-between mt-3 p-[6px] rounded-md transition-colors ease-linear"
            style={{ backgroundColor: fill ? mainColor : secondColor }}
            onClick={onClick}
        >
            {leftIcon && (
                <div className={`p-3 rounded-md ${fill ? 'bg-black/5' : ''}`}>
                    <Icon
                        iconName={leftIcon}
                        mainColor={fill ? '#FFF' : mainColor}
                        height={24}
                        width={24}
                    />
                </div>
            )}
            <div
                className={`flex-1 mx-4 whitespace-nowrap overflow-hidden text-ellipsis
                ${fill ? 'text-white' : 'text-black'}`}
            >
                {label}
            </div>
            {rightIcon && (
                <div className={`p-3 rounded-md ${fill ? 'bg-black/5' : ''}`}>
                    <Icon
                        iconName={rightIcon}
                        mainColor={fill ? '#FFF' : mainColor}
                        height={24}
                        width={24}
                    />
                </div>
            )}
        </div>
    );
};
