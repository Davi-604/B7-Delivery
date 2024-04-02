import Image from 'next/image';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { TenantItem } from '@/components/TenantItem';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    const router = useRouter();

    return (
        <div className="mx-6 mt-12">
            <Head>
                <title>B7Delivery</title>
            </Head>

            <div className="max-w-[220px]">
                <img className="w-full" src="/imgs/logo.png" />
            </div>
            <div className="border-t-2 border-gray-300 mt-4"></div>
            <div className="mt-5 font-medium ">
                Escolha abaixo o estabelecimento de sua preferência:
            </div>
            <div className="mt-6">
                <TenantItem
                    name="B7 Burger"
                    fontColor="#fff"
                    mainColor="#FB9400"
                    onClick={() => router.push('/b7burger')}
                />
            </div>
            <div className="mt-6">
                <TenantItem
                    name="B7 pizza"
                    fontColor="#fff"
                    mainColor="#6AB70A"
                    onClick={() => router.push('/b7pizza')}
                />
            </div>
        </div>
    );
}
