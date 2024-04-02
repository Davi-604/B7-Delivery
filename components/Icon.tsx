import MailSent from '@/public/svgs/mailSent.svg';
import Location from '@/public/svgs/location.svg';
import ArrowRight from '@/public/svgs/arrowRight.svg';
import SecondArrowRight from '@/public/svgs/secondArrowRight.svg';
import Money from '@/public/svgs/money.svg';
import Card from '@/public/svgs/card.svg';
import Cupom from '@/public/svgs/cupom.svg';
import Checked from '@/public/svgs/checked.svg';
import OptionPoints from '@/public/svgs/optionPoints.svg';
import Edit from '@/public/svgs/edit.svg';
import Delete from '@/public/svgs/delete.svg';

type Props = {
    width: number;
    height: number;
    iconName: string;
    mainColor: string;
};
export const Icon = ({ width, height, iconName, mainColor }: Props) => {
    return (
        <div style={{ width, height }}>
            {iconName === 'mailSent' && <MailSent color={mainColor} />}
            {iconName === 'location' && <Location color={mainColor} />}
            {iconName === 'arrowRight' && <ArrowRight color={mainColor} />}
            {iconName === 'secondArrowRight' && <SecondArrowRight color={mainColor} />}
            {iconName === 'money' && <Money color={mainColor} />}
            {iconName === 'card' && <Card color={mainColor} />}
            {iconName === 'cupom' && <Cupom color={mainColor} />}
            {iconName === 'checked' && <Checked color={mainColor} />}
            {iconName === 'optionPoints' && <OptionPoints color={mainColor} />}
            {iconName === 'edit' && <Edit color={mainColor} />}
            {iconName === 'delete' && <Delete color={mainColor} />}
        </div>
    );
};
