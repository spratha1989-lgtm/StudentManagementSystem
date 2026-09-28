using StudentManagementAPI.DTOs;
using StudentManagementAPI.Models;

namespace StudentManagementAPI.Services
{
    public interface IStudentService
    {
        Task<List<StudentDto>> GetAllStudents();

        Task<StudentDto?> GetStudentById(int id);

        Task<Student> CreateStudent(StudentDto studentDto);

        Task<bool> UpdateStudent(int id, StudentDto studentDto);

        Task<bool> DeleteStudent(int id);
    }
}