using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Words_Walking.Models;
using Words_Walking.Repositories;
using System;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Words_Walking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        
        public BookController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }
        // GET: api/<ValuesController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_bookRepository.GetAllBooks());
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var book = _bookRepository.GetById(id);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        // POST api/<ValuesController>
        [HttpPost]
        public IActionResult Post(Book book)
        {
            _bookRepository.AddBook(book);
            return CreatedAtAction("Get", new { id = book.Id }, book);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Book book)
        {
            if (id != book.Id)
            {
                return BadRequest();
            }

            _bookRepository.EditBook(book);
                return NoContent();
        }

        [HttpPatchAttribute("{id}")]
        public IActionResult Patch(int id, int userId)
        {
           
            _bookRepository.SellBook(id, userId);
            return NoContent();
        }





        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _bookRepository.DeleteBook(id);
            return NoContent();
        }
    }
}
