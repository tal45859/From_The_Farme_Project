using FromTheFarmer.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FromTheFarmer.Data
{
    public class FromTheFarmerDBContext : DbContext
    {
        public FromTheFarmerDBContext(DbContextOptions<FromTheFarmerDBContext> options) : base(options)
        {

           /* modelBuilder.Entity<PostImagePost>().HasKey(ui => new { ui.ItemId, ui.UserId });
            modelBuilder.Entity<UserItems>()
                .HasOne<User>(sc => sc.User)
                .WithMany(s => s.Items)
                .HasForeignKey(sc => sc.UserId);

            modelBuilder.Entity<UserItems>()
                .HasOne<Items>(sc => sc.Item)
                .WithMany(s => s.Users)
                .HasForeignKey(sc => sc.ItemId);*/
        }
        public virtual DbSet<Category> Category { get; set; }//map Categories table
        public virtual DbSet<Favorite> Favorite { get; set; }//map Favorite table
        public virtual DbSet<Customer> Customer { get; set; }//map Customers table
        public virtual DbSet<Merchant> Merchant { get; set; }//map Merchants table
        public virtual DbSet<Image> Image { get; set; }//map PostImage table
        public virtual DbSet<Post> Post { get; set; }//map Posts table
        public virtual DbSet<Product> Product { get; set; }//map Products table
        public virtual DbSet<User> User { get; set; }//map users table

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //צריכים לכתוב את כל הקשרים שלנו ובכל קשר את ההשפעה


            /* modelBuilder.Entity<User>(entity =>
             {
                 entity
                 .HasMany<Admin>(u => u.Admin)
                 .WithOne(a => a.User)
                 .HasForeignKey(a => a.UserId);
             });

             modelBuilder.Entity<User>(entity =>
             {
                 entity
                 .HasMany<Customer>(u => u.Customer)
                 .WithOne(c => c.User)
                 .HasForeignKey(c => c.UserId);
             });*/

            // .OnDelete(Cascade);

            modelBuilder.Entity<User>(entity =>
             {
                 entity
                 .HasMany<Merchant>(u => u.Merchant)
                 .WithOne(m => m.User)
                 .HasForeignKey(m => m.UserId);
             });

            modelBuilder.Entity<User>(entity =>
            {
                entity
                .HasMany<Customer>(u => u.Customer)
                .WithOne(c => c.User)
                .HasForeignKey(c => c.UserId);
            });

            //modelBuilder.Entity<User>()
            //    .HasMany(u => u.Customer)
            //    .WithOne(c => c.User)
            //    .HasForeignKey(c => c.UserId)
            //    .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<Category>(entity =>
                {
                    entity
                    .HasMany<Post>(c => c.Post)
                    .WithOne(p => p.Category)
                    .HasForeignKey(p => p.CategoryId);
                });





        }


    }
}
