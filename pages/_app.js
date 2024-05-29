import PropTypes from "prop-types";
import {AuthProvider} from '/src/contexts/AuthContext';
import '/src/styles/globals.css';
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import {NameSearchProvider} from "../src/contexts/NameSearchContext";
import CollapsibleVerticalPanel from "../src/components/Panels/CollapsibleVerticalPanel";
import {MovieFilterProvider} from "../src/contexts/MovieFilterContext";
import {ConstantesProvider} from "../src/contexts/ConstantesContext";
import {AppProvider} from "../src/contexts/AppContext";
import {SerieFilterProvider} from "../src/contexts/SerieFilterContext";
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/config/i18n';

export default function MyApp(props) {
    const {Component, pageProps} = props;

    return (
        <I18nextProvider i18n={i18n}>
            <ConstantesProvider>
                <AppProvider>
                    <AuthProvider>
                        <NameSearchProvider>
                            <MovieFilterProvider>
                                <SerieFilterProvider>

                                    <Header/>
                                    <CollapsibleVerticalPanel/>
                                    <Component {...pageProps} />
                                    {/*<Footer/>*/}

                                </SerieFilterProvider>
                            </MovieFilterProvider>
                        </NameSearchProvider>
                    </AuthProvider>
                </AppProvider>
            </ConstantesProvider>
        </I18nextProvider>
    );
}
MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
