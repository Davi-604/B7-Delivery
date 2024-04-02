import { KeyboardEvent, useState } from 'react';
import SearchIcon from '../../public/svgs/searchIcon.svg';
import { useAppContext } from '@/context/app/hook';

type Props = {
    onSearch: (searchValue: string) => void;
};
export const SearchInput = ({ onSearch }: Props) => {
    const [focused, setFocused] = useState(false);
    const [searchField, setSearchField] = useState('');
    const { tenant } = useAppContext();

    const handleSendSearch = (e: KeyboardEvent) => {
        onSearch(searchField);
    };
    const handleClickSearch = () => {
        onSearch(searchField);
    };

    return (
        <div
            className="p-2 flex items-center border rounded-md transition-colors ease-linear"
            style={
                focused
                    ? { borderColor: tenant?.mainColor }
                    : { borderColor: 'transparent' }
            }
        >
            <input
                className="outline-none border-0 flex-1 h-12 text-sm mr-4"
                placeholder="Digite o nome do produto"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
                onKeyUp={(e) => handleSendSearch(e)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            <div
                className="flex items-center justify-center w-12 h-12 rounded-md"
                onClick={handleClickSearch}
            >
                <SearchIcon color={tenant?.mainColor} />
            </div>
        </div>
    );
};
