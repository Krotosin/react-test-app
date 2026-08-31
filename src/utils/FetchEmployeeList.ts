export default async function fetchEmployeeList() {
    const apiResponse = await fetch('https://jsonplaceholder.typicode.com/users');
    const apiData = await apiResponse.json();
    const employeeList = apiData.map((apiData: { id: number; name: string; email: string; }) => ({
        id: apiData.id, 
        name: apiData.name, 
        email: apiData.email}))
    console.log("Fetch is working:", employeeList);
    return employeeList;
};