package com.example.project.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.project.Repository.EmployeeRepository;
import com.example.project.entity.Employee;

@Service
public class EmployeeService {

    private final EmployeeRepository repo;

    public EmployeeService(EmployeeRepository repo) {
        this.repo = repo;
    }

    public Employee addEmployee(Employee emp) {
        return repo.save(emp);
    }

    public List<Employee> getAllEmployees() {
        return repo.findAll();
    }

    public Employee updateEmployee(int id, Employee emp) {
        Employee existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        existing.setName(emp.getName());
        existing.setDepartment(emp.getDepartment());
        existing.setSalary(emp.getSalary());

        return repo.save(existing);
    }

    public void deleteEmployee(int id) {
        repo.deleteById(id);
    }
}
