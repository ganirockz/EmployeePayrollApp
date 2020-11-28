let empPayrollList;

window.addEventListener('DOMContentLoaded',(event)=>{
    if(site_properties.use_local_storage.match("true")){
    getEmployeePayrllDataFromStorage();
    }else getEmployeePayrollDataFromServer();
});

const getEmployeePayrllDataFromStorage = () => {
    empPayrollList = localStorage.getItem('EmployeePayrollList')? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
    processEmployeePayrollDataResponse();
}

const processEmployeePayrollDataResponse = () =>{
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');    
}

const getEmployeePayrollDataFromServer = () => {
    makeServiceCall("GET", site_properties.server_url, true)
        .then(responseText =>{
            empPayrollList = JSON.parse(responseText);
            processEmployeePayrollDataResponse();
        })
        .catch(error => {
            console.log("GET Error Status: "+JSON.stringify(error));
            empPayrollList = [];
            processEmployeePayrollDataResponse();
        });
}

const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                        "<th>Salary</th><th>Start Date</th><th>Action</th>";
    if(empPayrollList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for(const empPayrollData of empPayrollList){
     innerHtml = `${innerHtml}
    <tr>
    <td><img class="profile" src="${empPayrollData._profilePic}" alt=""></td>
    <td>${empPayrollData._name}</td>
    <td>${empPayrollData._gender}</td>
    <td>${getDeptHtml(empPayrollData._department)}</td>

    <td>${empPayrollData._salary}</td>
    <td>${StringifyDate(empPayrollData._startDate)}</td>
    <td>
        <img id="${empPayrollData.id}" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete">
        <img id="${empPayrollData.id}" onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="edit">
    </td>
    </tr>
    `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for(const dept of deptList){
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`;
    }
    return deptHtml;
}

const remove = (node) =>{
    let employeePayrollData = empPayrollList.find(empData => empData.id == node.id);
    if(!employeePayrollData) return;
    const index = empPayrollList.map(empData => empData.id)
                                .indexOf(employeePayrollData.id);
    empPayrollList.splice(index,1);
    if(site_properties.use_local_storage.match("true")){
    localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    } else{
        const deleteURL = site_properties.server_url + employeePayrollData.id.toString();
        makeServiceCall("DELETE", deleteURL,false)
            .then(responseText => {
                createInnerHtml();
            })
            .catch(error =>{
                console.log("DELETE Error Status: "+JSON.stringify(error));
            });
    }
}

const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
            _name: 'Narayan Mahadevan',
            _gender: 'male',
            _department:[
                'Engineering',
                'Finance'
            ],
            _salary: '500000',
            _startDate: '29 Oct 2019',
            _note: '',
            id: new Date().getTime(),
            _profilePic: '../assets/profile-images/Ellipse -2.png'
        },
        {
            _name: 'Amarpa Shashanka Keerthi Kumar',
            _gender: 'female',
            _department:[
                'Sales'
            ],
            _salary: '400000',
            _startDate: '29 Oct 2019',
            _note: '',
            id: new Date().getTime()+1,
            _profilePic: '../assets/profile-images/Ellipse -1.png'    
        }
    ];
    return empPayrollListLocal;
}

const update = (node) => {
    let employee = empPayrollList.find((emp) => emp.id == node.id);
    if(!employee) return;
    localStorage.setItem("editEmp",JSON.stringify(employee));
    window.location.replace(site_properties.add_emp_payroll_page);
}

