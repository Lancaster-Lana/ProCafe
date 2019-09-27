using Microsoft.AspNetCore.Identity;

namespace DAL.Entity
{
    public class User : IdentityUser<int>
    {
        /// <summary>
        /// First name
        /// </summary>
        public string FirstName { get; set; }

        public string LastName { get; set; }

        //[ForeignKey("UsersGroupId")]
        //public virtual ICollection<UsersGroup> UsersGroups { get; set; } = new List<UsersGroup>();
    }
}
