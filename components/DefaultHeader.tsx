import Link from 'next/link';
import BackIcon from '../public/svgs/backIcon.svg';

type Props = {
    mainColor: string;
    backHref: string;
    title?: string;
    subtitle?: string;
    invert?: boolean;
};
export const DefaultHeader = ({
    mainColor,
    backHref,
    title,
    subtitle,
    invert,
}: Props) => {
    return (
        <div className="flex items-center h-12">
            <div className="flex justify-center items-center w-12">
                <Link href={backHref}>
                    <div
                        className={`${
                            invert
                                ? 'w-12 h-12 flex justify-center items-center rounded-md bg-black/10'
                                : ''
                        }`}
                    >
                        <BackIcon color={invert ? '#fff' : mainColor} />
                    </div>
                </Link>
            </div>
            {title && (
                <div
                    className={`flex-1 flex justify-center items-center font-semibold text-3xl
                ${invert ? 'text-white' : ''}`}
                >
                    {title}
                </div>
            )}
            {subtitle && (
                <div className="w-12 flex justify-center items-center">{subtitle}</div>
            )}
            <div className="w-12"></div>
        </div>
    );
};
