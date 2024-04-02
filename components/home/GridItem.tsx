import { useAppContext } from '@/context/app/hook';
import { useFormatter } from '@/utils/useFormatter';
import { Product } from '@/types/Product';
import Link from 'next/link';

type Props = {
    product: Product;
};
export const GridItem = ({ product }: Props) => {
    const { tenant } = useAppContext();

    const formatter = useFormatter();

    return (
        <Link href={`${tenant?.slug}/product/${product.id}`}>
            <div className="rounded-md overflow-hidden">
                <div
                    className="h-[90px] rounded-md"
                    style={{ backgroundColor: tenant?.secondColor }}
                ></div>
                <div className="text-center">
                    <img
                        src={product.image}
                        className="w-full h-full object-cover mt-[-90px]"
                    />
                </div>
                <div className="p-3">
                    <div className="text-xs font-semibold">{product.categoryName}</div>
                    <div className="font-bold text-lg">{product.name}</div>
                    <div
                        className="font-bold text-lg"
                        style={{ color: tenant?.mainColor }}
                    >
                        {formatter.formatPrice(product.price)}
                    </div>
                </div>
            </div>
        </Link>
    );
};
