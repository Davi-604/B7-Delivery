import Menu from '@/public/svgs/menu.svg';
import Bag from '@/public/svgs/bag.svg';
import Order from '@/public/svgs/order.svg';
import Config from '@/public/svgs/config.svg';
import Exit from '@/public/svgs/exit.svg';

type Props = {
    mainColor: string;
    label: string;
    icon: 'menu' | 'bag' | 'order' | 'config' | 'exit';
    onClick: () => void;
};
export const MenuIcons = ({ mainColor, label, icon, onClick }: Props) => {
    return (
        <div onClick={onClick} className="flex items-center w-fit">
            {icon === 'menu' && <Menu color={mainColor} />}
            {icon === 'bag' && <Bag color={mainColor} />}
            {icon === 'order' && <Order color={mainColor} />}
            {icon === 'config' && <Config color={mainColor} />}
            {icon === 'exit' && <Exit color={mainColor} />}
            <p className="ml-5 text-[#6A7D8B]">{label}</p>
        </div>
    );
};
