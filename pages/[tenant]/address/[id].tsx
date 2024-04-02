import { DefaultHeader } from '@/components/DefaultHeader';
import { useAppContext } from '@/context/app/hook';
import { useApi } from '@/libs/useApi';
import { Tenant } from '@/types/Tenant';
import { User } from '@/types/User';
import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Address } from '@/types/Address';
import { DefaultInput } from '@/components/DefaultInput';
import { DefaultButton } from '@/components/DefaultButton';
import { string, z } from 'zod';
import { ErrorItem, getErrorsFromZod } from '@/utils/getErrorsFromZod';

const EditAddress = (data: Props) => {
    const { setTenant } = useAppContext();
    const router = useRouter();
    const api = useApi(data.tenant.slug);

    const [address, setAddress] = useState<Address>(data.address);
    const [errors, setErrors] = useState<ErrorItem[]>([]);

    useEffect(() => {
        setTenant(data.tenant);
    }, []);

    const handleUpdateAddress = (
        field: keyof Address,
        value: (typeof address)[keyof Address]
    ) => {
        setAddress({ ...address, [field]: value });
    };

    const editAddressSchema = z.object({
        cepField: string()
            .trim()
            .min(8, 'O CEP deve ter 8 caracteres')
            .max(8, 'O CEP deve ter 8 caracteres'),
        streetField: string().min(2, 'Rua inválida'),
        numberField: string().min(2, 'Número inválido'),
        neighborhoodField: string().min(2, 'Bairro inválido'),
        cityField: string().min(2, 'Cidade inválida'),
        stateField: string()
            .min(2, 'Mínimo de duas letras')
            .max(2, 'Máximo de duas letras'),
    });

    const handleSaveAddress = async () => {
        const formData = editAddressSchema.safeParse({
            cepField: address.cep,
            streetField: address.street,
            numberField: address.number,
            neighborhoodField: address.neighborhood,
            cityField: address.city,
            stateField: address.state,
        });
        if (!formData.success) return setErrors(getErrorsFromZod(formData.error));

        const updatedAddress = await api.updateUserAddress(
            address,
            parseInt(data.tenant.slug)
        );
        if (!updatedAddress) {
            alert('Não foi possível editar o seu endereço');
        } else {
            router.push(`/${data.tenant.slug}/myaddresses`);
        }
    };
    return (
        <div className="">
            <Head>
                <title>Editar Endereço | {data.tenant.name}</title>
            </Head>

            <div className="mt-16">
                <DefaultHeader
                    backHref={`/${data.tenant.slug}/myaddresses`}
                    mainColor={data.tenant.mainColor}
                    title="Editar Endereço"
                />
            </div>
            <div
                className="mx-6 mt-6 flex flex-col border-t-2 pt-[26px] font-medium"
                style={{ borderColor: data.tenant.secondColor }}
            >
                <div className="mt-6 ">
                    <div className="text-lg mb-2">CEP</div>
                    <div className="">
                        <DefaultInput
                            mainColor={data.tenant.mainColor}
                            placeholder="Digite o seu CEP"
                            type="text"
                            value={address.cep.replaceAll(/\D/g, '').trim()}
                            onChange={(e) => handleUpdateAddress('cep', e)}
                            errorMessage={
                                errors.find((item) => item.field === 'cepField')?.message
                            }
                        />
                    </div>
                </div>
                <div className="mt-6 flex">
                    <div className="flex-1">
                        <div className="text-lg mb-2">Rua</div>
                        <div className="mr-6">
                            <DefaultInput
                                mainColor={data.tenant.mainColor}
                                placeholder="Digite a rua"
                                type="text"
                                value={address.street}
                                onChange={(e) => handleUpdateAddress('street', e)}
                                errorMessage={
                                    errors.find((item) => item.field === 'streetField')
                                        ?.message
                                }
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="text-lg mb-2">Número</div>
                        <div className="">
                            <DefaultInput
                                mainColor={data.tenant.mainColor}
                                placeholder="Digite o seu n°"
                                type="text"
                                value={address.number}
                                onChange={(e) => handleUpdateAddress('number', e)}
                                errorMessage={
                                    errors.find((item) => item.field === 'numberField')
                                        ?.message
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-6 ">
                    <div className="text-lg mb-2">Bairro</div>
                    <div className="">
                        <DefaultInput
                            mainColor={data.tenant.mainColor}
                            placeholder="Digite o seu bairro"
                            type="text"
                            value={address.neighborhood}
                            onChange={(e) => handleUpdateAddress('neighborhood', e)}
                            errorMessage={
                                errors.find((item) => item.field === 'neighborhoodField')
                                    ?.message
                            }
                        />
                    </div>
                </div>
                <div className="mt-6 ">
                    <div className="text-lg mb-2">Cidade</div>
                    <div className="">
                        <DefaultInput
                            mainColor={data.tenant.mainColor}
                            placeholder="Digite a sua cidade"
                            type="text"
                            value={address.city}
                            onChange={(e) => handleUpdateAddress('city', e)}
                            errorMessage={
                                errors.find((item) => item.field === 'cityField')?.message
                            }
                        />
                    </div>
                </div>
                <div className="mt-6 ">
                    <div className="text-lg mb-2">Estado</div>
                    <div className="">
                        <DefaultInput
                            mainColor={data.tenant.mainColor}
                            placeholder="Digite o seu estado"
                            type="text"
                            value={address.state.toUpperCase()}
                            onChange={(e) => handleUpdateAddress('state', e)}
                            errorMessage={
                                errors.find((item) => item.field === 'stateField')
                                    ?.message
                            }
                        />
                    </div>
                </div>
                <div className="mt-6 ">
                    <div className="text-lg mb-2">Complemento</div>
                    <div className="">
                        <DefaultInput
                            mainColor={data.tenant.mainColor}
                            placeholder="Digite algum informação complementar"
                            type="text"
                            value={address.complement ?? ''}
                            onChange={(e) => handleUpdateAddress('complement', e)}
                        />
                    </div>
                </div>
                <div className="mt-6 mb-12">
                    <DefaultButton
                        label="Salvar Endereço"
                        mainColor={data.tenant.mainColor}
                        onClick={handleSaveAddress}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditAddress;

type Props = {
    tenant: Tenant;
    token: string;
    user: User;
    address: Address;
};
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug, addressId } = context.query;
    const api = useApi(tenantSlug as string);

    const tenant = await api.getTenant();
    if (!tenant) {
        return { redirect: { destination: '/', permanent: false } };
    }

    const token = getCookie('token', context);
    const user = await api.authorizeToken(token as string);
    if (!user) {
        return { redirect: { destination: `/${tenant.slug}/login`, permanent: false } };
    }

    const address = await api.getUserAddress(parseInt(addressId as string));

    return {
        props: {
            tenant,
            token,
            user,
            address,
        },
    };
};
