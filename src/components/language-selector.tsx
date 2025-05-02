import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Language } from '@/domain/enums/language';
import { changeLanguage } from '@/i18n/config';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const languages = Object.values(Language);
  const currentLanguage = i18n.language as Language;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='flex items-center gap-2'>
          <Globe className='h-4 w-4' />
          {t(`index:languages.${currentLanguage}`)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {languages.map((language) => (
          <DropdownMenuItem onClick={() => changeLanguage(language)}>
            {t(`index:languages.${language}`)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
