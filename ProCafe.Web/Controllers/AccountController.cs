using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using DAL.Entity;
using LanaResto.Models;

namespace LanaResto.ApiController
{
    [Route("api/account")]
    [ValidateAntiForgeryToken]
    //[ApiController]
    public class AccountController : Controller
    {
        private UserManager<User> _userManager;
        private SignInManager<User> _signInManager;

        public AccountController(UserManager<User> userMgr, SignInManager<User> signInMgr)
        //IMemoryCache cache) : base(cache)
        {
            _userManager = userMgr;
            _signInManager = signInMgr;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]  //[AutoValidateAntiforgeryToken]
        public async Task<IActionResult> Login([FromBody] LoginViewModel creds)
        {
            if (ModelState.IsValid && await DoLogin(creds))
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }

        // POST: api/account/register
        [HttpPost("register")]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel model, string returnUrl = null)
        {
            // ViewData["ReturnUrl"] = returnUrl;
            if (ModelState.IsValid)
            {
                var user = new User
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    //NormalizedUserName = 
                    UserName = model.UserName,
                    Email = model.Email,
                    //PasswordHash = (new PasswordHasher(null)).HashPassword(model.Password)
                };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    // For more information on how to enable account confirmation and password reset please visit https://go.microsoft.com/fwlink/?LinkID=532713
                    // Send an email with this link
                    //var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    //var callbackUrl = Url.Action(nameof(ConfirmEmail), "Account", new { userId = user.Id, code = code }, protocol: HttpContext.Request.Scheme);
                    //await _emailSender.SendEmailAsync(model.Email, "Confirm your account",
                    //    $"Please confirm your account by clicking this link: <a href='{callbackUrl}'>link</a>");

                    //await _signInManager.SignInAsync(user, isPersistent: false);
                   
                    //_logger.LogInformation(3, "User created a new account with password.");
                    //ViewBag.returnUrl = returnUrl;
                    return Ok();
                }
                else
                    ModelState.AddModelError("Error",  result.Errors.FirstOrDefault().Description);
            }
            //Request.CreateErrorResponse
            // If we got this far, something failed
            return BadRequest(ModelState);
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel creds, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                if (await DoLogin(creds))
                {
                    return Redirect(returnUrl ?? "/");
                }
                else
                {
                    ModelState.AddModelError("", "Invalid username or password");
                }
            }
            return View(creds);
        }

        [HttpPost]
        public async Task<IActionResult> Logout(string redirectUrl)
        {
            await _signInManager.SignOutAsync();
            return Redirect(redirectUrl ?? "/");
        }

        private async Task<bool> DoLogin(LoginViewModel creds)
        {
            var user = await _userManager.FindByNameAsync(creds.Name);
            if (user != null)
            {
                await _signInManager.SignOutAsync();

                var result = await _signInManager.CheckPasswordSignInAsync(user, creds.Password, true); //_signInManager.PasswordSignInAsync(user, creds.Password, true, false);
                return result.Succeeded;
                //return true;
            }
            return false;
        }
    }
}
