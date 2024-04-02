import { useFormatter } from '@/utils/useFormatter';

type Props = {
    mainColor: string;
    count: number;
    onUpdateCount: (newCount: number) => void;
    min?: number;
    max?: number;
    small?: boolean;
    noEdit?: boolean;
};
export const QuantityBtn = ({
    mainColor,
    count,
    onUpdateCount,
    min,
    max,
    small,
    noEdit,
}: Props) => {
    const formatter = useFormatter();

    const handleRemove = () => {
        if (min) {
            if (min < count) {
                onUpdateCount(count - 1);
            }
        } else {
            onUpdateCount(count - 1);
        }
    };

    const handleAdd = () => {
        if (max) {
            if (max > count) {
                onUpdateCount(count + 1);
            }
        } else {
            onUpdateCount(count + 1);
        }
    };

    return (
        <>
            {!noEdit && (
                <div
                    className={`flex items-center border border-transparent rounded-md overflow-hidden
            ${!small ? 'h-12' : 'h-[42]'}`}
                >
                    <div
                        className={`flex justify-center items-center text-white text-2xl font-semibold transition-colors ease-in-out
                ${!small ? 'w-12 h-12' : 'w-10 h-10'}`}
                        onClick={handleRemove}
                        style={
                            min
                                ? count > min
                                    ? { backgroundColor: mainColor }
                                    : { color: '#96A3AB' }
                                : { backgroundColor: mainColor }
                        }
                    >
                        -
                    </div>
                    <div className="mx-3 font-bold text-lg" style={{ color: mainColor }}>
                        {formatter.formatQuantity(count, 2)}
                    </div>
                    <div
                        className={`flex justify-center items-center text-white text-2xl font-semibold transition-colors ease-in-out
                ${!small ? 'w-12 h-12' : 'w-10 h-10'}`}
                        style={
                            max
                                ? count < max
                                    ? { backgroundColor: mainColor }
                                    : { color: '#96A3AB' }
                                : { backgroundColor: mainColor }
                        }
                        onClick={handleAdd}
                    >
                        +
                    </div>
                </div>
            )}
            {noEdit && (
                <div className="mr-6">
                    <div
                        className="text-xs font-semibold mb-[2px]"
                        style={{ color: mainColor }}
                    >
                        Qnt.
                    </div>
                    <div className="p-2.5 text-lg font-bold" style={{ color: mainColor }}>
                        {formatter.formatQuantity(count, 2)}
                    </div>
                </div>
            )}
        </>
    );
};
