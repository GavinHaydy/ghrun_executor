import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {store} from "@/store";
import {Provider} from "react-redux";
import ThemeProvider from "@/layouts/themeProvider.tsx";
import {I18nextProvider} from "react-i18next"
import i18n from "@/locales/i18n.ts";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ThemeProvider>
            <I18nextProvider i18n={i18n}>
                <App/>
            </I18nextProvider>
        </ThemeProvider>
    </Provider>
)
