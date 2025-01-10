﻿// <auto-generated />
using System;
using Backend.Core.Dbaccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.core.dbaccess.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Backend.Core.Models.Brand", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.HasKey("Id")
                        .HasName("pk_brands");

                    b.HasIndex("Name")
                        .IsUnique()
                        .HasDatabaseName("ix_brands_name");

                    b.ToTable("brands", (string)null);
                });

            modelBuilder.Entity("Backend.Core.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.HasKey("Id")
                        .HasName("pk_categories");

                    b.HasIndex("Name")
                        .IsUnique()
                        .HasDatabaseName("ix_categories_name");

                    b.ToTable("categories", (string)null);
                });

            modelBuilder.Entity("Backend.Core.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("BrandId")
                        .HasColumnType("integer")
                        .HasColumnName("brand_id");

                    b.Property<int?>("CategoryId")
                        .HasColumnType("integer")
                        .HasColumnName("category_id");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<decimal>("Price")
                        .HasColumnType("numeric")
                        .HasColumnName("price");

                    b.Property<decimal>("Rating")
                        .HasColumnType("numeric")
                        .HasColumnName("rating");

                    b.Property<string>("Thumbnail")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("thumbnail");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("title");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_at");

                    b.HasKey("Id")
                        .HasName("pk_products");

                    b.HasIndex("BrandId")
                        .HasDatabaseName("idx_products_brand_id");

                    b.HasIndex("CategoryId")
                        .HasDatabaseName("idx_products_category_id");

                    b.HasIndex("Price")
                        .HasDatabaseName("idx_products_price_id");

                    b.HasIndex("Title")
                        .HasDatabaseName("idx_products_title")
                        .HasAnnotation("Npgsql:IndexOperatorClass", new[] { "gin_trgm_ops" });

                    NpgsqlIndexBuilderExtensions.HasMethod(b.HasIndex("Title"), "gin");
                    NpgsqlIndexBuilderExtensions.HasOperators(b.HasIndex("Title"), new[] { "gin_trgm_ops" });

                    b.HasIndex("CategoryId", "BrandId")
                        .HasDatabaseName("idx_products_category_brand_id");

                    b.ToTable("products", (string)null);
                });

            modelBuilder.Entity("Backend.Core.Models.ProductTag", b =>
                {
                    b.Property<int>("ProductId")
                        .HasColumnType("integer")
                        .HasColumnName("product_id");

                    b.Property<int>("TagId")
                        .HasColumnType("integer")
                        .HasColumnName("tag_id");

                    b.HasKey("ProductId", "TagId")
                        .HasName("pk_product_tags");

                    b.HasIndex("TagId")
                        .HasDatabaseName("ix_product_tags_tag_id");

                    b.ToTable("product_tags", (string)null);
                });

            modelBuilder.Entity("Backend.Core.Models.Tag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.HasKey("Id")
                        .HasName("pk_tags");

                    b.HasIndex("Name")
                        .IsUnique()
                        .HasDatabaseName("ix_tags_name");

                    b.ToTable("tags", (string)null);
                });

            modelBuilder.Entity("Backend.Core.Models.Product", b =>
                {
                    b.HasOne("Backend.Core.Models.Brand", "Brand")
                        .WithMany()
                        .HasForeignKey("BrandId")
                        .HasConstraintName("fk_products_brands_brand_id");

                    b.HasOne("Backend.Core.Models.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .HasConstraintName("fk_products_categories_category_id");

                    b.Navigation("Brand");

                    b.Navigation("Category");
                });

            modelBuilder.Entity("Backend.Core.Models.ProductTag", b =>
                {
                    b.HasOne("Backend.Core.Models.Product", "Product")
                        .WithMany("ProductTags")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_product_tags_products_product_id");

                    b.HasOne("Backend.Core.Models.Tag", "Tag")
                        .WithMany()
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_product_tags_tags_tag_id");

                    b.Navigation("Product");

                    b.Navigation("Tag");
                });

            modelBuilder.Entity("Backend.Core.Models.Product", b =>
                {
                    b.Navigation("ProductTags");
                });
#pragma warning restore 612, 618
        }
    }
}
