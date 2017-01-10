using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Temple.Service.Database;
using Temple.Service.Database.Models;

namespace Temple.Service.Controllers
{
    [RoutePrefix("api/temple")]
    public class TempleController : ApiController
    {
        private readonly ITempleDatabaseContext _templeDatabaseContext;

        public TempleController(ITempleDatabaseContext templeDatabaseContext)
        {
            _templeDatabaseContext = templeDatabaseContext;
        }
        [Route("getMember/{memberId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetMemberInfo(string memberId)
        {
            var member = _templeDatabaseContext.Members.FirstOrDefault(t => t.MemberId == memberId) ??
                         new Member {MemberId = memberId};
            return Ok(member);
        }

        [Route("updateMember")]
        [HttpPost]
        public async Task<IHttpActionResult> UpdateMember(Member member)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _templeDatabaseContext.Members.Add(member);
            await _templeDatabaseContext.SaveChangesAsync();

            return Ok(member);
        }
    }
}
