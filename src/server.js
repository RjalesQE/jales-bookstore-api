const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const accountRoutes = require('./routes/account');
const bookstoreRoutes = require('./routes/bookstore');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

const swaggerOptions = {
  customCss: `
    .swagger-ui .topbar { background-color: #1a1a2e; }
    .swagger-ui .topbar-wrapper img { content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 30"><text y="22" font-size="18" font-family="Arial" font-weight="bold" fill="%23e94560">Jales</text><text x="52" y="22" font-size="18" font-family="Arial" fill="%23ffffff">API</text></svg>'); width: 100px; }
  `,
  customSiteTitle: 'Jales Bookstore API',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    tryItOutEnabled: true
  }
};

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

app.get('/', (req, res) => res.redirect('/swagger'));

app.use('/Account', accountRoutes);
app.use('/BookStore', bookstoreRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'Jales Bookstore API', version: '1.0.0' });
});

app.use((req, res) => {
  res.status(404).json({ code: '404', message: `Route ${req.method} ${req.path} not found` });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ code: '500', message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Jales Bookstore API running on port ${PORT}`);
  console.log(`📚 Swagger UI: http://localhost:${PORT}/swagger`);
  console.log(`❤️  Health: http://localhost:${PORT}/health\n`);
});

module.exports = app;
