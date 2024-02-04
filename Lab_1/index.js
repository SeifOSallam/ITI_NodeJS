const fs = require('fs');
const FileName = "TodoList.json"

var todo = {
    id: 0,
    title: "",
    status: "to-do"
}
const commands = {
    add : "add",
    edit : "edit",
    delete : "delete",
    list : "list"
}

if (!fs.existsSync(FileName)) {
    fs.writeFileSync(FileName, "[]")
}
var consoleArgs = process.argv.slice(2);


const command = consoleArgs[0];
const arguments = consoleArgs.slice(1);



if (command == "add") {
    addTodo(arguments[0])
}
else if (command == "list") {
    listTodo(arguments)
}
else if (command == "edit") {
    editTodo(arguments)
}
else if (command == "delete") {
    deleteTodo(arguments[0])
}

function getLastID(objects) {
    if (objects.length == 0)
        return 0
    return objects[objects.length-1].id + 1
}

function fixTodos(originalTodo, newTodo) {
    if (newTodo.title == "") {
        newTodo.title = originalTodo.title
    }
    if (newTodo.status == "") {
        newTodo.status = originalTodo.status
    }
}

function parseOptions(argumentsArray) {
    let optionsObject = {
        id: null,
        title: "",
        status: ""
    }
    for ( let i = 0; i < argumentsArray.length; i+=2 ) {
        let option = argumentsArray[i];
        if (option[0] == "-") {
            option = option.substring(1);
        }
        let value = argumentsArray[i+1]
        if (option == "s" || option == "-status") {
            
            if (value === "to-do" || value === "in-progress" || value === "done") {
                optionsObject.status = value;
            }
            else {
                console.log("Invalid status")
            }
        }
        else if (option == "t" || option == "-title") {
            optionsObject.title = value;
        }
        else if (option == "id") {
            optionsObject.id = parseInt(value);
        }
    }
    if (optionsObject.id == null) {
        throw new Error("No ID specified");
    }
    return optionsObject;
}

function addTodo(argument) {
    
    todo.title = argument
    fs.readFile(FileName, 'utf8', function readFileCallback(err, data){
        if (err){
            console.error(err);
        }
        else {
            objects = JSON.parse(data);
            todo.id = getLastID(objects);
            objects.push(todo);
            json = JSON.stringify(objects);
            fs.writeFile(FileName, json, (err) => {});
    }});
}

function listTodo(argumentsArray) {
    fs.readFile(FileName, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        }
        else {
            let objects = JSON.parse(data);
            if (argumentsArray.length == 0) {
                objects.forEach((todoObj) => {
                    console.log(`ID: ${todoObj.id}   Title: ${todoObj.title}    Status: ${todoObj.status}`)
                })
            }
            else if (argumentsArray.length == 2) {
                let option = argumentsArray[0]
                let optionValue = argumentsArray[1]
                if (option == "-s" || option == "--status") {
                    objects.forEach((todoObj) => {
                        if (todoObj.status == optionValue) {
                            console.log(`ID: ${todoObj.id}   Title: ${todoObj.title}    Status: ${todoObj.status}`)
                        }
                    })
                }
                else {
                    console.log("This option doesn't exist")
                    return
                }
            }
            else {
                console.log("Invalid arguments")
            }
    }});
}

function editTodo(arguments) {
    let newTodo;
    try {
        newTodo = parseOptions(arguments)
    }
    catch(err) {
        console.log("ID is not specified")
        return;
    }
    
    fs.readFile(FileName, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } 
        else {
            objects = JSON.parse(data);
            if (newTodo.id >= getLastID(objects) || newTodo.id < 0) {
                console.log("Todo doesn't exist!")
                return
            }
            let resTodo = objects.filter((todo) => todo.id == newTodo.id)[0]
            fixTodos(resTodo , newTodo)
            let newList = objects.map(todo => todo.id == newTodo.id? newTodo : todo)
            json = JSON.stringify(newList);
            fs.writeFile(FileName, json, (err) => {});
    }});
}

function deleteTodo(argument) {
    let todoID = parseInt(argument);
    if (isNaN(todoID)) {
        console.log("Please enter a number")
        return
    }
    fs.readFile(FileName, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } 
        else {
            objects = JSON.parse(data);
            let toBeDeleted = objects.find((todo) => todo.id == argument)
            if (toBeDeleted !== undefined) {
                let newList = objects.filter((todo) => todo.id != toBeDeleted.id)
                json = JSON.stringify(newList);
                fs.writeFile(FileName, json, (err) => {});
            }
            else {
                console.log("Todo not found")
                return
            }
    }});
}
