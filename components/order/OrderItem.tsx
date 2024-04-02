import { useFormatter } from '@/utils/useFormatter';
import { Order } from '@/types/Order';
import { DefaultButton } from '../DefaultButton';

type Props = {
    order: Order;
    mainColor: string;
    onClick: () => void;
    stage: string;
    stageBg: string;
    stageFontColor: string;
};
export const OrderItem = ({
    order,
    mainColor,
    stage,
    stageBg,
    stageFontColor,
    onClick,
}: Props) => {
    const formatter = useFormatter();
    return (
        <div className="flex justify-between p-6">
            <div className="">
                <div className="text-2xl font-medium mb-2">Pedido#{order.id}</div>
                <div className="mb-5" style={{ color: '#6A7D8B' }}>
                    {formatter.formatDate(order.orderDate)}
                </div>
                <div className="text-xs" style={{ color: '#6A7D8B' }}>
                    Total
                </div>
                <div className="text-[20px] font-semibold" style={{ color: mainColor }}>
                    {formatter.formatPrice(order.total)}
                </div>
            </div>
            <div className="">
                <div className="">
                    <div
                        className="text-[13px] font-bold mb-[38px] p-2 rounded-md"
                        style={{ color: stageFontColor, backgroundColor: stageBg }}
                    >
                        {stage}
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="max-w-12">
                        <DefaultButton
                            mainColor={mainColor}
                            onClick={onClick}
                            fill
                            iconName="secondArrowRight"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
