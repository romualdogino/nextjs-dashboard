import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="flex bg-white rounded-lg shadow-lg max-w lg:max-w-4xl">
        <div className="content-center hidden lg:block lg:w-1/3 bg-cover">
          <div className="flex  justify-center shrink-0 items-center rounded-lg bg-white-500 p-4 ">
            <div className="w-32 text-white md:w-36">
              <AcmeLogo />
            </div>
          </div>
        </div>
        <div className="w-full p-8 min-h-max  lg:w-2/3">
          <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
            <div className="lg:hidden flex h-20  justify-center shrink-0 items-center rounded-lg bg-white-500 p-4">
              <div className="w-32 text-white md:w-36">
                <AcmeLogo />
              </div>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>

    </main>
  );
}