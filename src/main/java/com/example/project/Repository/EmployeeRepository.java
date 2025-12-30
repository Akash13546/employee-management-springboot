package com.example.project.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.example.project.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}
