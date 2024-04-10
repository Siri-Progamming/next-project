import Head from 'next/head';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
const Swagger = () => {
    return (
        <div id="swagger" className="bg-white">
            <Head>
                <title>Swagger Fennext API</title>
                <meta name="description" content="Swagger next-project API" />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <SwaggerUI url="./pages/api/doc" />
        </div>
    );
};
export default Swagger;
