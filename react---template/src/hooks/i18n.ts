import { useTranslation } from "react-i18next";

const useI18n = () => {
    const { t } = useTranslation();
    return { t };
}
export {useI18n}