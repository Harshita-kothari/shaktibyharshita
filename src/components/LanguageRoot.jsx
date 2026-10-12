import {Fragment,useSyncExternalStore} from 'react';
import {getLanguage,subscribeLanguage} from '../lib/i18n';
export default function LanguageRoot({children}){const language=useSyncExternalStore(subscribeLanguage,getLanguage);return <Fragment key={language}>{children}</Fragment>;}
