import { useAppContext } from '@/context/app/hook';

type Props = {
    onOpen: () => void;
};
export const MenuButton = ({ onOpen }: Props) => {
    const { tenant } = useAppContext();

    return (
        <div
            onClick={onOpen}
            className="w-[18px] h-[18px] flex flex-col justify-between cursor-pointer"
        >
            <div
                className={`h-[2px]`}
                style={{ backgroundColor: tenant?.mainColor.toUpperCase() }}
            ></div>
            <div
                className={`h-[2px]`}
                style={{ backgroundColor: tenant?.mainColor.toUpperCase() }}
            ></div>
            <div
                className={`h-[2px]`}
                style={{ backgroundColor: tenant?.mainColor.toUpperCase() }}
            ></div>
        </div>
    );
};
