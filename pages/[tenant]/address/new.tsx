import { DefaultButton } from '@/components/DefaultButton';
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
import { AddressItem } from '@/components/address/AddressItem';
import { DefaultInput } from '@/components/DefaultInput';
import { ErrorItem, getErrorsFromZod } from '@/utils/getErrorsFromZod';
import { string, z } from 'zod';

const NewAddress = (data: Props) => {
    const { setTenant, setAddress } = useAppContext();
    const router = useRouter();
    const api = useApi(data.tenant.slug);

    const [cepField, setCepField] = useState('');
    const [streetField, setStreetField] = useState('');
    const [numberField, setNumberField] = useState('');
    const [neighborhoodField, setNeighborhoodField] = useState('');
    const [cityField, setCityField] = useState('');
    const [stateField, setStateField] = useState('');
    const [complementField, setComplementField] = useState('');
    const [errors, setErrors] = useState<ErrorItem[]>([]);

    useEffect(() => {
        setTenant(data.tenant);
    }, []);

    useEffect(() => {
        setErrors([]);
    }, [cepField, streetField, numberField, neighborhoodField, cityField, stateField]);

    const addAddressSchema = z.object({
        cepField: string()
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

    const handleAddNewAddress = async () => {
        const formData = addAddressSchema.safeParse({
            cepField,
            streetField,
            numberField,
            neighborhoodField,
            cityField,
            stateField,
        });
        if (!formData.success) return setErrors(getErrorsFromZod(formData.error));

        const newAddress = await api.addUserAddress({
            id: 12,
            cep: cepField,
            city: cityField,
            neighborhood: neighborhoodField,
            number: numberField,
            state: stateField,
            street: streetField,
            complement: complementField,
        });
        if (!newAddress) {
            alert('Não foi possível adicionar o seu endereço');
        } else {
            router.push(`/${data.tenant.slug}/myaddresses`);
        }
    };

    return (
        <div className="">
            <Head>
                <title>Novo Endereço | {data.tenant.name}</title>
            </Head>

            <div className="mt-16">
                <DefaultHeader
                    backHref={`/${data.tenant.slug}/myaddresses`}
                    mainColor={data.tenant.mainColor}
                    title="Novo Endereço"
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
                            value={cepField.replaceAll(/\D/g, '')}
                            onChange={setCepField}
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
                                value={streetField}
                                onChange={setStreetField}
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
                                value={numberField}
                                onChange={setNumberField}
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
                            value={neighborhoodField}
                            onChange={setNeighborhoodField}
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
                            value={cityField}
                            onChange={setCityField}
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
                            value={stateField.toUpperCase()}
                            onChange={setStateField}
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
                            value={complementField}
                            onChange={setComplementField}
                        />
                    </div>
                </div>
                <div className="mt-6 mb-12">
                    <DefaultButton
                        label="Salvar Endereço"
                        mainColor={data.tenant.mainColor}
                        onClick={handleAddNewAddress}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewAddress;

type Props = {
    tenant: Tenant;
    token: string;
    user: User;
    addresses: Address[];
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
    if (!user) {
        return { redirect: { destination: `/${tenant.slug}/login`, permanent: false } };
    }

    const addresses = await api.getUserAdresses('');

    return {
        props: {
            tenant,
            token,
            user,
            addresses,
        },
    };
};
