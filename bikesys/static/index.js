let doc = document;
let body = document.getElementsByTagName('body')[0];
let currentUser;

function mgt(operation){
    axios.post(`/api/mgt/`, {
        "operation":JSON.stringify(operation),
        "uid":JSON.stringify(currentUser[0])
    })
        .then((response) => {
            if (response.data.error == "error") {
                console.log('Error: Server')
            } else {
                let rst = response.data.result;
                displayNotification(rst);
            }
        }, function (err) {
            console.log("Error: Client", err);
    })
}

function oper(operation){
    let bikeid = doc.getElementById("bikeid4").value;
    axios.post(`/api/oper/`, {
        "bikeid": JSON.stringify(bikeid),
        "operation":JSON.stringify(operation),
        "uid":JSON.stringify(currentUser[0])
    })
        .then((response) => {
            if (response.data.error == "error") {
                console.log('Error: Server')
            } else {
                let rst = response.data.result;
                displayNotification(rst);
            }
        }, function (err) {
            console.log("Error: Client", err);
    })
}

function cust(operation){
    let bikeid1 = doc.getElementById("bikeid1").value;
    let bikeid2 = doc.getElementById("bikeid2").value;
    let bikeid3 = doc.getElementById("bikeid3").value;
    let loc = doc.getElementById("loc").value || 0;
    let bikeid;
    if(operation=="rent"){
        bikeid = bikeid1
    }else if(operation=="back"){
        bikeid = bikeid2
    }else if(operation=="report"){
        bikeid = bikeid3
    }
    axios.post(`/api/cust/`, {
        "bikeid": JSON.stringify(bikeid),
        "loc":JSON.stringify(loc),
        "operation":JSON.stringify(operation),
        "uid":JSON.stringify(currentUser[0])
    })
        .then((response) => {
            if (response.data.error == "error") {
                console.log('Error: Server')
            } else {
                let rst = response.data.result;
                displayNotification(rst);
            }
        }, function (err) {
            console.log("Error: Client", err);
    })
}

function verify(operation) {
    let name = doc.getElementById("username").value;
    let pwd = doc.getElementById("pwd").value;
    let cls;
    let clsArr = doc.getElementsByName("cls");
    for(let i of clsArr){
        if(i.checked==true){
            cls = i.value;
        }
    }
    axios.post(`/api/verify/`, {
        "name": JSON.stringify(name),
        "pwd": JSON.stringify(pwd),
        "cls": JSON.stringify(cls),
        'operation':JSON.stringify(operation)
    })
        .then((response) => {
            if (response.data.error == "error") {
                console.log('Error: Server')
                let rst = "Error: no this login account or existed register username";
                displayNotification(rst);
            } else {
                currentUser = response.data.result;
                role = currentUser[1];
                switch(role){
                    case "customer":{
                        changeDisplay(["customerNode"],["verifyNode","operatorNode","managerNode"]);
                        break;
                    }
                    case "operator":{
                        changeDisplay(["operatorNode"],["verifyNode","customerNode","managerNode"]);
                        break;
                    }
                    case "manager":{
                        changeDisplay(["managerNode"],["verifyNode","customerNode","operatorNode"]);
                        break;
                    }
                }
            }
        }, function (err) {
            console.log("Error: Client", err);
        })
}

function changeDisplay(seeIdArr,notseeIdArr){
    for(let i of seeIdArr){
        let node1 = doc.getElementById(i);
        node1.className = "canSee";
    }
    for(let i of notseeIdArr){
        let node2 = doc.getElementById(i);
        node2.className = "notSee";
        body.removeChild(node2);
    }

}

function displayNotification(rst){
    let notify = doc.getElementById("notification");
    if(typeof(rst) == "string"){
        notify.innerText = rst;
    }else{
        if(doc.getElementById("ul001")!=null){
            notify.removeChild(doc.getElementById("ul001"));
        }
        let ulNode = doc.createElement("ul");
        ulNode.id = "ul001";
        notify.appendChild(ulNode);
        for(let i in rst){
            let liNode = doc.createElement("li");
            liNode.innerText = i+": "+rst[i];
            ulNode.appendChild(liNode);
        }
    }
    
}