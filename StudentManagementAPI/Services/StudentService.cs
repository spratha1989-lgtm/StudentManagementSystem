using Microsoft.EntityFrameworkCore;
using StudentManagementAPI.Data;
using StudentManagementAPI.Models;
using StudentManagementAPI.DTOs;

namespace StudentManagementAPI.Services
{
    public class StudentService : IStudentService
    {
        private readonly ApplicationDbContext _context;

        public StudentService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Get all students
       public async Task<List<StudentDto>> GetAllStudents()
{
    return await _context.Students
        .Select(student => new StudentDto
        {
            Id = student.Id,
            Name = student.Name,
            Email = student.Email,
            Course = student.Course,
            Age = student.Age
        })
        .ToListAsync();
}

        // Get student by ID
      public async Task<StudentDto?> GetStudentById(int id)
{
    var student = await _context.Students.FindAsync(id);

    if (student == null)
    {
        return null;
    }

    return new StudentDto
    {
        Id = student.Id,
        Name = student.Name,
        Email = student.Email,
        Course = student.Course,
        Age = student.Age
    };
}

        // Create student
      public async Task<Student> CreateStudent(StudentDto studentDto)
{
    var student = new Student
    {
        Name = studentDto.Name,
        Email = studentDto.Email,
        Course = studentDto.Course,
        Age = studentDto.Age
    };

    _context.Students.Add(student);

    await _context.SaveChangesAsync();

    return student;
}

        // Update student
      public async Task<bool> UpdateStudent(int id, StudentDto studentDto)
{
    var existingStudent = await _context.Students.FindAsync(id);

    if (existingStudent == null)
    {
        return false;
    }

    existingStudent.Name = studentDto.Name;
    existingStudent.Email = studentDto.Email;
    existingStudent.Course = studentDto.Course;
    existingStudent.Age = studentDto.Age;

    await _context.SaveChangesAsync();

    return true;
}
        // Delete student
        public async Task<bool> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
            {
                return false;
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}