import { Product } from '@/types/Product';
import { QuantityBtn } from '../QuantityBtn';
import { useFormatter } from '@/utils/useFormatter';

type Props = {
    mainColor: string;
    secondColor: string;
    product: Product;
    quantity: number;
    onChange: (newCount: number, id: number) => void;
    noEdit?: boolean;
};
export const BagProductItem = ({
    mainColor,
    secondColor,
    onChange,
    product,
    quantity,
    noEdit,
}: Props) => {
    const formatter = useFormatter();

    return (
        <div
            className="flex items-center mx-5 pb-5 mt-2 border-b-2"
            style={{ borderColor: secondColor }}
        >
            <div className="flex flex-1">
                <div className="w-[75px] h-[75px] flex items-center justify-center">
                    <img className="w-full" src={product.image} />
                </div>
                <div className="flex flex-col ml-4 text-black/90">
                    <div className="text-xs text-gray-400 font-medium">
                        {product.categoryName}
                    </div>
                    <div className="my-[2px] font-semibold ">{product.name}</div>
                    <div className="font-semibold" style={{ color: mainColor }}>
                        {formatter.formatPrice(product.price)}
                    </div>
                </div>
            </div>
            <div className="">
                <QuantityBtn
                    count={quantity}
                    mainColor={mainColor}
                    onUpdateCount={(newCount: number) => onChange(newCount, product.id)}
                    min={0}
                    small
                    noEdit={noEdit ?? false}
                />
            </div>
        </div>
    );
};
