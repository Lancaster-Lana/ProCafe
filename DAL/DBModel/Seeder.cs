using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Entity;
using Microsoft.Extensions.Logging;

namespace DAL.DBModel
{
    public class Seeder
    {
        /// <summary>
        /// Load initial data into DB tables
        /// </summary>
        /// <param name="dbContext"></param>
        /// <param name="loggerFactory"></param>
        /// <param name="retry"></param>
        /// <returns></returns>
        public static async Task SeedAsync(AppDbContext dbContext, ILoggerFactory loggerFactory, int? retry = 0)
        {
            int retryForAvailability = retry.Value;
            try
            {
                // TODO: Only run this if using a real database
                // context.Database.Migrate();

                //if (!dbContext.Roles.Any())
                //{
                //    dbContext.Roles.AddRange(
                //        GetPreconfiguredRoles());

                //    await dbContext.SaveChangesAsync();
                //}


                //if (!dbContext.Currencies.Any())
                //{
                //    dbContext.Currencies.AddRange(
                //        GetPreconfiguredCurrencies());

                //    await dbContext.SaveChangesAsync();
                //}

                if (!dbContext.Products.Any())
                {
                    var products = GetPreconfiguredProducts();
                    dbContext.Products.AddRange(products);

                    dbContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                if (retryForAvailability < 10)
                {
                    retryForAvailability++;

                    var logger = loggerFactory.CreateLogger<Seeder>();
                    logger.LogError(ex.Message);

                    await SeedAsync(dbContext, loggerFactory, retryForAvailability);
                }
            }
        }

        //static IEnumerable<Currency> GetPreconfiguredCurrencies()
        //{
        //    return new List<Currency>()
        //    {
        //        new Currency() { Name = "Dollar", CurrencyCode="USD", Symbol = "$", CurrencyBase=1, Decimals =2,  CreatedDate =DateTime.Now},
        //        new Currency() { Name = "EURO", CurrencyCode="EUR", Symbol = "€", CurrencyBase=1,  Decimals =2,  CreatedDate =DateTime.Now },
        //        new Currency() { Name = "Japanese yen", CurrencyCode="JPY", Symbol = "¥", CurrencyBase=1,  Decimals =0,  CreatedDate =DateTime.Now},
        //    };
        //}

        //static IEnumerable<Category> GetPreconfiguredCategories()
        //{
        //    return new List<Category>()
        //    {
        //        new Category() { Name = "Cookies"},
        //        new Category() { Name = "Freshes" },
        //        new Category() { Name = "etc" },
        //    };
        //}

        static IEnumerable<Product> GetPreconfiguredProducts()
        {
            return new List<Product>()
            {

new Product() {
    Name = "Carrot Cake", Description=" A scrumptious mini-carrot cake encrusted with sliced almonds", Category =Category.Tart, Price= 3, ImageName="carrot_cake.jpg" },
new Product() {
    Name ="Lemon Tart", Description="A delicious lemon tart with fresh meringue cooked to perfection", Category =Category.Tart, Price=  4, ImageName ="lemon_tart.jpg" },
new Product() {
    Name ="Cupcakes", Description="Delectable vanilla and chocolate cupcakes", Category =Category.Sweets, Price= 9, ImageName=  "cupcakes.jpg" },
new Product() {
    Name = "Pear Tart", Description = "A glazed pear tart topped with sliced almonds and a dash of cinnamon", Category =Category.Tart, Price=  5, ImageName="pear_tart.jpg" },
new Product() {
    Name =  "Chocolate Cookie", Description = "Rich chocolate frosting cover this chocolate lover’s dream", Category =Category.Cookies, Price=6, ImageName = "chocolate_cake.jpg" },

new Product() {
    Name ="French Bread", Description = "Fresh baked French-style breads", Category ="Bread", Price= 2, ImageName="bread.jpg" },
            };
        }

        //static IEnumerable<UsersGroup> GetPreconfiguredUsersGroups()
        //{
        //    return new List<UsersGroup>()
        //    {
        //        new UsersGroup() { Name = "Admins" },
        //        new UsersGroup() { Name = "Designers"},
        //        new UsersGroup() { Name = "Cooks" },
        //        new UsersGroup() { Name = "Customers" },
        //    };
        //}
    }
}
