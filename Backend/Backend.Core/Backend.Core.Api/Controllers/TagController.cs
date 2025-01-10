using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Backend.Core.Models;
using Backend.Core.Dbaccess;

namespace Backend.Core.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagsController : ODataController
    {
        private readonly ITagRepository _tagRepository;

        public TagsController(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        [HttpGet]
        [EnableQuery(MaxTop = 50, PageSize = 30)]
        public IActionResult GetTags()
        {
            var tags = _tagRepository.GetAll();
            return Ok(tags);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tag>> GetTag(int id)
        {
            var tag = await _tagRepository.GetByIdAsync(id);
            if (tag == null)
                return NotFound();

            return tag;
        }

        [HttpPost]
        public async Task<ActionResult<Tag>> PostTag(Tag tag)
        {
            await _tagRepository.AddAsync(tag);
            await _tagRepository.SaveAsync();

            return CreatedAtAction(nameof(GetTag), new { id = tag.Id }, tag);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTag(int id, Tag tag)
        {
            if (id != tag.Id)
                return BadRequest("Tag ID from path and body do not match.");

            _tagRepository.Update(tag);

            try
            {
                await _tagRepository.SaveAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await TagExistsAsync(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTag(int id)
        {
            var tag = await _tagRepository.GetByIdAsync(id);
            if (tag == null)
                return NotFound();

            _tagRepository.Delete(tag);
            await _tagRepository.SaveAsync();

            return NoContent();
        }

        private async Task<bool> TagExistsAsync(int id)
        {
            var found = await _tagRepository.GetByIdAsync(id);
            return found != null;
        }
    }
}
