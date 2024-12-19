using Backend.Models;
using Microsoft.EntityFrameworkCore;


public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {

    }

    public DbSet<Product> Products { get; set; } = null!;
    public DbSet<Category> Categories { get; set; } = null!;
    public DbSet<Tag> Tags { get; set; } = null!;
    public DbSet<Brand> Brands { get; set; } = null!;
    public DbSet<ProductTag> ProductTags { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);


        modelBuilder.Entity<Product>().ToTable("products");



        modelBuilder.Entity<Category>().ToTable("categories").HasIndex(c => c.Name).IsUnique();
        modelBuilder.Entity<Category>().Property(c => c.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

        modelBuilder.Entity<Brand>().ToTable("brands").HasIndex(b => b.Name).IsUnique();
        modelBuilder.Entity<Brand>().Property(b => b.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

        modelBuilder.Entity<Tag>().ToTable("tags").HasIndex(t => t.Name).IsUnique();
        modelBuilder.Entity<Tag>().Property(t => t.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

        modelBuilder.Entity<ProductTag>().ToTable("product_tags").HasKey(pt => new { pt.ProductId, pt.TagId });
        modelBuilder.Entity<ProductTag>().HasOne(pt => pt.Product).WithMany(p => p.ProductTags).HasForeignKey(pt => pt.ProductId);
        modelBuilder.Entity<ProductTag>().HasOne(pt => pt.Tag).WithMany().HasForeignKey(pt => pt.TagId);



        modelBuilder.Entity<Product>().HasIndex(p => p.CategoryId).HasDatabaseName("idx_products_category_id");
        modelBuilder.Entity<Product>().HasIndex(p => p.BrandId).HasDatabaseName("idx_products_brand_id");
        modelBuilder.Entity<Product>().HasIndex(p => p.Price).HasDatabaseName("idx_products_price_id");
        modelBuilder.Entity<Product>().HasIndex(p => new { p.CategoryId, p.BrandId }).HasDatabaseName("idx_products_category_brand_id");
        modelBuilder.Entity<Product>().HasIndex(p => p.Title).HasAnnotation("Npgsql:IndexMethod", "gin").HasAnnotation("Npgsql:IndexOperatorClass", new[] { "gin_trgm_ops" }).HasOperators("gin_trgm_ops").HasMethod("gin").HasDatabaseName("idx_products_title");

    }

}