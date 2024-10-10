'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function PesquisaPets({ placeholder, query }: { placeholder: string, query: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [petAtivo, setPetAtivo] = useState(localStorage.getItem('petAtivo') ? localStorage.getItem('petAtivo') : '');

  const handleSearch = useDebouncedCallback((term) => {
    // console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    setPetAtivo(localStorage.getItem('petAtivo'))
  }, [query])


  if (petAtivo) {
    // console.log({ petAtivo })
    return (
      <div className="relative flex flex-1 flex-shrink-0 items-center">
        <span className="mr-2">{petAtivo}</span>
        <button
          onClick={() => {
            localStorage.removeItem('petAtivo');
            localStorage.removeItem('petNome');
            localStorage.removeItem('tutorId');
            setPetAtivo(null);
          }}
          className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
          aria-label="Fechar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    );
  } else {
    // console.log('nao tem')
    return (
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get('query')?.toString()}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
    );
  }

}
