// remove whitespace only text nodes
let body = document.getElementsByTagName("body")[0];
body.childNodes.forEach(function(node) {
	node.childNodes.forEach(function(childNode){
		if (childNode.nodeName === '#text') { node.removeChild(childNode) }
	});
});

const button = document.getElementById("button");
const reset = document.getElementById("reset")
const oops = document.getElementById("oops")
const text = document.getElementById("number");
const max = document.getElementById("maximum");
const reserve = document.getElementById("reserve")
const picked = document.getElementById("picked");
const pickedList = document.getElementById("pickedList");

let list = [];

button.addEventListener('click', randomNumber);
reset.addEventListener('click', resetApp);
oops.addEventListener('click', backButton);
reserve.addEventListener('keyup', checkInput);
max.addEventListener('keyup', checkInput);
max.addEventListener('change', checkInput);

function checkInput() {
	reserve.setCustomValidity("");
	if (!reserve.checkValidity() || !max.checkValidity()) { 
		button.disabled = true;
		reserve.reportValidity();
		max.reportValidity();
	}
	else { 
  	let sorted = reserve.value.split(",").sort(function(a,b) { 
  		if (parseInt(a) < parseInt(b)) { return -1; } 
  		if (parseInt(a) > parseInt(b)) { return 1; } 
  		return 0; 
  	});
  	if (sorted[sorted.length - 1] > max.value) { 
  		button.disabled = true;
  		reserve.setCustomValidity("Numbers must be less than Maximum Number");
  		reserve.reportValidity();
  	}
  	else { 
  		button.disabled = false; 
  	}
	}
}

function randomNumber() {
	if (list.length === 0 && reserve.value != "") {
		reserve.value.split(",").forEach(function(number) { list.push(parseInt(number)) });
	}
  picked.classList.remove('hidden');
  reserve.readOnly = true;
  let number = Math.floor(Math.random() * max.value + 1);
  if (list.includes(number)) { randomNumber() }
  else {
    list.push(number);
    pickedList.innerHTML = list;
    text.innerHTML = number;
    if (list.length >= max.value) { button.disabled = true; }
  }
}

function backButton() {
	let choice = confirmation();
	if (!choice) { return false }
	list.pop();
	pickedList.innerHTML = list;
  checkInput();
}

function resetApp() {
	let choice = confirmation();
	if (!choice) { return false }
  list = [];
  picked.classList.add('hidden');
  button.disabled = false;
  text.innerHTML = "0";
  reserve.value = "";
  reserve.readOnly = false;
}

function confirmation() {
	let choice = confirm("Are You Sure?");
	return choice;
}