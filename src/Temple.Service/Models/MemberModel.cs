using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Temple.Service.Models
{
    public class MemberModel
    {
        [Required, MaxLength(10)]
        public string MemberId { get; set; }
        [Required, MaxLength(50)]
        public string FirstName { get; set; }
        [Required, MaxLength(50)]
        public string LastName { get; set; }
        [Required, MaxLength(50)]
        public string AddressLine1 { get; set; }
        [MaxLength(50)]
        public string AddressLine2 { get; set; }
        [Required, MaxLength(20)]
        public string City { get; set; }
        [Required, MaxLength(2)]
        public string State { get; set; }
        [Required, MaxLength(5)]
        public string Zip { get; set; }
        public int FamilySize { get; set; }

        public bool MemberNotFound { get; set; }
    }
}
