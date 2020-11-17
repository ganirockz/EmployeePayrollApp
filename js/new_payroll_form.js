class EmployeePayrollData{
    name;
    salary;
    profilePic;
    startDate;
    gender;
    department;
    constructor(name,salary,profilePic,startDate,gender,department){
        this.name = name;
        this.salary = salary;
        this.profilePic = profilePic;
        this.startDate = startDate;
        this.gender = gender;
        this.department = department;
    }

    setName(name){
        this.name = name;
    }

    setSalary(salary){
        this.salary = salary;
    }
    setStartDate(startDate){
        this.startDate = startDate;
    }

    toString(){
        return "name="+this.name+", salary="+this.salary+", profile pic"+this.profilePic+", gender="+this.gender+", department="+this.department;
    }
}
function save(){
    let name = document.getElementById("name").value;
    let salary = document.getElementById("salary").value;
    let profilePic = document.getElementsByClassName("profile-radio-content").value;
    let gender = document.getElementById("gender");
    let department = document.getElementById("engineer").value;
    let startDay = document.getElementById("day").value;
    let startMonth = document.getElementById("month");
    let startYear = document.getElementById("year");
    let startDate = startDay+" / "+ startMonth+" / "+startYear;
    employeePayrollData = new EmployeePayrollData(name,salary,profilePic,startDate,gender,department);
    console.log(employeePayrollData);
}
const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
salary.addEventListener('input',function(){
    output.textContent = salary.value;
});

