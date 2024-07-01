import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'pet',
};

export default async function Page({ params }: { params: { id: string } }) {

    return(<>{params.id}</>)
}