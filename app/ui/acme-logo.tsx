import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} space-x-5 flex flex-row items-center leading-none text-white`}
    >
      {/* <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" /> */}
      <Image src={'/favicon.ico'} width={44} height={44} alt='pet'/>
      <p className="text-[44px] text-black">PET</p>
    </div>
  );
}
