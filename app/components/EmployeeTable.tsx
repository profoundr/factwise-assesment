"use client";

import  { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import type { CustomCellRendererProps } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

// Row Data Interface
interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
  age: number;
  location: string;
  performanceRating: number;
  projectsCompleted: number;
  isActive: boolean;
  skills: string[];
  manager: string | null;
}

const ActiveCellRenderer = (params: CustomCellRendererProps) => (
  <span className="flex items-center justify-center h-full w-full">
    <img
      alt={String(params.value)}
      src={`https://www.ag-grid.com/example-assets/icons/${
        params.value ? "tick-in-circle" : "cross-in-circle"
      }.png`}
      className="block"
    />
  </span>
);

const PerformanceCellRenderer = (params: CustomCellRendererProps) => {
  const valueNum = typeof params.value === "number" ? params.value : 0;
  const clamped = Math.max(0, Math.min(5, valueNum));
  const percentage = clamped / 5; // 0–1
  const strokeColor =
    clamped < 2 ? "#ef4444" : clamped < 3.5 ? "#f97316" : "#22c55e";
  const size = 32;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percentage);

  return (
    <div className="flex items-center justify-center h-full w-full">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fontSize="10"
          fill="#111827"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          {clamped.toFixed(1)}
        </text>
      </svg>
    </div>
  );
};

