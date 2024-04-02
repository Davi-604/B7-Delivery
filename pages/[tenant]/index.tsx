import { Banners } from '@/components/home/Banners';
import { GridItem } from '@/components/home/GridItem';
import { MenuArea } from '@/components/home/MenuArea';
import { MenuButton } from '@/components/home/MenuButton';
import { SearchInput } from '@/components/home/SearchInput';
import { useAppContext } from '@/context/app/hook';
import { useAuthContext } from '@/context/auth/hook';
import { useApi } from '@/libs/useApi';
import { Product } from '@/types/Product';
import { Tenant } from '@/types/Tenant';
import { User } from '@/types/User';
import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import NoResults from '@/public/svgs/noResults.svg';

const Home = (data: Props) => {
    const { tenant, setTenant } = useAppContext();
    const { setUser, setToken } = useAuthContext();

    const [openMenu, setOpenMenu] = useState(false);
    const [products, setProducts] = useState<Product[]>(data.products);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        setTenant(data.tenant);
        setToken(data.token);
        if (data.user) setUser(data.user);
    }, []);

    useEffect(() => {
        let newFilteredProducts: Product[] = [];
        for (let product of data.products) {
            if (product.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1) {
                newFilteredProducts.push(product);
            }
        }
        setFilteredProducts(newFilteredProducts);
    }, [searchValue]);

    return (
        <div className="px-6">
            <Head>
                <title>Home</title>
            </Head>

            <header className="mb-6 mt-12">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-semibold">Seja Bem-Vindo(a)👋</h2>
                        <p className="text-xs text-zinc-400 mt-2">
                            Oque deseja para hoje?
                        </p>
                    </div>
                    <MenuButton onOpen={() => setOpenMenu(true)} />
                    <MenuArea
                        tenant={data.tenant}
                        open={openMenu}
                        onClose={() => setOpenMenu(false)}
                    />
                </div>
                <SearchInput onSearch={(value: string) => setSearchValue(value)} />
            </header>
            {searchValue && (
                <>
                    <div className="text-gray-400 mt-10 mb-20">
                        Preocurando por:{' '}
                        <strong className="font-semibold">{searchValue}</strong>
                    </div>
                    {filteredProducts.length === 0 && (
                        <div className="flex flex-col items-center">
                            <NoResults color="#CDCDCD" width={235} />
                            <p className="text-2xl text-[#CDCDCD] font-medium mt-8 text-center">
                                Ops! Não há itens <br /> com este nome
                            </p>
                        </div>
                    )}
                    <div className="">
                        {filteredProducts.length > 0 && (
                            <div className="grid grid-cols-2 gap-6">
                                {filteredProducts.map((item, index) => (
                                    <GridItem key={index} product={item} />
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
            {!searchValue && (
                <>
                    <Banners />
                    <div className="grid grid-cols-2 gap-6">
                        {products.map((item, index) => (
                            <GridItem key={index} product={item} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;

type Props = {
    tenant: Tenant;
    products: Product[];
    token: string;
    user: User | null;
};
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug } = context.query;
    const api = useApi(tenantSlug as string);

    const tenant = await api.getTenant();
    if (!tenant) {
        return { redirect: { destination: '/', permanent: false } };
    }

    const token = getCookie('token', context);
    const user = await api.authorizeToken(token as string);

    const products = await api.getAllProducts();

    return {
        props: {
            tenant,
            products,
            token,
            user,
        },
    };
};
