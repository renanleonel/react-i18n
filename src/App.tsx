import '@/i18n/config';
import { useTranslation } from 'react-i18next';
import { Header } from './components/header';

const App = () => {
  const { t } = useTranslation();

  return (
    <div className='min-h-screen flex flex-col bg-[#101010]'>
      <Header />
      <main className='flex-1 flex items-center justify-center p-6'>
        <p className='text-white text-2xl'>{t('index:greeting')}</p>
      </main>
    </div>
  );
};

export default App;
