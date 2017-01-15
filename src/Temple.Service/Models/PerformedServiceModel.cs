using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Temple.Service.Models
{
    public class PerformedServiceModel
    {
        [Required]
        public Guid Id { get; set; }
        [Column(TypeName = "Date"), Required]
        public DateTime ExpectedDateOfOffering { get; set; }
        [MaxLength(10), Required]
        public string MemberId { get; set; }
        [Required]
        public decimal AmountDonated { get; set; }
        [Required]
        public decimal SuggestedAmountForService { get; set; }
        [MaxLength(50), Required]
        public string PerformedForFirstName { get; set; }
        [MaxLength(50), Required]
        public string PerformedForLastName { get; set; }

        [MaxLength(20), Required]
        public string ServiceType { get; set; }
        [MaxLength(500), Required]
        public string ServiceName { get; set; }
        [MaxLength(100), Required]
        public string Festival { get; set; }

        public string Priest { get; set; }
    }
}
