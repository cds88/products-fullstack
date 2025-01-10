# About

Fullstack repository. 




# Usage Guide

This guide provides instructions on how to use the application once it's installed and running.

---

## API Overview

The backend API provides CRUD functionality for the following resources:

- **Products**
- **Categories**
- **Brands**
- **Tags**

The API supports **OData** queries for filtering, sorting, and pagination.

### API Base URL

- **Base URL**: `http://localhost:5013`

### API Documentation

The API is documented using Swagger. Access it at [http://localhost:5013/swagger](http://localhost:5013/swagger).

---

## Endpoints

### Products

- **GET `/odata/products`**
  - Fetch all products.
  - Supports OData queries (e.g., `$filter`, `$orderby`).

- **POST `/odata/products`**
  - Add a new product.
  - Example payload:
    ```json
    {
      "title": "New Product",
      "description": "A great product",
      "category": "Electronics",
      "brand": "BrandA",
      "price": 99.99,
      "rating": 4.5,
      "tags": ["Tag1", "Tag2"]
    }
    ```

### Categories

- **GET `/odata/categories`**
  - Fetch all categories.
- **POST `/odata/categories`**
  - Add a new category.

### Brands

- **GET `/odata/brands`**
  - Fetch all brands.
- **POST `/odata/brands`**
  - Add a new brand.

### Tags

- **GET `/odata/tags`**
  - Fetch all tags.
- **POST `/odata/tags`**
  - Add a new tag.

---

## Frontend Overview

The frontend provides a user interface for managing products, categories, brands, and tags.

### Access the Frontend

- URL: [http://localhost:3000](http://localhost:3000)

### Features

1. **View Products**:
   - Browse products with filters for category, brand, price, and more.
2. **Add Products**:
   - Add new products using the form.
3. **Manage Categories/Brands/Tags**:
   - Add or edit categories, brands, and tags.

---

## Maintenance Tasks

### Database Migrations

1. Add a migration:

   ```bash
   dotnet ef migrations add <MigrationName>
   ```

2. Apply the migration:

   ```bash
   dotnet ef database update
   ```

---

## Troubleshooting

### Common Issues

1. **API Not Starting**:
   - Verify the PostgreSQL database is running and accessible.
   - Check the `appsettings.json` connection string.

2. **Frontend Not Loading**:
   - Ensure `yarn install` has been run in the `frontend` directory.
   - Verify the `BASE_URL` environment variable is correctly set.

3. **Swagger UI Not Accessible**:
   - Confirm the API is running on port 5013.

For additional support, consult the application logs or contact the development team.