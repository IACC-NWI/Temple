using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Temple.Service.Models
{
    public class ServiceModel
    {
        public int Id { get; set; }
        [MaxLength(500)]
        public string Name { get; set; }
        [MaxLength(20)]
        public string TypeOfService { get; set; }

        public decimal SuggestedDonation { get; set; }
        [MaxLength(500)]
        public string Description { get; set; }
    }
}