// Employee data
const EMPLOYEE_DATA: Employee[] = [
    {
      id: 1,
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@company.com",
      department: "Engineering",
      position: "Senior Developer",
      salary: 95000,
      hireDate: "2021-03-15",
      age: 32,
      location: "New York",
      performanceRating: 4.2,
      projectsCompleted: 12,
      isActive: true,
      skills: ["JavaScript", "React", "Node.js"],
      manager: "Sarah Johnson",
    },
    {
      id: 2,
      firstName: "Emily",
      lastName: "Davis",
      email: "emily.davis@company.com",
      department: "Marketing",
      position: "Marketing Manager",
      salary: 78000,
      hireDate: "2020-07-22",
      age: 29,
      location: "Los Angeles",
      performanceRating: 4.5,
      projectsCompleted: 8,
      isActive: true,
      skills: ["Digital Marketing", "SEO", "Analytics"],
      manager: "Michael Brown",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Brown",
      email: "michael.brown@company.com",
      department: "Marketing",
      position: "VP Marketing",
      salary: 125000,
      hireDate: "2019-01-10",
      age: 38,
      location: "Los Angeles",
      performanceRating: 4.7,
      projectsCompleted: 15,
      isActive: true,
      skills: ["Strategy", "Leadership", "Brand Management"],
      manager: null,
    },
    {
      id: 4,
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@company.com",
      department: "Engineering",
      position: "Engineering Manager",
      salary: 115000,
      hireDate: "2018-11-05",
      age: 35,
      location: "New York",
      performanceRating: 4.6,
      projectsCompleted: 18,
      isActive: true,
      skills: ["Team Leadership", "Architecture", "Python"],
      manager: "David Wilson",
    },
    {
      id: 5,
      firstName: "David",
      lastName: "Wilson",
      email: "david.wilson@company.com",
      department: "Engineering",
      position: "CTO",
      salary: 180000,
      hireDate: "2017-05-12",
      age: 42,
      location: "New York",
      performanceRating: 4.8,
      projectsCompleted: 25,
      isActive: true,
      skills: ["Technical Strategy", "Leadership", "Cloud Architecture"],
      manager: null,
    },
    {
      id: 6,
      firstName: "Lisa",
      lastName: "Garcia",
      email: "lisa.garcia@company.com",
      department: "Sales",
      position: "Sales Representative",
      salary: 65000,
      hireDate: "2022-02-28",
      age: 26,
      location: "Chicago",
      performanceRating: 3.9,
      projectsCompleted: 6,
      isActive: true,
      skills: ["CRM", "Negotiation", "Customer Relations"],
      manager: "Robert Martinez",
    },
    {
      id: 7,
      firstName: "Robert",
      lastName: "Martinez",
      email: "robert.martinez@company.com",
      department: "Sales",
      position: "Sales Manager",
      salary: 92000,
      hireDate: "2020-09-14",
      age: 34,
      location: "Chicago",
      performanceRating: 4.3,
      projectsCompleted: 11,
      isActive: true,
      skills: ["Sales Strategy", "Team Management", "B2B Sales"],
      manager: "Jennifer Lee",
    },
    {
      id: 8,
      firstName: "Jennifer",
      lastName: "Lee",
      email: "jennifer.lee@company.com",
      department: "Sales",
      position: "VP Sales",
      salary: 135000,
      hireDate: "2019-06-18",
      age: 40,
      location: "Chicago",
      performanceRating: 4.6,
      projectsCompleted: 16,
      isActive: true,
      skills: ["Strategic Sales", "Leadership", "Market Analysis"],
      manager: null,
    },
    {
      id: 9,
      firstName: "James",
      lastName: "Anderson",
      email: "james.anderson@company.com",
      department: "HR",
      position: "HR Specialist",
      salary: 58000,
      hireDate: "2021-08-30",
      age: 28,
      location: "Austin",
      performanceRating: 4.0,
      projectsCompleted: 7,
      isActive: true,
      skills: ["Recruitment", "Employee Relations", "HRIS"],
      manager: "Karen White",
    },
    {
      id: 10,
      firstName: "Karen",
      lastName: "White",
      email: "karen.white@company.com",
      department: "HR",
      position: "HR Manager",
      salary: 85000,
      hireDate: "2019-12-02",
      age: 36,
      location: "Austin",
      performanceRating: 4.4,
      projectsCompleted: 13,
      isActive: true,
      skills: ["HR Strategy", "Policy Development", "Leadership"],
      manager: null,
    },
    {
      id: 11,
      firstName: "Alex",
      lastName: "Thompson",
      email: "alex.thompson@company.com",
      department: "Engineering",
      position: "Junior Developer",
      salary: 72000,
      hireDate: "2023-01-16",
      age: 24,
      location: "New York",
      performanceRating: 3.8,
      projectsCompleted: 4,
      isActive: true,
      skills: ["Java", "Spring Boot", "MySQL"],
      manager: "Sarah Johnson",
    },
    {
      id: 12,
      firstName: "Maria",
      lastName: "Rodriguez",
      email: "maria.rodriguez@company.com",
      department: "Finance",
      position: "Financial Analyst",
      salary: 68000,
      hireDate: "2021-11-08",
      age: 30,
      location: "Miami",
      performanceRating: 4.1,
      projectsCompleted: 9,
      isActive: true,
      skills: ["Financial Modeling", "Excel", "SAP"],
      manager: "Thomas Clark",
    },
    {
      id: 13,
      firstName: "Thomas",
      lastName: "Clark",
      email: "thomas.clark@company.com",
      department: "Finance",
      position: "Finance Manager",
      salary: 98000,
      hireDate: "2018-04-25",
      age: 37,
      location: "Miami",
      performanceRating: 4.5,
      projectsCompleted: 14,
      isActive: true,
      skills: ["Financial Planning", "Budget Management", "Leadership"],
      manager: null,
    },
    {
      id: 14,
      firstName: "Amanda",
      lastName: "Taylor",
      email: "amanda.taylor@company.com",
      department: "Marketing",
      position: "Content Specialist",
      salary: 55000,
      hireDate: "2022-06-12",
      age: 25,
      location: "Los Angeles",
      performanceRating: 3.7,
      projectsCompleted: 5,
      isActive: true,
      skills: ["Content Writing", "Social Media", "Adobe Creative"],
      manager: "Michael Brown",
    },
    {
      id: 15,
      firstName: "Ryan",
      lastName: "Miller",
      email: "ryan.miller@company.com",
      department: "Engineering",
      position: "DevOps Engineer",
      salary: 88000,
      hireDate: "2020-10-19",
      age: 31,
      location: "Seattle",
      performanceRating: 4.3,
      projectsCompleted: 10,
      isActive: true,
      skills: ["AWS", "Docker", "Kubernetes"],
      manager: "Sarah Johnson",
    },
    {
      id: 16,
      firstName: "Jessica",
      lastName: "Moore",
      email: "jessica.moore@company.com",
      department: "Sales",
      position: "Account Executive",
      salary: 75000,
      hireDate: "2021-04-03",
      age: 27,
      location: "Denver",
      performanceRating: 4.0,
      projectsCompleted: 8,
      isActive: false,
      skills: ["Account Management", "Salesforce", "Presentation"],
      manager: "Robert Martinez",
    },
    {
      id: 17,
      firstName: "Daniel",
      lastName: "Harris",
      email: "daniel.harris@company.com",
      department: "Finance",
      position: "Senior Accountant",
      salary: 73000,
      hireDate: "2019-08-14",
      age: 33,
      location: "Miami",
      performanceRating: 4.2,
      projectsCompleted: 12,
      isActive: true,
      skills: ["Accounting", "Tax Preparation", "QuickBooks"],
      manager: "Thomas Clark",
    },
    {
      id: 18,
      firstName: "Nicole",
      lastName: "Jackson",
      email: "nicole.jackson@company.com",
      department: "HR",
      position: "Recruiter",
      salary: 62000,
      hireDate: "2022-09-05",
      age: 29,
      location: "Austin",
      performanceRating: 3.9,
      projectsCompleted: 6,
      isActive: true,
      skills: ["Talent Acquisition", "LinkedIn Recruiter", "Interviewing"],
      manager: "Karen White",
    },
    {
      id: 19,
      firstName: "Kevin",
      lastName: "Wright",
      email: "kevin.wright@company.com",
      department: "Engineering",
      position: "QA Engineer",
      salary: 76000,
      hireDate: "2020-12-07",
      age: 30,
      location: "Seattle",
      performanceRating: 4.1,
      projectsCompleted: 11,
      isActive: true,
      skills: ["Test Automation", "Selenium", "API Testing"],
      manager: "Sarah Johnson",
    },
    {
      id: 20,
      firstName: "Stephanie",
      lastName: "Lopez",
      email: "stephanie.lopez@company.com",
      department: "Marketing",
      position: "Digital Marketing Specialist",
      salary: 64000,
      hireDate: "2021-12-20",
      age: 26,
      location: "Phoenix",
      performanceRating: 3.8,
      projectsCompleted: 7,
      isActive: true,
      skills: ["Google Ads", "Facebook Ads", "Email Marketing"],
      manager: "Michael Brown",
    },
];

