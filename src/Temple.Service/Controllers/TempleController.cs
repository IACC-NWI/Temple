using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Temple.Service.Database;
using Temple.Service.Database.Models;
using Temple.Service.Models;

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
            var member = _templeDatabaseContext.Members.FirstOrDefault(t => t.MemberId == memberId);
            var retModel = new MemberModel();
            if (member == null)
            {
                return Ok(new MemberModel
                {
                    MemberId = memberId,
                    MemberNotFound = true
                });
            }
            return Ok(new MemberModel
            {
                MemberId = member.MemberId,
                MemberNotFound = false,
                AddressLine1 = member.AddressLine1,
                AddressLine2 = member.AddressLine2,
                City = member.City,
                FirstName = member.FirstName,
                LastName = member.LastName,
                State = member.State,
                Zip = member.Zip,
                FamilySize = member.FamilySize
            });
        }

        [Route("addMember")]
        [HttpPost]
        public async Task<IHttpActionResult> addMember(MemberModel member)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _templeDatabaseContext.Members.Add(new Member
                {
                    MemberId = member.MemberId,
                    FamilySize = member.FamilySize,
                    State = member.State,
                    City = member.City,
                    Zip = member.Zip,
                    FirstName = member.FirstName,
                    AddressLine1 = member.AddressLine1,
                    AddressLine2 = member.AddressLine2,
                    LastName = member.LastName,
                });
                await _templeDatabaseContext.SaveChangesAsync();

                return Ok(member);
            }
            catch (Exception ex)
            {
                
                throw;
            }
            
        }
        [Route("updateMember")]
        [HttpPost]
        public async Task<IHttpActionResult> updateMember(MemberModel member)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var memberToUdpate = _templeDatabaseContext.Members.First(t => t.MemberId == member.MemberId);
                memberToUdpate.MemberId = member.MemberId;
                memberToUdpate.MemberId = member.MemberId;
                memberToUdpate.FamilySize = member.FamilySize;
                memberToUdpate.State = member.State;
                memberToUdpate.City = member.City;
                memberToUdpate.Zip = member.Zip;
                memberToUdpate.FirstName = member.FirstName;
                memberToUdpate.AddressLine1 = member.AddressLine1;
                memberToUdpate.AddressLine2 = member.AddressLine2;
                memberToUdpate.LastName = member.LastName;
                
                await _templeDatabaseContext.SaveChangesAsync();

                return Ok(member);
            }
            catch (Exception ex)
            {

                throw;
            }

        }
    }
}
