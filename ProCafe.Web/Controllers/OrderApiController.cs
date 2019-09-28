using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;
using DAL.DBModel;
using DAL.Entity;

namespace LanaResto.ApiController
{
    [Route("api/orders")]
    [AutoValidateAntiforgeryToken]
    [Produces("application/json")]
    [ApiController]
    public class OrderApiController : Controller
    {
        private AppDbContext _context;

        public OrderApiController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        //[Authorize(Roles = "Administrator")]
        public async Task<IActionResult> List(string search = "", bool related = false)
        {
            var list = _context.Orders
                .Include(o => o.Address)
                .Include(o => o.SelectedProducts)
                .Include(o => o.Payment).AsQueryable();
            if (!string.IsNullOrWhiteSpace(search))
                list = list.Where(p => p.Name.ToLower().Contains(search.ToLower()));
            //   || p.Address.Street.ToLower().Contains(search.ToLower()));
            var res = await list.ToListAsync();
            return Ok(res);
        }

        [HttpGet("{id}")]
        //[Authorize(Roles = "Administrator")]
        public IActionResult GetOrder(long id)
        {
            if (id <= 0)
            {
               ModelState.AddModelError("", "Order id is 0");
                return BadRequest(ModelState);
            }

            IQueryable<Order> query = _context.Orders;
            var result = query.First(p => p.OrderId == id);
            //if (HttpContext.User.IsInRole("Administrator".ThenInclude(s => s.Products);

            return Ok(result);
        }

        [HttpPost("create")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([FromBody]Order order)//([ModelBinder]Order order)
        {
            //Check business conditions:
            if (order.SelectedProducts?.Count == 0)
                ModelState.AddModelError("Error", "Order must contain products");
            if (ModelState.IsValid)
            {
                await _context.AddAsync(order);
                await _context.SaveChangesAsync();
                return Ok(order);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] Order order)
        {
            if (ModelState.IsValid)
            {
                var result = _context.Update(order);
                await _context.SaveChangesAsync();
                return Ok(result);
            }
            return BadRequest(ModelState);
        }

        /*
        [HttpPatch("{id}")]
        public IActionResult Update(long id, [FromBody]JsonPatchDocument<Order> patch)
        {
            Order order = _context.Orders.First(p => p.OrderId == id);
            var odata = new  { Order = order };
            patch.ApplyTo(odata, ModelState);

            if (ModelState.IsValid && TryValidateModel(odata))
            {
                _context.SaveChanges();
                return Ok();
            } else {
                return BadRequest(ModelState);
            }
        }*/

        [HttpDelete("{id}")]
        public void Delete(long id)
        {
            //TODO: errors check
            _context.Orders.Remove(new Order { OrderId = id });
            _context.SaveChanges();
        }
    }
}
