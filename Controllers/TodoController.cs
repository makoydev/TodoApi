   using System.Collections.Generic;
   using System.Linq;
   using Microsoft.AspNetCore.Mvc;
   using TodoApi.Models;
   using Microsoft.EntityFrameworkCore;


   namespace TodoApi.Controllers
   {
       [Route("api/todos")]
[ApiController]
       public class TodoController : ControllerBase
       {
           private readonly TodoContext _context;

           public TodoController(TodoContext context)
           {
               _context = context;
           }

           // GET: api/Todo
           [HttpGet]
           public ActionResult<IEnumerable<TodoItem>> GetTodoItems()
           {
               return _context.TodoItems.ToList();
           }

           // GET: api/Todo/5
           [HttpGet("{id}")]
           public ActionResult<TodoItem> GetTodoItem(long id)
           {
               var todoItem = _context.TodoItems.Find(id);

               if (todoItem == null)
               {
                   return NotFound();
               }

               return todoItem;
           }

           // POST: api/Todo
           [HttpPost]
           public ActionResult<TodoItem> PostTodoItem(TodoItem item)
           {
               _context.TodoItems.Add(item);
               _context.SaveChanges();

               return CreatedAtAction(nameof(GetTodoItem), new { id = item.Id }, item);
           }

           // PUT: api/Todo/5
           [HttpPut("{id}")]
           public IActionResult PutTodoItem(long id, TodoItem item)
           {
               if (id != item.Id)
               {
                   return BadRequest();
               }

               _context.Entry(item).State = EntityState.Modified;
               _context.SaveChanges();

               return NoContent();
           }

           // DELETE: api/Todo/5
           [HttpDelete("{id}")]
           public IActionResult DeleteTodoItem(long id)
           {
               var todoItem = _context.TodoItems.Find(id);

               if (todoItem == null)
               {
                   return NotFound();
               }

               _context.TodoItems.Remove(todoItem);
               _context.SaveChanges();

               return NoContent();
           }
       }
   }
