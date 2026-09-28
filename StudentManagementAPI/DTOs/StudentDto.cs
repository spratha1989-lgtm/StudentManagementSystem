using System.ComponentModel.DataAnnotations;

namespace StudentManagementAPI.DTOs
{
    public class StudentDto
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Course { get; set; } = string.Empty;

        [Range(18, 60)]
        public int Age { get; set; }
    }
}