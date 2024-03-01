import Chat from '@/app/ui/chat/chat';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chat',
};

export default async function Page() {
  return (
    <Chat />
  )
}