export function EmployeeTable() {

  // Filter state
  const [performanceRatingGreaterThan4, setPerformanceRatingGreaterThan4] = useState<boolean>(false);
  const [isActiveFilter, setIsActiveFilter] = useState<string>("all");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // Row Data: The data to be displayed.
  const [rowData] = useState<Employee[]>(EMPLOYEE_DATA);

  // Get all unique skills
  const allSkills = useMemo(() => {
    const skillsSet = new Set<string>();
    EMPLOYEE_DATA.forEach((employee) => {
      employee.skills.forEach((skill) => skillsSet.add(skill));
    });
    return Array.from(skillsSet).sort();
  }, []);

  // Filtered row data
  const filteredRowData = useMemo(() => {
    return rowData.filter((employee) => {
      // Performance rating filter (greater than 4)
      if (performanceRatingGreaterThan4 && employee.performanceRating <= 4) {
        return false;
      }

      // Is active filter
      if (isActiveFilter === "active") {
        if (!employee.isActive) return false;
      } else if (isActiveFilter === "inactive") {
        if (employee.isActive) return false;
      }

      // Skills filter (employee must have at least one selected skill)
      if (selectedSkills.length > 0) {
        const hasSelectedSkill = employee.skills.some((skill) =>
          selectedSkills.includes(skill)
        );
        if (!hasSelectedSkill) return false;
      }

      return true;
    });
  }, [rowData, performanceRatingGreaterThan4, isActiveFilter, selectedSkills]);

  // Handle skill checkbox toggle
  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef<Employee>[]>([
    { field: "id", headerName: "ID", minWidth: 50 },
    { field: "firstName", headerName: "First Name", minWidth: 140,  unSortIcon: true },
    { field: "lastName", headerName: "Last Name", minWidth: 140,  unSortIcon: true },
    { field: "email", headerName: "Email", minWidth: 250, unSortIcon: true },
    { field: "department", headerName: "Department", minWidth: 150, unSortIcon: true },
    { field: "position", headerName: "Position", minWidth: 200, unSortIcon: true },
    {
      field: "salary",
      headerName: "Salary",
      sortable: true,
      unSortIcon: true,
      valueFormatter: (p) =>
        typeof p.value === "number"
          ? p.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : p.value,
        minWidth: 160,
    },
    { field: "hireDate", headerName: "Hire Date", minWidth: 140, unSortIcon: true },
    { field: "age", headerName: "Age", minWidth: 100,  unSortIcon: true },
    { field: "location", headerName: "Location", minWidth: 150, unSortIcon: true },
    {
      field: "performanceRating",
      headerName: "Performance Rating",
      cellRenderer: PerformanceCellRenderer,
      minWidth: 180,
      sortable: true,
      unSortIcon: true,
    },
    {
      field: "projectsCompleted",
      headerName: "Projects Completed",
      minWidth: 180,
      sortable: true,
      unSortIcon: true,
    },
    {
      field: "isActive",
      headerName: "Is Active",
      cellRenderer: ActiveCellRenderer,
      minWidth: 120,
      sortable: true,
      unSortIcon: true,
    },
    { field: "skills", headerName: "Skills", minWidth: 220, unSortIcon: true },
    { field: "manager", headerName: "Manager", minWidth: 160, unSortIcon: true },
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
  };

  // Container: Defines the grid's theme & dimensions.
  return (
    <div className="w-full">
      {/* Filters Section */}
      <div className="p-4 mb-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="mt-0 mb-4 text-base font-semibold text-black">
          Filters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Performance Rating Filter */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={performanceRatingGreaterThan4}
                onChange={(e) => setPerformanceRatingGreaterThan4(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-black">
                Performance Rating &gt; 4
              </span>
            </label>
          </div>

          {/* Is Active Filter */}
          <div>
            <label className="block mb-1 text-xs font-medium text-black">
              Status
            </label>
            <select
              value={isActiveFilter}
              onChange={(e) => setIsActiveFilter(e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm text-black"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Skills Filter */}
          <div>
            <label className="block mb-1 text-xs font-medium text-black">
              Skills
            </label>
            <div className="max-h-32 overflow-y-auto border border-gray-300 rounded p-2 bg-white">
              {allSkills.map((skill) => (
                <label
                  key={skill}
                  className="flex items-center gap-2 py-1 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedSkills.includes(skill)}
                    onChange={() => handleSkillToggle(skill)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-black">{skill}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="w-full h-[550px]">
        <AgGridReact<Employee>
          rowData={filteredRowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination
          paginationPageSize={10}
        />
      </div>
    </div>
  );
}


