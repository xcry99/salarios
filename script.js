// document.addEventListener('DOMContentLoaded', function () {
//     const searchInput = document.getElementById('searchInput');
//     const resultsList = document.getElementById('results');
//     const employeeDetails = document.getElementById('employeeDetails');
  
//     // Función para mostrar resultados
//     function showResults(results) {
//       resultsList.innerHTML = '';
//       results.forEach(result => {
//         const li = document.createElement('li');
//         li.textContent = result.nombre;
//         li.addEventListener('click', function () {
//           showEmployeeDetails(result);
//         });
//         resultsList.appendChild(li);
//       });
//     }
  
//     // Función para mostrar detalles del empleado
//     function showEmployeeDetails(employee) {
//       employeeDetails.innerHTML = `
//         <h2>${employee.nombre}</h2>
//         <p>Salario Total: ${employee["Sueldo Total"]}</p>
//         <p>Total a Transferir: ${employee["A transferir"]}</p>
//         <p>Descuentos: ${employee["DSCTO"]}</p>
//         <p>Adelantos: ${employee["ANTICIPO"]}</p>
//       `;
//     }
  
//     // Función para cargar datos desde el archivo CSV
//     function loadDataFromCSV() {
//         fetch('https://cdn.jsdelivr.net/gh/xcry99/salarios@main/data.csv')
//           .then(response => {
//             if (!response.ok) {
//               throw new Error('Error al cargar el archivo CSV');
//             }
//             return response.text(); // Extraer el texto de la respuesta
//           })
//           .then(data => {
//             const rows = data.trim().split('\n').slice(1); // Ignorar encabezado
//             const employees = rows.map(row => {
//               const [nombre, turno, atc, pickup, atcPickup, comision, dias, jornal, sueldoBase, anticipo, descuentos, iva, sueldoTotal, aTransferir, diferencia] = row.split(';');
//               return { nombre, turno, atc, pickup, atcPickup, comision, dias, jornal, sueldoBase, anticipo, descuentos, iva, "Sueldo Total": sueldoTotal, "A transferir": aTransferir, diferencia };
//             });
//             filterResults(employees, ''); // Llama a filterResults con los empleados cargados y una cadena vacía como consulta inicial
//           })
//           .catch(error => console.error('Error al cargar datos:', error));
//       }
  
// // Función para filtrar resultados
// function filterResults(employees, query) {
//     const filteredResults = employees.filter(employee => employee.nombre.toLowerCase().includes(query.toLowerCase()));
//     showResults(filteredResults);
//   }
  
  
// // Evento de entrada en el campo de búsqueda
// searchInput.addEventListener('input', function () {
//     const query = searchInput.value.trim();
//     filterResults(employees, query);
//   });
  
  
//     // Cargar datos al cargar la página
//     loadDataFromCSV();
//   });
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const resultsList = document.getElementById('results');
    const employeeDetails = document.getElementById('employeeDetails');
    let employees = []; // Variable para almacenar los datos de los empleados

    // Función para mostrar resultados
    function showResults(results) {
        resultsList.innerHTML = '';
        results.forEach(result => {
            const li = document.createElement('li');
            li.textContent = result.nombre;
            li.addEventListener('click', function () {
                showEmployeeDetails(result);
            });
            resultsList.appendChild(li);
        });
    }

    // Función para mostrar detalles del empleado
    function showEmployeeDetails(employee) {
        employeeDetails.innerHTML = `
        <h2>${employee.nombre}</h2>
        <p>Salario Total: ${employee["Sueldo Total"]}</p>
        <p>Total a Transferir: ${employee["A transferir"]}</p>
        <p>Descuentos: ${employee.descuentos}</p>
        <p>Adelantos: ${employee.adelantos}</p>
        <p>Comisión: ${employee.comision}</p>
      `;
    }

    // Función para cargar datos desde el archivo CSV
    function loadDataFromCSV() {
        fetch('https://cdn.jsdelivr.net/gh/xcry99/salarios@main/data.csv')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar el archivo CSV');
                }
                return response.text(); // Extraer el texto de la respuesta
            })
            .then(data => {
                const rows = data.trim().split('\n').slice(1); // Ignorar encabezado
                employees = rows.map(row => {
                    const [nombre, turno, atc, pickup, atcPickup, comision, dias, jornal, sueldoBase, adelantos, descuentos, iva, sueldoTotal, aTransferir, diferencia] = row.split(';');
                    return { nombre, turno, atc, pickup, atcPickup, comision, dias, jornal, sueldoBase, adelantos, descuentos, iva, "Sueldo Total": sueldoTotal, "A transferir": aTransferir, diferencia };
                });
                filterResults(employees, ''); // Llama a filterResults con los empleados cargados y una cadena vacía como consulta inicial
            })
            .catch(error => console.error('Error al cargar datos:', error));
    }

    // Función para filtrar resultados
    function filterResults(employees, query) {
        const filteredResults = employees.filter(employee => employee.nombre.toLowerCase().includes(query.toLowerCase()));
        showResults(filteredResults);
    }

    // Evento de entrada en el campo de búsqueda
    searchInput.addEventListener('input', function () {
        const query = searchInput.value.trim();
        filterResults(employees, query);
    });

    // Cargar datos al cargar la página
    loadDataFromCSV();
});
