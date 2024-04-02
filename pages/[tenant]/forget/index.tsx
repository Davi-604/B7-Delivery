import { DefaultButton } from '@/components/DefaultButton';
import { DefaultHeader } from '@/components/DefaultHeader';
import { DefaultInput } from '@/components/DefaultInput';
import { useAppContext } from '@/context/app/hook';
import { useApi } from '@/libs/useApi';
import { Tenant } from '@/types/Tenant';
import { ErrorItem, getErrorsFromZod } from '@/utils/getErrorsFromZod';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { z } from 'zod';

const Forget = (data: Props) => {
    const { tenant, setTenant } = useAppContext();

    const [emailField, setEmailField] = useState('');
    const [errors, setErrors] = useState<ErrorItem[]>([]);

    const router = useRouter();

    useEffect(() => {
        setTenant(data.tenant);
    }, []);

    useEffect(() => {
        setErrors([]);
    }, [emailField]);

    const emailToCodeSchema = z.object({
        emailField: z.string().email('Preencha o campo de email corretamente'),
    });
    const handleSendEmail = () => {
        const formData = emailToCodeSchema.safeParse({ emailField });
        if (!formData.success) return setErrors(getErrorsFromZod(formData.error));

        router.push(`/${data.tenant.slug}/forget-success`);
    };

    return (
        <div className="py-10 px-6">
            <Head>
                <title>Esqueci minha senha | {data.tenant?.name}</title>
            </Head>

            <DefaultHeader
                mainColor={data.tenant.mainColor}
                backHref={`/${data.tenant.slug}/login`}
            />

            <div className="text-4xl font-bold text-center mt-5 my-10">
                {data.tenant.name}
            </div>

            <div className="text-center font-semibold text-2xl text-black/90 mb-8">
                Esqueceu sua senha?
            </div>

            <div
                className="w-[80%] text-stone-500 text-lg leading-6 pb-10 border-b mx-auto text-center relative"
                style={{ borderColor: data.tenant.mainColor }}
            >
                Preencha o campo com seu e-mail e receba as instruções necessárias para
                redefinir a sua senha.
            </div>
            <div className="border-t border-gray-200 mt-[-1.5px]"></div>

            <div className="mb-8 mt-14">
                <DefaultInput
                    type="text"
                    mainColor={data.tenant.mainColor}
                    placeholder="Digite o seu email"
                    value={emailField}
                    onChange={setEmailField}
                    errorMessage={
                        errors.find((item) => item.field === 'emailField')?.message
                    }
                />
            </div>

            <DefaultButton
                label="Enviar"
                mainColor={data.tenant.mainColor}
                onClick={handleSendEmail}
            />
        </div>
    );
};

export default Forget;

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
