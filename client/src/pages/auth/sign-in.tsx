import { UserAuthForm } from './components/user-auth-form'
import MedicalLogo from '@/assets/logo_medicalsanpng.png'
import BannerImage from '@/assets/medical-sanbanner.jpg';

export default function SignIn() {
  return (
    <>
      <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-[1fr_40vw] lg:px-0'>
        <div className='relative hidden h-full flex-col bg-cover bg-no-repeat bg-center p-10 text-white dark:border-r lg:flex'
          style={{ backgroundImage: `url(${BannerImage})`,  backgroundSize: 'cover' }}>
          <div className='absolute inset-0 bg-zinc-900/90 rounded-r-[32px]' />
          <div className='relative z-20 flex items-center text-lg font-medium'>
            <img
              src={MedicalLogo}
              className='mr-2 h-12 w-12'
              width={25}
              height={25}
              alt='Logo'
            />
            Medical San
          </div>

          <div className='relative z-20 mt-auto'>
            <blockquote className='space-y-2'>
              <p className='text-lg'>
                Avaliação de Desenvolvedor de Software.
              </p>
              <footer className='text-sm'>Lucca Menezes</footer>
            </blockquote>
          </div>
        </div>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
              <p className='text-sm text-muted-foreground'>
              Digite seu e-mail e senha abaixo para entrar na sua conta
              
              </p>
            </div>
            <UserAuthForm />        
          </div>
        </div>
      </div>
    </>
  )
}
