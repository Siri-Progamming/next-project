import {useState} from "react";
import PropTypes from "prop-types";
import {AuthProvider} from '/src/contexts/auth';
import '/src/styles/globals.css';
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

export default function MyApp(props) {
    const {Component, pageProps} = props;
    const [searchQuery, setSearchQuery] = useState(null);

    const handleSearch = (results) => {
        setSearchQuery(results);
    };

    return (
        <AuthProvider>
            <Header onSearch={handleSearch}/>
            <Component {...pageProps} searchQuery={searchQuery}/>
            {/*<Footer/>*/}
        </AuthProvider>
    );
}
MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
