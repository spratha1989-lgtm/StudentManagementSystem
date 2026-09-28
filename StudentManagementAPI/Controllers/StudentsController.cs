using Microsoft.AspNetCore.Mvc;
using StudentManagementAPI.Services;
using StudentManagementAPI.DTOs;

namespace StudentManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly IStudentService _studentService;

        // Constructor - Dependency Injection
        public StudentsController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        // ==========================================
        // GET: api/Students
        // Get all students
        // ==========================================
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentDto>>> GetStudents()
        {
            return await _studentService.GetAllStudents();
        }

        // ==========================================
        // GET: api/Students/1
        // Get student by ID
        // ==========================================
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentDto>> GetStudent(int id)
        {
            var student = await _studentService.GetStudentById(id);

            if (student == null)
            {
                return NotFound();
            }

            return student;
        }

        // ==========================================
        // POST: api/Students
        // Create a new student
        // ==========================================
        [HttpPost]
        public async Task<ActionResult<StudentDto>> CreateStudent(
            StudentDto studentDto)
        {
            var createdStudent =
                await _studentService.CreateStudent(studentDto);

            return CreatedAtAction(
                nameof(GetStudent),
                new { id = createdStudent.Id },
                createdStudent
            );
        }

        // ==========================================
        // PUT: api/Students/1
        // Update an existing student
        // ==========================================
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(
            int id,
            StudentDto studentDto)
        {
            if (id != studentDto.Id)
            {
                return BadRequest();
            }

            var updated =
                await _studentService.UpdateStudent(id, studentDto);

            if (!updated)
            {
                return NotFound();
            }

            return NoContent();
        }

        // ==========================================
        // DELETE: api/Students/1
        // Delete a student
        // ==========================================
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var deleted =
                await _studentService.DeleteStudent(id);

            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }

        // ==========================================
        // TEST: Global Exception Handling
        // ==========================================
        [HttpGet("test-error")]
        public IActionResult TestError()
        {
            throw new Exception("This is a test exception.");
        }
    }
}