import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="fr">
                <Head>
                    <meta name="theme-color" content="#000000"/>
                    <link rel="shortcut icon" href="/favicon.ico"/>

                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
                    <script src="https://kit.fontawesome.com/49446fd286.js" crossOrigin="anonymous"></script>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Amaranth:ital,wght@0,400;0,700;1,400;1,700&family=Inter:slnt,wght@-10..0,100..900&family=Leckerli+One&family=Mandali&display=swap"
                        rel="stylesheet"/>

                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}
