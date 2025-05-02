import { LanguageSelector } from './language-selector';

export const Header = () => {
  return (
    <header className='w-full py-4 px-6 flex justify-end '>
      <LanguageSelector />
    </header>
  );
};
