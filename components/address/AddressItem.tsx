import { Address } from '@/types/Address';
import { Icon } from '../Icon';

type Props = {
    mainColor: string;
    secondColor: string;
    address: Address;
    onSelect: (selectedAddress: Address) => void;
    onEdit: (addressId: number) => void;
    onDelete: (addressId: number) => void;
    menuOpened: number;
    setMenuOpened: (id: number) => void;
};
export const AddressItem = ({
    mainColor,
    secondColor,
    address,
    onSelect,
    onEdit,
    onDelete,
    menuOpened,
    setMenuOpened,
}: Props) => {
    return (
        <div
            className="flex items-center border-b-2 pb-8 mb-8"
            style={{ borderBottomColor: secondColor }}
        >
            <div
                className="flex items-center flex-1 ml-5"
                onClick={() => onSelect(address)}
            >
                <div className="">
                    <Icon
                        iconName="location"
                        height={24}
                        width={24}
                        mainColor={mainColor}
                    />
                </div>
                <div className="text-sm ml-2 line-clamp-1 overflow-hidden text-ellipsis">
                    {address.number} - {address.street} - {address.neighborhood}
                </div>
            </div>
            <div className="ml-5">
                <div className="pl-3" onClick={() => setMenuOpened(address.id)}>
                    <Icon
                        iconName="optionPoints"
                        height={24}
                        width={24}
                        mainColor={'#6A7D8B'}
                    />
                </div>
                {menuOpened === address.id && (
                    <div className="absolute bg-white p-4 right-6 border-2 rounded-md">
                        <div
                            className="flex items-center"
                            onClick={() => onEdit(address.id)}
                        >
                            <Icon
                                mainColor={'#96A3AB'}
                                height={24}
                                width={24}
                                iconName="edit"
                            />
                            <div className="ml-4">Editar</div>
                        </div>
                        <div
                            className="flex items-center mt-5"
                            onClick={() => onDelete(address.id)}
                        >
                            <Icon
                                mainColor={'#96A3AB'}
                                height={24}
                                width={24}
                                iconName="delete"
                            />
                            <div className="ml-4">Deletar</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
