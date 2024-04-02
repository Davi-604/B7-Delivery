type Props = {
    name: string;
    mainColor: string;
    fontColor: string;
    onClick: () => void;
};
export const TenantItem = ({ name, mainColor, fontColor, onClick }: Props) => {
    return (
        <div
            className="px-5 py-3 text-lg font-medium w-fit rounded-md cursor-pointer transition-all ease-linear hover:opacity-85"
            style={{ backgroundColor: mainColor, color: fontColor }}
            onClick={onClick}
        >
            {name}
        </div>
    );
};
