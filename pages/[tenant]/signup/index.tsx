import { DefaultButton } from '@/components/DefaultButton';
import { DefaultHeader } from '@/components/DefaultHeader';
import { DefaultInput } from '@/components/DefaultInput';
import { useAppContext } from '@/context/app/hook';
import { useApi } from '@/libs/useApi';
import { Tenant } from '@/types/Tenant';
import { ErrorItem, getErrorsFromZod } from '@/utils/getErrorsFromZod';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { string, z } from 'zod';

const SignUp = (data: Props) => {
    const { tenant, setTenant } = useAppContext();
    const router = useRouter();

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [errors, setErrors] = useState<ErrorItem[]>([]);

    const singUpSchema = z.object({
        nameField: string().min(2, 'Mínimo de duas letras'),
        emailField: string().email('Preencha o campo de email corretamente'),
        passwordField: string().min(2, 'Mínimo de dois caracteres'),
    });

    useEffect(() => {
        setTenant(data.tenant);
    }, []);

    useEffect(() => {
        setErrors([]);
    }, [nameField, emailField, passwordField]);

    const handleSingUp = () => {
        const formData = singUpSchema.safeParse({ nameField, emailField, passwordField });
        if (!formData.success) return setErrors(getErrorsFromZod(formData.error));

        router.push(`/${data.tenant.slug}/login`);
    };

    return (
        <div className="py-10 px-6">
            <Head>
                <title>Cadastro | {tenant?.name}</title>
            </Head>

            <DefaultHeader
                mainColor={data.tenant.mainColor}
                backHref={`/${data.tenant.slug}/login`}
            />

            <div className="text-4xl font-bold text-center mt-5 my-10">
                {data.tenant.name}
            </div>
            <div
                className="w-[223px] text-stone-500 text-xl leading-6 pb-10 border-b mx-auto text-center relative"
                style={{ borderColor: data.tenant.mainColor }}
            >
                Preencha os campos para criar o seu cadastro.
            </div>
            <div className="border-t border-gray-200 mt-[-1.5px]"></div>
            <div className="mt-14 mb-8">
                <DefaultInput
                    type="text"
                    mainColor={data.tenant.mainColor}
                    placeholder="Digite o seu nome"
                    value={nameField}
                    onChange={setNameField}
                    errorMessage={
                        errors.find((item) => item.field === 'nameField')?.message
                    }
                />
            </div>
            <div className="mb-8">
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
                    placeholder="Crie a sua senha"
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
                    onClick={handleSingUp}
                />
            </div>

            <div
                className="mx-auto mt-5 pb-10 text-center text-black/90"
                style={{ borderColor: data.tenant.mainColor }}
            >
                Já tem cadastro?
                <Link href={`/${data.tenant.slug}/login`}>
                    <span
                        className="font-semibold ml-[2px]"
                        style={{ color: data.tenant.mainColor }}
                    >
                        Fazer login
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default SignUp;

type Props = {
    tenant: Tenant;
};
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug } = context.query;
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
