using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Temple.Service.Database.Models
{
    public class PerformedService
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        [MaxLength(10), ForeignKey("Member")]
        public string MemberId { get; set; }

        public decimal AmountDonated { get; set; }
        public decimal SuggestedAmountForService { get; set; }
        [MaxLength(50)]
        public string PerformedForFirstName { get; set; }
        [MaxLength(50)]
        public string PerformedForLastName { get; set; }

        [MaxLength(20)]
        public string ServiceType { get; set; }
        [MaxLength(500)]
        public string ServiceName { get; set; }
        [MaxLength(100)]
        public string Festival { get; set; }

        public string Priest { get; set; }
        public virtual Member Member { get; set; }
    }
}
