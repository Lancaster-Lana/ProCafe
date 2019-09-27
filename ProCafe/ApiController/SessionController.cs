using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using LanaResto.Models; 

namespace LanaResto.ApiController
{
    [Route("api/session")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        private readonly IHttpContextAccessor _session;
        public SessionController(IHttpContextAccessor session)
        {
            _session = session;
        }

        [HttpGet("cart")]
        public IActionResult GetCart()
        {
            var cart = _session.HttpContext.Items["cart"]; // HttpContext.Session.GetString("cart")
            return Ok(cart);
        }

        [HttpPost("cart")]
        public void StoreCart([FromBody] ProductSelection[] products)
        {
            var jsonData = JsonConvert.SerializeObject(products);
            _session.HttpContext.Items["cart"] = jsonData;//HttpContext.Session.SetString("cart", jsonData);
        }

        [HttpGet("checkout")]
        public IActionResult Checkout()
        {
            var res = _session.HttpContext.Items["checkout"];//HttpContext.Session.GetString("checkout");
            //if (res == null)
            //    return NotFound();
            return Ok(res);
        }
        
        [HttpPost("checkout")]
        public void StoreCheckout([FromBody] CheckoutState data)
        {
            var res = JsonConvert.SerializeObject(data);
            _session.HttpContext.Items["checkout"] = res;//HttpContext.Session.SetString("checkout", res);
        }        
    }
}
