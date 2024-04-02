import { DefaultButton } from '@/components/DefaultButton';
import { DefaultHeader } from '@/components/DefaultHeader';
import { DefaultInput } from '@/components/DefaultInput';
import { Icon } from '@/components/Icon';
import { useAppContext } from '@/context/app/hook';
import { useApi } from '@/libs/useApi';
import { Tenant } from '@/types/Tenant';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ForgetSuccess = (data: Props) => {
    const { tenant, setTenant } = useAppContext();

    const router = useRouter();

    useEffect(() => {
        setTenant(data.tenant);
    }, []);
    return (
        <div className="py-10 px-6">
            <Head>
                <title>Esqueci minha senha | {tenant?.name}</title>
            </Head>

            <DefaultHeader
                mainColor={data.tenant.mainColor}
                backHref={`/${data.tenant.slug}/forget`}
            />

            <div className="flex justify-center items-center mb-6 mt-20 mx-auto">
                <Icon
                    iconName="mailSent"
                    mainColor={data.tenant.mainColor}
                    height={100}
                    width={81}
                />
            </div>

            <div className="text-center font-semibold text-[26px] text-black/90 mb-8">
                Verifique o seu e-mail
            </div>

            <div
                className="w-[80%] text-stone-500 text-xl leading-6 mb-10 mx-auto text-center"
                style={{ borderColor: data.tenant.mainColor }}
            >
                Enviamos as instruções para recuperação de senha para o seu e-mail.
            </div>
            <DefaultButton
                label="Fazer login"
                mainColor={data.tenant.mainColor}
                onClick={() => router.push(`/${data.tenant.slug}/login`)}
            />
        </div>
    );
};

export default ForgetSuccess;

type Props = {
    tenant: Tenant;
};
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug } = context.query;
    console.log(tenantSlug);
    const api = useApi(tenantSlug as string);

    const tenant = await api.getTenant();
    if (!tenant) {
        return { redirect: { destination: '/', permanent: false } };
    }

    return {
        props: {
            tenant,
        },
    };
};
