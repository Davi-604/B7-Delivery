import { Icon } from './Icon';

type Props = {
    mainColor: string;
    onClick: () => void;
    label?: string;
    fill?: boolean;
    disabled?: boolean;
    iconName?: string;
};
export const DefaultButton = ({
    label,
    mainColor,
    onClick,
    fill,
    disabled,
    iconName,
}: Props) => {
    return (
        <button
            className={`p-[17px] w-full text-center font-semibold border-2 border-transparent rounded-md
            ${disabled ? 'opacity-65' : ''}`}
            style={
                !fill
                    ? { backgroundColor: mainColor, color: '#FFF' }
                    : {
                          backgroundColor: '#FFF',
                          borderColor: mainColor,
                          color: mainColor,
                      }
            }
            onClick={disabled ? () => {} : onClick}
        >
            {!iconName && label}
            {iconName && (
                <Icon iconName={iconName} width={16} height={16} mainColor={mainColor} />
            )}
        </button>
    );
};
