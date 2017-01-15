using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Castle.MicroKernel.SubSystems.Conversion;
using log4net;
using log4net.Core;
using Temple.Service.Database;
using Temple.Service.Database.Models;
using Temple.Service.Models;

namespace Temple.Service.Controllers
{
    [RoutePrefix("api/temple")]
    public class TempleController : ApiController
    {
        private readonly ITempleDatabaseContext _templeDatabaseContext;

        private static readonly log4net.ILog logger =
            log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);


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
                FamilySize = member.FamilySize,
                Email = member.Email
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
                    Email = member.Email,
                });
                await _templeDatabaseContext.SaveChangesAsync();

                return Ok(member);
            }
            catch (Exception ex)
            {
                logger.Error($"Error adding the member with id : {member.MemberId}, Exception: {ex}");
                return BadRequest($"Error adding the member with id{member.MemberId}");

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
                memberToUdpate.Email = member.Email;

                await _templeDatabaseContext.SaveChangesAsync();

                return Ok(member);
            }
            catch (Exception ex)
            {
                logger.Error($"Error updaing the member with id: {member.MemberId}, exception: {ex}");
                return BadRequest($"Error updaing the member {ex.Message}");
            }

        }

        [Route("addnewfestival")]
        [HttpPost]
        public async Task<IHttpActionResult> AddFestival(FestivalModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                logger.Info($"Adding new festival: {model.Name}");
                var festivalEntity = new Festival
                {
                    Name = model.Name
                };
                _templeDatabaseContext.Festival.Add(festivalEntity);
                await _templeDatabaseContext.SaveChangesAsync();
                model.Id = festivalEntity.Id;
                return Ok(model);
            }
            catch (Exception exception)
            {
                logger.Error($"Error adding new festival {model.Name}, Exception: {exception}");
                return BadRequest($"Error adding new festival: {model.Name}");
            }
        }

        [Route("updateFestival")]
        [HttpPost]
        public async Task<IHttpActionResult> UpdateFestival(FestivalModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                logger.Info($"Updating festival:{model.Id}, {model.Name}");
                var festivalEntity = await _templeDatabaseContext.Festival.FirstAsync(t => t.Id == model.Id);
                festivalEntity.Name = model.Name;
                await _templeDatabaseContext.SaveChangesAsync();
                return Ok(model);
            }
            catch (Exception exception)
            {
                logger.Error($"Error updating festival {model.Name}, Exception: {exception}");
                return BadRequest($"Error updating festival: {model.Name}");
            }
        }

        [Route("getFestivals")]
        [HttpGet]
        public async Task<IHttpActionResult> GetFestivals()
        {
            var festivals = await _templeDatabaseContext.Festival.ToListAsync();
            return Ok(festivals.Select(t => new FestivalModel
            {
                Name = t.Name,
                Id = t.Id
            }));
        }

        #region Services

        [Route("getServiceTypes")]
        [HttpGet]
        public async Task<IHttpActionResult> GetServiceTypes()
        {
            var retList = new List<string>();
            foreach (var svcType in Enum.GetValues(typeof(Database.Models.ServiceTypes)))
            {
                retList.Add(svcType.ToString());
            }
            return Ok(retList);
        }

        [Route("addNewService")]
        [HttpPost]
        public async Task<IHttpActionResult> AddNewService(ServiceModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var svc = new Database.Models.Service
                {
                    Name = model.Name,
                    Description = model.Description,
                    SuggestedDonation = model.SuggestedDonation,
                    TypeOfService = model.TypeOfService
                };
                _templeDatabaseContext.Services.Add(svc);
                await _templeDatabaseContext.SaveChangesAsync();
                model.Id = svc.Id;
                return Ok(model);
            }
            catch (Exception ex)
            {
                logger.Error($"There was an error adding new service {model.Name}, Exception: {ex}");
                return BadRequest($"There was an error adding new service {model.Name}");
            }
        }

        [Route("UpdateService")]
        [HttpPost]
        public async Task<IHttpActionResult> UpdateService(ServiceModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var svc = await _templeDatabaseContext.Services.FirstAsync(t => t.Id == model.Id);
                svc.Name = model.Name;
                svc.Description = model.Description;
                svc.SuggestedDonation = model.SuggestedDonation;
                svc.TypeOfService = model.TypeOfService;

                await _templeDatabaseContext.SaveChangesAsync();

                return Ok(model);
            }
            catch (Exception ex)
            {
                logger.Error($"There was an error updating service {model.Id}, Exception: {ex}");
                return BadRequest($"There was an error updading service {model.Name}");
            }
        }

        [Route("getServices")]
        [HttpPost]
        public async Task<IHttpActionResult> GetAllServices()
        {
            var services = await _templeDatabaseContext.Services.ToListAsync();
            return Ok(services.Select(t => new ServiceModel
            {
                Id = t.Id,
                Name = t.Name,
                SuggestedDonation = t.SuggestedDonation,
                Description = t.Description,
                TypeOfService = t.TypeOfService
            }).ToList());
        }
        #endregion

        [Route("addPerformedService")]
        [HttpPost]
        public async Task<IHttpActionResult> AddPerformedService(PerformedServiceModel model )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var svcPerformed = new PerformedService
                {
                    MemberId = model.MemberId,
                    Festival = model.Festival,
                    Id = model.Id,
                    ServiceName = model.ServiceName,
                    AmountDonated = model.AmountDonated,
                    CreationDate = DateTime.Now,
                    ExpectedDateOfOffering = model.ExpectedDateOfOffering.Date,
                    PerformedForFirstName = model.PerformedForFirstName,
                    PerformedForLastName = model.PerformedForLastName,
                    Priest = model.Priest,
                    ServiceType = model.ServiceType,
                    SuggestedAmountForService = model.SuggestedAmountForService
                };
                _templeDatabaseContext.PerformedServices.Add(svcPerformed);
                await _templeDatabaseContext.SaveChangesAsync();
                return Ok(model);
            }
            catch (Exception exception)
            {
                logger.Error($"There was an error setting up service for member: {model.MemberId}, service: {model.ServiceName}, Exception:{exception}");
                return BadRequest($"There was an error setting up service for member: {model.MemberId}, service: {model.ServiceName}");
            }
        }

        [Route("updatePerformedService")]
        [HttpPost]
        public async Task<IHttpActionResult> UpdatePerformedService(PerformedServiceModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var svcPerformed = await _templeDatabaseContext.PerformedServices.FirstAsync(t => t.Id == model.Id);

                svcPerformed.MemberId = model.MemberId;
                svcPerformed.Festival = model.Festival;
                svcPerformed.Id = model.Id;
                svcPerformed.ServiceName = model.ServiceName;
                svcPerformed.AmountDonated = model.AmountDonated;
                svcPerformed.CreationDate = DateTime.Now;
                svcPerformed.ExpectedDateOfOffering = model.ExpectedDateOfOffering.Date;
                svcPerformed.PerformedForFirstName = model.PerformedForFirstName;
                svcPerformed.PerformedForLastName = model.PerformedForLastName;
                svcPerformed.Priest = model.Priest;
                svcPerformed.ServiceType = model.ServiceType;
                svcPerformed.SuggestedAmountForService = model.SuggestedAmountForService;
                
                await _templeDatabaseContext.SaveChangesAsync();
                return Ok(model);
            }
            catch (Exception exception)
            {
                logger.Error($"There was an error Updating service for member: {model.MemberId}, service: {model.ServiceName}, Id: {model.Id}, Exception:{exception}");
                return BadRequest($"There was an error setting up service for member: {model.MemberId}, service: {model.ServiceName}");
            }
        }
        
        [Route("getServiceByMember/{memberId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetServicesByMember(string memberId)
        {
            var servicesPerformedByMember =
                await _templeDatabaseContext.PerformedServices.Where(t => t.MemberId == memberId).ToListAsync();
            return Ok(servicesPerformedByMember.Select(t => new PerformedServiceModel
            {
                MemberId = t.MemberId,
                Festival = t.Festival,
                Id = t.Id,
                ServiceName = t.ServiceName,
                AmountDonated = t.AmountDonated,
                ExpectedDateOfOffering = t.ExpectedDateOfOffering,
                SuggestedAmountForService = t.SuggestedAmountForService,
                Priest = t.Priest,
                PerformedForFirstName = t.PerformedForFirstName,
                ServiceType = t.ServiceType,
                PerformedForLastName = t.PerformedForLastName
            }).ToList());
        }
        [Route("getServiceByMemberForRange/{memberId}/{startDate}/{endDate}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetServicesByMemberForRange(string memberId, DateTime startDate, DateTime endDate)
        {
            var servicesPerformedByMember =
                await _templeDatabaseContext.PerformedServices.Where(t => t.MemberId == memberId
                && t.ExpectedDateOfOffering >= startDate 
                && t.ExpectedDateOfOffering <= endDate).ToListAsync();
            return Ok(servicesPerformedByMember.Select(t => new PerformedServiceModel
            {
                MemberId = t.MemberId,
                Festival = t.Festival,
                Id = t.Id,
                ServiceName = t.ServiceName,
                AmountDonated = t.AmountDonated,
                ExpectedDateOfOffering = t.ExpectedDateOfOffering,
                SuggestedAmountForService = t.SuggestedAmountForService,
                Priest = t.Priest,
                PerformedForFirstName = t.PerformedForFirstName,
                ServiceType = t.ServiceType,
                PerformedForLastName = t.PerformedForLastName
            }).ToList());
        }

    }
}
