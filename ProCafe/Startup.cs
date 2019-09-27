using System;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Swashbuckle.AspNetCore.Swagger;
using DAL.DBModel;
using DAL.Entity;

namespace ProCafe
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        //private readonly IHostingEnvironment _hostingEnvironment;
        public Startup(IConfiguration configuration)//IHostingEnvironment env)
        {
            Configuration = configuration;
            //_hostingEnvironment = env;
            //if (env.IsDevelopment())
            //{
            //    builder.AddUserSecrets<Startup>();
            //}
            //Configuration = builder.Build();
        }

        //private string _bakeryApiKey = null;

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc(options => options.EnableEndpointRouting = true)
            //services.AddMvc(options => options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute()))
            .AddControllersAsServices().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            //services.AddControllers();

            //ViewModels.MapperVm.AutoMapperConfig.Init();
            //_bakeryApiKey = Configuration["Bakery:ServiceApiKey"];
            var connection = Configuration.GetConnectionString("Bakery"); //Configuration["Data:ConnectionString"];
            services.AddDbContext<AppDbContext>(options =>
                         options
                        //.UseLazyLoadingProxies()
                        .UseSqlServer(connection));//can be UseSqlServerCE(connection)) etc

            //Identity signin options
            services.AddIdentity<User, Role>(options =>
            {
                options.User.RequireUniqueEmail = false;
                options.SignIn.RequireConfirmedEmail = false;
            })
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders()
            .AddRoleManager<RoleManager<Role>>().AddRoleValidator<RoleValidator<Role>>()
            .AddUserManager<UserManager<User>>()
            .AddSignInManager<SignInManager<User>>();// specify manager to SignIn user posibility

            // Configure user identity options and password complexity
            services.Configure<IdentityOptions>(options =>
            {
                // User settings
                options.User.RequireUniqueEmail = true;
                // Password settings
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 6;
                //options.Password.RequireNonAlphanumeric = false;
                //options.Password.RequireUppercase = true;
                //options.Password.RequireLowercase = false;

                //// Lockout settings
                //options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                //options.Lockout.MaxFailedAccessAttempts = 10;
            });

            //CUSTOM auth http://jasonwatmore.com/post/2018/09/08/aspnet-core-21-basic-authentication-tutorial-with-example-api#basic-authentication-handler-cs
            //services.AddAuthentication("BasicAuthentication").AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BasicAuthentication", null);

            //INIT AUTHENTICATION with JWT tokens (or can be coockies)
            /*services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                //https://developer.okta.com/blog/2018/03/23/token-authentication-aspnetcore-complete-guide
                //TODO: use SecretManager 
                var sharedKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("mysupers3cr3tsharedkey!"));//Configuration["SigningKey"] 
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,  // Ensure the token was issued by a trusted authorization server (default true):
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidAudience = "api://default",
                    ValidIssuer = "https://{yourOktaDomain}/oauth2/default",
                    IssuerSigningKey = sharedKey//JwtSecurityKey.Create("verylongsecretkey")
                };
            })
            //ADD authenication with social networks
            .AddFacebook(facebookOptions =>
            {
                facebookOptions.AppId = Configuration["Authentication:Facebook:AppId"];
                facebookOptions.AppSecret = Configuration["Authentication:Facebook:AppSecret"];
            })
              .AddTwitter(twOptions =>
              {
                  twOptions.ConsumerKey = Configuration["Authentication:Twitter:ConsumerKey"];
                  twOptions.ConsumerSecret = Configuration["Authentication:Twitter:ConsumerSecret"];
              })
              .AddGoogle(googleOptions =>
              {
                  googleOptions.ClientId = Configuration["Authentication:Google:ClientId"];
                  googleOptions.ClientSecret = Configuration["Authentication:Google:ClientSecret"];
              });*/

            // Add cors
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                        //.WithOrigins("https://www.artngcore.com:4200") //Note:  The URL must be specified without a trailing slash (/).
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });

            //NOTE: attach to header antiforgery token
            services.AddAntiforgery(options =>
            {
                options.HeaderName = "X-XSRF-TOKEN";
                options.SuppressXFrameOptionsHeader = false; //?
            });

            //services.AddSingleton<IDistributedCache, RedisCache>();
            services.AddDistributedMemoryCache(); // Adds a default in-memory implementation of IDistributedCache

            services.AddDistributedSqlServerCache(options =>
            {
                options.ConnectionString = connection;
                options.SchemaName = "dbo";
                options.TableName = "SessionData";
            });

            //To get session from HttpContext
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddSession(options =>
            {
                //options.Cookie.Name = "LanaResto.Session";
                //options.IdleTimeout = System.TimeSpan.FromHours(48);
                //options.Cookie.HttpOnly = false;
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                options.IdleTimeout = TimeSpan.FromMinutes(10);
            });

            // In production Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            // Add scheduled tasks & scheduler
            /*services.AddSingleton<IScheduledTask, QuoteOfTheDayTask>();

            services.AddScheduler((sender, args) =>
            {
                args.SetObserved();
            });*/

            // Enforce https during production. To quickly enable ssl during development. Go to: Project Properties->Debug->Enable SSL
            //if (!_hostingEnvironment.IsDevelopment())
            //    services.Configure<MvcOptions>(options => options.Filters.Add(new RequireHttpsAttribute()));

            //Todo: ***Using DataAnnotations for validation until Swashbuckle supports FluentValidation***
            //services.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>());

            //.AddJsonOptions(opts =>
            //{
            //    opts.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            //});

            /*
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "FrechResto API", Version = "v1" });

                c.AddSecurityDefinition("OpenID Connect", new OAuth2Scheme
                {
                    Type = "oauth2",
                    Flow = "password",
                    TokenUrl = "/connect/token"
                });
            });*/
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IAntiforgery antiforgery, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug(LogLevel.Warning);

            //Utilities.ConfigureLogger(loggerFactory);
            //EmailTemplates.Initialize(env);
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // Enforce https during production
                //var rewriteOptions = new RewriteOptions()
                //    .AddRedirectToHttps();
                //app.UseRewriter(rewriteOptions);
                app.UseExceptionHandler("/Home/Error");
            }

            //Configure Cors
            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod());

            //HTTPS support
            //app.UseHttpsRedirection();
            app.UseStaticFiles(new StaticFileOptions
            {
                OnPrepareResponse = (context) =>
                {
                    var headers = context.Context.Response.GetTypedHeaders();

                    headers.CacheControl = new CacheControlHeaderValue
                    {
                        Public = true,
                        MaxAge = TimeSpan.FromDays(365)
                    };
                }
            });

            app.UseSpaStaticFiles();

            app.UseSession();

            app.UseAuthentication();

            //app.UseEndpoints(endpoints => endpoints.MapControllers());

            app.Use(async (context, next) =>
            {
                var path = context.Request.Path.Value;
                if (path != null && !path.ToLower().Contains("/api"))
                {
                    // XSRF-TOKEN used by angular in the $http if provided
                    var tokens = antiforgery.GetAndStoreTokens(context);
                    context.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken,
                        new CookieOptions
                        {
                            HttpOnly = false,
                            //Secure = true - if https only
                        });
                }
                if (next != null)
                    await next();
            });

            //app.UseMvc(routes =>
            //{
            //    routes.MapRoute(
            //        name: "default",
            //        template: "{controller}/{action=Index}/{id?}");
            //});
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
                /*
                options.SupplyData = (context, data) =>
                {
                    // Creates a new value called isHttpsRequest that's passed to TypeScript code
                    data["isHttpsRequest"] = context.Request.IsHttps;
                };*/
            });

             app.UseSwagger().UseSwaggerUI(c =>
             {
                 //route: "admin/swagger"
                 c.SwaggerEndpoint("/api/swagger/v1/swagger.json", "FrenchResto V1");
             });
        }
    }
}
