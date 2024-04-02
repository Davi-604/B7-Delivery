import { DefaultButton } from '@/components/DefaultButton';
import { DefaultHeader } from '@/components/DefaultHeader';
import { DefaultInput } from '@/components/DefaultInput';
import { useAppContext } from '@/context/app/hook';
import { useAuthContext } from '@/context/auth/hook';
import { useApi } from '@/libs/useApi';
import { Tenant } from '@/types/Tenant';
import { ErrorItem, getErrorsFromZod } from '@/utils/getErrorsFromZod';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { string, z } from 'zod';

const Login = (data: Props) => {
    const { tenant, setTenant } = useAppContext();
    const { setToken, setUser } = useAuthContext();
    const router = useRouter();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [errors, setErrors] = useState<ErrorItem[]>([]);

    const loginSchema = z.object({
        emailField: string().email('Preencha o campo de email corretamente'),
        passwordField: string().min(2, 'Preencha o campo de senha corretamente'),
    });

    useEffect(() => {
        setTenant(data.tenant);
    }, []);

    useEffect(() => {
        setErrors([]);
    }, [emailField, passwordField]);

    const handleSubmit = () => {
        const formData = loginSchema.safeParse({ emailField, passwordField });
        if (!formData.success) return setErrors(getErrorsFromZod(formData.error));

        setToken('1234');
        setUser({
            name: 'Davi',
            email: 'Davimedeiroscv1001@gmail.com',
        });

        router.push(`/${tenant?.slug}`);
    };
    return (
        <div className="py-10 px-6">
            <Head>
                <title>Login | {tenant?.name}</title>
            </Head>

            <DefaultHeader
                mainColor={data.tenant.mainColor}
                backHref={`/${data.tenant.slug}`}
            />

            <div className="text-4xl font-bold text-center mt-5 my-10">
                {data.tenant.name}
            </div>
            <div
                className="w-[223px] text-stone-500 text-xl leading-6 pb-10 border-b mx-auto text-center relative"
                style={{ borderColor: data.tenant.mainColor }}
            >
                Use suas credenciais para realizar o login.
            </div>
            <div className="border-t border-gray-200 mt-[-1.5px]"></div>
            <div className="mt-14 mb-8">
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

            <div className="mb-8">
                <DefaultInput
                    type=""
                    placeholder="Digite a sua senha"
                    mainColor={data.tenant.mainColor}
                    value={passwordField}
                    onChange={setPasswordField}
                    password={true}
                    errorMessage={
                        errors.find((item) => item.field === 'passwordField')?.message
                    }
                />
            </div>

            <div className="mb-12">
                <DefaultButton
                    label="Entrar"
                    mainColor={data.tenant.mainColor}
                    onClick={handleSubmit}
                />
            </div>

            <div
                className="w-fit mx-auto mt-5 pb-10 border-b text-center text-black/90 relative"
                style={{ borderColor: data.tenant.mainColor }}
            >
                Esqueceu sua senha?
                <Link href={`/${data.tenant.slug}/forget`}>
                    <span
                        className="font-semibold ml-[2px]"
                        style={{ color: data.tenant.mainColor }}
                    >
                        Clique aqui
                    </span>
                </Link>
            </div>
            <div className="border-t border-gray-200 mt-[-1.5px] mb-10"></div>

            <DefaultButton
                label="Quero me cadastrar"
                mainColor={data.tenant.mainColor}
                onClick={() => router.push(`/${data.tenant.slug}/signup`)}
                fill
            />
        </div>
    );
};

export default Login;

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
