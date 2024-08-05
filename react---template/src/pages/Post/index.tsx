import { useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";

function List() {
  const { t } = useTranslation();
  const location = useLocation();
  console.log(location);

  return (
    <div>{t('List.content')}</div>
  )
}

export default List
