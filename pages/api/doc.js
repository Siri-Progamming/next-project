import { withSwagger } from 'next-swagger-doc';

const swaggerHandler = withSwagger({
    openApiVersion: '3.0.0',
    title: 'Swagger next-project API',
    version: '1.0.0',
    apiFolder: process.env.API_FOLDER
});
export default swaggerHandler();
