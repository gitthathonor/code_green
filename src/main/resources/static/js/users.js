let isUsernameSameCheck = false;

$("#btnJoin").click(() => {
	join();
});

$("#btnUsernameSameCheck").click(() => {
	checkUsername();
});

$("#btnLogin").click(() => {
	login();
});


$("#btnDelete").click(() => {
	resign();
});

$("#btnUpdate").click(() => {
	update();
});

function join() {
	if (isUsernameSameCheck == false) {
		alert("유저네임 중복 체크를 진행해주세요");
		return;
	}

	if (koreanCheck() == true) {
		return;
	}

	if (containCapital() == false) {
		alert("username에 대문자는 하나 이상 입력해주세요!");
		return;
	}

	if (checkSamePassword() == false) {
		alert("비밀번호를 다시 확인해주세요!");
		return;
	}
	
	if (checkEmail() == false) {
		alert("이메일 형식이 맞지 않습니다.");
		return;
	}
	
	if (checkSpace() == true) {
		return;
	}

	let data = {
		username: $("#username").val(),
		password: $("#password").val(),
		email: $("#email").val()
	};

	$.ajax("/api/join", {
		type: "POST",
		dataType: "json", // 응답 데이터
		data: JSON.stringify(data), // http body에 들고갈 요청 데이터
		headers: { // http header에 들고갈 요청 데이터
			"Content-Type": "application/json"
		}
	}).done((res) => {
		if (res.code == 1) {
			location.href = "/loginForm";
		} else {
			alert(res.msg);
			history.back();
		}
	});
}

function checkUsername() {
	let username = $("#username").val();

	$.ajax(`/api/users/usernameSameCheck?username=${username}`, {
		type: "GET",
		dataType: "json",
		async: true
	}).done((res) => {
		if (res.code == 1) { // 통신 성공
			if (res.data == false) {
				alert("아이디가 중복되지 않았습니다.");
				isUsernameSameCheck = true;
			} else {
				alert("아이디가 중복되었어요. 다른 아이디를 사용해주세요.");
				isUsernameSameCheck = false;
				$("#username").val("");
			}
		}
	});
}

function login() {
	let data = {
		username: $("#username").val(),
		password: $("#password").val(),
		remember: $("#remember").prop("checked")
	};

	$.ajax("/api/login", {
		type: "POST",
		dataType: "json", // 응답 데이터
		data: JSON.stringify(data), // http body에 들고갈 요청 데이터
		headers: { // http header에 들고갈 요청 데이터
			"Content-Type": "application/json; charset=utf-8"
		}
	}).done((res) => {
		if (res.code == 1) {
			location.href = "/";
		} else {
			alert(res.msg);
			//alert("로그인 실패, 아이디 패스워드를 확인해주세요");
		}
	});
}

function resign() {
	let id = $("#id").val();

	$.ajax("/s/api/users/" + id, {
		type: "DELETE",
		dataType: "json" // 응답 데이터
	}).done((res) => {
		if (res.code == 1) {
			alert("회원탈퇴 완료");
			location.href = "/";
		} else {
			alert("회원탈퇴 실패");
		}
	});
}

function update() {
	let data = {
		password: $("#password").val(),
		email: $("#email").val()
	};

	let id = $("#id").val();

	$.ajax("/s/api/users/" + id, {
		type: "PUT",
		dataType: "json", // 응답 데이터
		data: JSON.stringify(data), // http body에 들고갈 요청 데이터
		headers: { // http header에 들고갈 요청 데이터
			"Content-Type": "application/json; charset=utf-8"
		}
	}).done((res) => {
		if (res.code == 1) {
			alert("회원 수정 완료");
			location.reload(); // f5
		} else {
			alert("업데이트에 실패하였습니다");
		}
	});
}



// 대문자 하나 이상 여부 체크
function containCapital() {
	let username = $("#username").val();
	if (username === username.toLowerCase()) {
		return false;
	} else {
		return true;
	}
}


// 비밀번호 확인
function checkSamePassword() {
	let password = $("#password").val();
	let passwordSame = $("#passwordSame").val();

	if (password === passwordSame) {
		return true;
	} else {
		return false;
	}
}

// 이메일 형식 체크
function checkEmail() {
	let email = $("#email").val();

	let emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
	if (!emailRegExp.test(email)) {
		return false;
	}
	return true; 
}

// 한글 체크(공통)
function koreanCheck() {
	let username = $("#username").val();
	let password = $("#password").val();
	let passwordSame = $("#passwordSame").val();
	let email = $("#email").val();
	
	//let korRule = /^[가-힣]*$/;
	 var korRule = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
	if (korRule.test(username) || korRule.test(password) || korRule.test(passwordSame) || korRule.test(email)) {
		alert("한글은 입력할 수 없습니다.");
		return true;
	} else {
		return false;
	}
}


// 공백체크(공통)
function checkSpace() {
		
		let username = $("#username").val();
		let password = $("#password").val();
		let passwordSame = $("#passwordSame").val();
		let email = $("#email").val();
		
		// 공백 x
		if(username.indexOf('') != -1 || password.indexOf('') != -1 || passwordSame.indexOf('') != -1 || email.indexOf('') != -1) {
			alert("공백이 포함되어 있으면 안됩니다.");
			return true;
		} else {
			return false;
		}
	}
