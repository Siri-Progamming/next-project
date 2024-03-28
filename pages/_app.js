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

export default function MyApp(props) {
    const {Component, pageProps} = props;

    return (
        <ConstantesProvider>
            <AppProvider>
                <AuthProvider>
                    <NameSearchProvider>
                        <MovieFilterProvider>

                            <Header/>
                            <CollapsibleVerticalPanel/>
                            <Component {...pageProps} />
                            {/*<Footer/>*/}

                        </MovieFilterProvider>
                    </NameSearchProvider>
                </AuthProvider>
            </AppProvider>
        </ConstantesProvider>
    );
}
MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
