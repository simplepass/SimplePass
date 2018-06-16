let SECRET = localStorage["SpartanPass"];
let seed;

function sha256(str) {
	// We transform the string into an arraybuffer.
	var buffer = new TextEncoder("utf-8").encode(str);
	return crypto.subtle.digest("SHA-256", buffer).then(buffer => {
		var hexCodes = [];
		var view = new DataView(buffer);
		for (var i = 0; i < view.byteLength; i += 4) {
			// Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
			var value = view.getUint32(i)
			// toString(16) will give the hex representation of the number without padding
			var stringValue = value.toString(16)
			// We use concatenation and slice for padding
			var padding = '00000000'
			var paddedValue = (padding + stringValue).slice(-padding.length)
			hexCodes.push(paddedValue);
		}

		// Join all the hex strings into one
		return hexCodes.join("");
	});
}

function getRandomNumber() {
	return Math.abs(Math.floor(Math.sin(seed++) * 10000));
}
function getRandomWord() {
	return words[getRandomNumber() % words.length];
}

function getRandomSpecialCharacter() {
	sc = "!@#$%^&*()"
	return sc.charAt(getRandomNumber() % sc.length);
}

function getRandomUppercaseLetter() {
	sc = "ABCDEFGHIJLKMNOPQRSTUVWXYZ"
	return sc.charAt(getRandomNumber() % sc.length);
}

function getCurrentTab() {
	return new Promise(function (resolve, reject) {
		chrome.tabs.getSelected(null, function (tab) {
			let url = new URL(tab.url);
			resolve(url.hostname);
		});
	});
}

function insertRandomly(str1, str2) {
	// + 1 because we don't want it at the start, some sites
	// are weird about passwords not starting with letters
	let position = getRandomNumber() % str1.length + 1;

	return str1.slice(0, position) + str2 + str1.slice(position, str1.length);
}

function generate(url) {
	this.sha256(url + SECRET).then(hash => {hash.slice(0, 10)
		seed = parseInt(hash.slice(0, 8), 16);

		let password = hash.slice(0, 14); 
		password = insertRandomly(password, getRandomUppercaseLetter());

		let simple_password = password;
		password = insertRandomly(password, getRandomSpecialCharacter());

		let passphrase = getRandomWord() + " " + getRandomWord() + " " + getRandomWord();
		passphrase = passphrase.charAt(0).toUpperCase() + passphrase.slice(1) + getRandomNumber() % 9;


		let password_type = localStorage["SpartanPass_password_type"];
		if (password_type == "default") {
			document.getElementById("password").value = password;
		}
		if (password_type == "simple") {
			document.getElementById("password").value = simple_password;
		}
		if (password_type == "passphrase") {
			document.getElementById("password").value = passphrase;
		}

		document.getElementById("password").focus();
		document.getElementById("password").select();
		document.execCommand('SelectAll');
		document.execCommand("Copy", false, null);

		// deselect
		document.activeElement.selectionEnd = document.activeElement.selectionStart;
	});
}

document.addEventListener('DOMContentLoaded', function () {
	if (localStorage["SpartanPass"] == undefined) {
		localStorage["SpartanPass_password_type"] = "default";
		document.location = "settings.html"
	}

	getCurrentTab().then(url => {
		generate(url)
	});
});
